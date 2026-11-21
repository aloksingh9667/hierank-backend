import mongoose from 'mongoose';

const campusTourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    timeSlot: { type: String, enum: ['morning', 'afternoon'], default: 'morning' },
    visitors: { type: Number, min: 1, max: 10, default: 1 },
    programmeInterest: String,
    message: String,
    status: { type: String, enum: ['requested', 'confirmed', 'completed', 'cancelled'], default: 'requested', index: true },
  },
  { timestamps: true }
);

export const CampusTour = mongoose.model('CampusTour', campusTourSchema);
