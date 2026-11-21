import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    programme: { type: String, trim: true }, // programme code or free text
    city: String,
    message: { type: String, maxlength: 2000 },
    source: { type: String, enum: ['contact', 'home', 'programme', 'admissions', 'placements'], default: 'contact' },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
    notes: String,
    ip: String,
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
