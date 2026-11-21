import { SiteSetting } from '../models/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Public: every setting as one object { contact: {...}, notice: {...}, ... }
export const getAll = asyncHandler(async (_req, res) => {
  const rows = await SiteSetting.find().lean();
  const data = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  res.json({ success: true, data });
});

export const setOne = asyncHandler(async (req, res) => {
  const row = await SiteSetting.findOneAndUpdate(
    { key: req.params.key },
    { value: req.body.value },
    { new: true, upsert: true }
  );
  res.json({ success: true, data: row });
});
