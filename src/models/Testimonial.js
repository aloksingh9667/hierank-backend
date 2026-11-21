import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: String, // e.g. "Analyst, Deloitte" / "Ex-Professor IIM Lucknow"
    programme: String,
    batch: String,
    quote: { type: String, required: true },
    photo: String,
    type: { type: String, enum: ['student', 'alumni', 'faculty', 'recruiter'], default: 'student' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
