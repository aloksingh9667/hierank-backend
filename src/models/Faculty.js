import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    designation: { type: String, required: true },
    qualification: String,
    department: { type: String, enum: ['Leadership', 'Management', 'IT', 'Placement', 'General'], default: 'General' },
    bio: String,
    photo: String,
    isLeadership: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

facultySchema.index({ published: 1, isLeadership: -1, order: 1 });

export const Faculty = mongoose.model('Faculty', facultySchema);
