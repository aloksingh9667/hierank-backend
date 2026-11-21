import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({ code: String, title: String }, { _id: false });

const specialisationSchema = new mongoose.Schema(
  { name: { type: String, required: true }, description: String, courses: [courseSchema] },
  { _id: false }
);

const progressionSchema = new mongoose.Schema({ title: String, description: String }, { _id: false });

const outcomeSchema = new mongoose.Schema({ title: String, description: String, icon: String }, { _id: false });

const feeItemSchema = new mongoose.Schema(
  { label: String, note: String, amount: { type: Number, default: null } }, // null => "Contact admissions"
  { _id: false }
);

const programmeSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    code: { type: String, required: true, uppercase: true }, // MBA | BBA | BCA | MCA
    name: { type: String, required: true },
    level: { type: String, enum: ['UG', 'PG'], required: true },
    tagline: String,
    overview: String,
    duration: { type: String, required: true }, // "2 Years Full-Time"
    semesters: Number,
    intake: Number,
    affiliation: {
      university: String,
      collegeCode: String,
      approvedBy: String,
    },
    eligibility: [String],
    requiredDocuments: [String],
    selectionProcess: [String],
    specialisations: [specialisationSchema],
    progression: [progressionSchema],
    outcomes: [outcomeSchema],
    fees: {
      currency: { type: String, default: 'INR' },
      items: [feeItemSchema],
      scholarships: [progressionSchema],
    },
    admissionPhones: [String],
    brochureUrl: String,
    heroImage: String,
    isFlagship: { type: Boolean, default: false },
    admissionsOpen: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

programmeSchema.index({ published: 1, order: 1 });

export const Programme = mongoose.model('Programme', programmeSchema);
