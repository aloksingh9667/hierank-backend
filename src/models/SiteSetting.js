import mongoose from 'mongoose';

// Key/value store for editable site-wide content (contact info, ticker, important dates, social links...)
const siteSettingSchema = new mongoose.Schema(
  { key: { type: String, required: true, unique: true }, value: mongoose.Schema.Types.Mixed },
  { timestamps: true }
);

export const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);
