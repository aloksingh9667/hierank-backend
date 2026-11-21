import mongoose from 'mongoose';

export const APPLICATION_STATUSES = [
  'submitted', 'under_review', 'shortlisted', 'interview', 'offered', 'enrolled', 'rejected', 'withdrawn',
];

const historySchema = new mongoose.Schema(
  { status: String, note: String, by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, at: { type: Date, default: Date.now } },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    applicationNo: { type: String, unique: true, index: true }, // HBS-2026-000001
    programme: { type: mongoose.Schema.Types.ObjectId, ref: 'Programme', required: true },
    programmeCode: { type: String, index: true },
    cycle: { type: String, default: '2026' },
    applicant: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true, index: true },
      phone: { type: String, required: true },
      dateOfBirth: Date,
      gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'] },
      city: String,
      state: String,
    },
    academic: {
      lastQualification: String,
      institution: String,
      percentage: { type: Number, min: 0, max: 100 },
      passingYear: Number,
      entranceExam: { type: String, enum: ['CAT', 'MAT', 'CMAT', 'XAT', 'GMAT', 'CUET', 'UGAT', 'HAT', 'NONE'], default: 'NONE' },
      entranceScore: Number,
    },
    statementOfPurpose: { type: String, maxlength: 3000 },
    consent: { type: Boolean, required: true },
    status: { type: String, enum: APPLICATION_STATUSES, default: 'submitted', index: true },
    statusHistory: [historySchema],
    notes: String,
    ip: String,
  },
  { timestamps: true }
);

applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ 'applicant.email': 1, programme: 1, cycle: 1 }, { unique: true }); // one application per programme per cycle

export const Application = mongoose.model('Application', applicationSchema);
