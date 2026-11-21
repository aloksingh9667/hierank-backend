import { Application, APPLICATION_STATUSES, CampusTour, Enquiry, Programme, nextSequence } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getPagination, pageMeta } from '../utils/pagination.js';

const CYCLE = '2026';

/* ----------------------------- Public submissions ---------------------------- */

export const createEnquiry = asyncHandler(async (req, res) => {
  await Enquiry.create({ ...req.body, ip: req.ip });
  res.status(201).json({ success: true, message: 'Thank you! Our admissions council will contact you shortly.' });
});

export const createTour = asyncHandler(async (req, res) => {
  await CampusTour.create(req.body);
  res.status(201).json({ success: true, message: 'Campus tour requested. We will confirm your slot by phone or email.' });
});

export const createApplication = asyncHandler(async (req, res) => {
  const key = req.body.programme;
  const programme = await Programme.findOne({
    published: true,
    $or: [{ slug: key.toLowerCase() }, { code: key.toUpperCase() }],
  });
  if (!programme) throw ApiError.badRequest('Selected programme was not found');
  if (!programme.admissionsOpen) throw ApiError.badRequest(`Admissions for ${programme.code} are currently closed`);

  const seq = await nextSequence(`application-${CYCLE}`);
  const applicationNo = `HBS-${CYCLE}-${String(seq).padStart(6, '0')}`;

  try {
    const doc = await Application.create({
      ...req.body,
      programme: programme._id,
      programmeCode: programme.code,
      cycle: CYCLE,
      applicationNo,
      statusHistory: [{ status: 'submitted', note: 'Application received' }],
      ip: req.ip,
    });
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      data: { applicationNo: doc.applicationNo, programme: programme.name, status: doc.status },
    });
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, `An application for ${programme.code} with this email already exists for the ${CYCLE} cycle.`);
    }
    throw err;
  }
});

/* ------------------------------- Admin: listing ------------------------------ */

const rx = (q) => new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

function listController(Model, { searchFields, filterFields, populate }) {
  return asyncHandler(async (req, res) => {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};
    for (const f of filterFields) if (req.query[f]) filter[f] = req.query[f];
    if (req.query.q) filter.$or = searchFields.map((f) => ({ [f]: rx(req.query.q) }));
    let query = Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    if (populate) query = query.populate(populate);
    const [data, total] = await Promise.all([query.lean(), Model.countDocuments(filter)]);
    res.json({ success: true, data, meta: pageMeta(total, page, limit) });
  });
}

export const listEnquiries = listController(Enquiry, {
  searchFields: ['name', 'email', 'phone'],
  filterFields: ['status', 'programme', 'source'],
});

export const listApplications = listController(Application, {
  searchFields: ['applicant.fullName', 'applicant.email', 'applicant.phone', 'applicationNo'],
  filterFields: ['status', 'programmeCode', 'cycle'],
  populate: { path: 'programme', select: 'name code' },
});

export const listTours = listController(CampusTour, {
  searchFields: ['name', 'email', 'phone'],
  filterFields: ['status'],
});

export const getApplication = asyncHandler(async (req, res) => {
  const doc = await Application.findById(req.params.id).populate('programme', 'name code').lean();
  if (!doc) throw ApiError.notFound();
  res.json({ success: true, data: doc });
});

/* ------------------------------ Admin: updates ------------------------------- */

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  if (!APPLICATION_STATUSES.includes(status)) throw ApiError.badRequest(`Status must be one of: ${APPLICATION_STATUSES.join(', ')}`);
  const doc = await Application.findById(req.params.id);
  if (!doc) throw ApiError.notFound();
  doc.status = status;
  doc.statusHistory.push({ status, note, by: req.user._id });
  await doc.save();
  res.json({ success: true, data: doc });
});

function statusUpdater(Model, allowed) {
  return asyncHandler(async (req, res) => {
    const { status, note } = req.body;
    if (!allowed.includes(status)) throw ApiError.badRequest(`Status must be one of: ${allowed.join(', ')}`);
    const update = { status };
    if (note !== undefined && 'notes' in Model.schema.paths) update.notes = note;
    const doc = await Model.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) throw ApiError.notFound();
    res.json({ success: true, data: doc });
  });
}

export const updateEnquiryStatus = statusUpdater(Enquiry, ['new', 'contacted', 'closed']);
export const updateTourStatus = statusUpdater(CampusTour, ['requested', 'confirmed', 'completed', 'cancelled']);

/* ------------------------------ Admin: dashboard ----------------------------- */

export const dashboardStats = asyncHandler(async (_req, res) => {
  const since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
  const [enquiries, newEnquiries, applications, tours, byStatus, byProgramme, last30] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'new' }),
    Application.countDocuments(),
    CampusTour.countDocuments({ status: 'requested' }),
    Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Application.aggregate([{ $group: { _id: '$programmeCode', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Application.countDocuments({ createdAt: { $gte: since } }),
  ]);
  res.json({
    success: true,
    data: {
      enquiries,
      newEnquiries,
      applications,
      applicationsLast30Days: last30,
      pendingTours: tours,
      applicationsByStatus: Object.fromEntries(byStatus.map((r) => [r._id, r.count])),
      applicationsByProgramme: Object.fromEntries(byProgramme.map((r) => [r._id, r.count])),
    },
  });
});
