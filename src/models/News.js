import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, enum: ['news', 'event', 'workshop', 'notice', 'placement'], default: 'news' },
    summary: { type: String, maxlength: 400 },
    content: String,
    coverImage: String,
    eventDate: Date,
    publishedAt: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

newsSchema.index({ published: 1, publishedAt: -1 });
newsSchema.index({ title: 'text', summary: 'text' });

export const News = mongoose.model('News', newsSchema);
