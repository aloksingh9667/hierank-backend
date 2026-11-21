import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getPagination, pageMeta } from '../utils/pagination.js';
import { slugify } from '../utils/slugify.js';

/**
 * Generic CRUD controller used by content collections (faculty, news, recruiters...).
 * options:
 *  - sort:       default public sort
 *  - slugFrom:   field used to generate a slug when none is supplied
 *  - filterable: query-string fields that can filter public lists (e.g. ['category'])
 *  - searchable: fields used for ?q= regex search
 *  - lookup:     extra field (besides _id) to find a single document by, e.g. 'slug'
 */
export function makeCrud(Model, options = {}) {
  const { sort = { order: 1, createdAt: -1 }, slugFrom, filterable = [], searchable = [], lookup } = options;

  const buildFilter = (query, publicOnly) => {
    const filter = publicOnly ? { published: true } : {};
    for (const f of filterable) if (query[f]) filter[f] = query[f];
    if (query.q && searchable.length) {
      const rx = new RegExp(String(query.q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = searchable.map((f) => ({ [f]: rx }));
    }
    return filter;
  };

  const list = (publicOnly) =>
    asyncHandler(async (req, res) => {
      const { page, limit, skip } = getPagination(req.query, publicOnly ? 50 : 20);
      const filter = buildFilter(req.query, publicOnly);
      const [data, total] = await Promise.all([
        Model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        Model.countDocuments(filter),
      ]);
      res.json({ success: true, data, meta: pageMeta(total, page, limit) });
    });

  const getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const or = [];
    if (/^[a-f\d]{24}$/i.test(id)) or.push({ _id: id });
    if (lookup) or.push({ [lookup]: id });
    const doc = or.length ? await Model.findOne({ $or: or, published: true }).lean() : null;
    if (!doc) throw ApiError.notFound();
    res.json({ success: true, data: doc });
  });

  const create = asyncHandler(async (req, res) => {
    const body = { ...req.body };
    if (slugFrom && !body.slug && body[slugFrom]) body.slug = slugify(body[slugFrom]);
    const doc = await Model.create(body);
    res.status(201).json({ success: true, data: doc });
  });

  const update = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) throw ApiError.notFound();
    res.json({ success: true, data: doc });
  });

  const remove = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw ApiError.notFound();
    res.json({ success: true, message: 'Deleted' });
  });

  return { listPublic: list(true), listAdmin: list(false), getOne, create, update, remove };
}
