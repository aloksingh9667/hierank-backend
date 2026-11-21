import mongoose from 'mongoose';

// One collection for gallery tiles, student clubs and facilities.
const campusItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['gallery', 'club', 'facility', 'event'], required: true, index: true },
    title: { type: String, required: true },
    description: String,
    image: String,
    icon: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CampusItem = mongoose.model('CampusItem', campusItemSchema);
