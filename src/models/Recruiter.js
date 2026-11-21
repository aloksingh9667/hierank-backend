import mongoose from 'mongoose';

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    sector: String,
    logo: String,
    website: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Recruiter = mongoose.model('Recruiter', recruiterSchema);
