import { PlacementStat } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCurrent = asyncHandler(async (_req, res) => {
  const data = (await PlacementStat.findOne({ isCurrent: true }).lean()) || (await PlacementStat.findOne().sort({ academicYear: -1 }).lean());
  if (!data) throw ApiError.notFound('No placement statistics published yet');
  res.json({ success: true, data });
});

export const listAll = asyncHandler(async (_req, res) => {
  const data = await PlacementStat.find().sort({ academicYear: -1 }).lean();
  res.json({ success: true, data });
});

export const upsert = asyncHandler(async (req, res) => {
  const { academicYear } = req.body;
  if (!academicYear) throw ApiError.badRequest('academicYear is required');
  if (req.body.isCurrent) await PlacementStat.updateMany({}, { isCurrent: false });
  const data = await PlacementStat.findOneAndUpdate({ academicYear }, req.body, { new: true, upsert: true, runValidators: true });
  res.json({ success: true, data });
});

export const remove = asyncHandler(async (req, res) => {
  const doc = await PlacementStat.findByIdAndDelete(req.params.id);
  if (!doc) throw ApiError.notFound();
  res.json({ success: true, message: 'Deleted' });
});
