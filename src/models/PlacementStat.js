import mongoose from 'mongoose';

const sectorSchema = new mongoose.Schema({ sector: String, percent: Number }, { _id: false });

const placementStatSchema = new mongoose.Schema(
  {
    academicYear: { type: String, required: true, unique: true }, // "2024-25"
    highestPackageLPA: Number,
    averagePackageLPA: Number,
    minimumPackageLPA: Number,
    studentsPlaced: Number,
    hiringPartners: Number,
    sectorMix: [sectorSchema],
    isCurrent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PlacementStat = mongoose.model('PlacementStat', placementStatSchema);
