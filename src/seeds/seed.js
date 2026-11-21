import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import {
  CampusItem, Faculty, News, PlacementStat, Programme, Recruiter, SiteSetting, Testimonial, User,
} from '../models/index.js';
import { slugify } from '../utils/slugify.js';
import * as data from './data.js';

const reset = process.argv.includes('--reset');

async function seedCollection(Model, rows, key) {
  if (reset) await Model.deleteMany({});
  for (const row of rows) await Model.updateOne({ [key]: row[key] }, { $set: row }, { upsert: true });
  console.log(`  ✓ ${Model.modelName}: ${rows.length}`);
}

async function main() {
  await connectDB();
  console.log(reset ? 'Resetting and seeding…' : 'Seeding (idempotent upsert)…');

  await seedCollection(Programme, data.programmes, 'slug');
  await seedCollection(Faculty, data.faculty.map((f) => ({ ...f, slug: slugify(f.name) })), 'slug');
  await seedCollection(News, data.news.map((n) => ({ ...n, slug: slugify(n.title).slice(0, 90) })), 'slug');
  await seedCollection(PlacementStat, data.placementStats, 'academicYear');
  await seedCollection(Recruiter, data.recruiters, 'name');
  await seedCollection(Testimonial, data.testimonials, 'name');

  if (reset) await CampusItem.deleteMany({});
  for (const item of data.campusItems) await CampusItem.updateOne({ type: item.type, title: item.title }, { $set: item }, { upsert: true });
  console.log(`  ✓ CampusItem: ${data.campusItems.length}`);

  for (const [key, value] of Object.entries(data.settings)) await SiteSetting.updateOne({ key }, { $set: { value } }, { upsert: true });
  console.log(`  ✓ SiteSetting: ${Object.keys(data.settings).length}`);

  const existing = await User.findOne({ email: env.admin.email.toLowerCase() });
  if (!existing) {
    await User.create({ name: env.admin.name, email: env.admin.email, password: env.admin.password, role: 'admin' });
    console.log(`  ✓ Admin user created: ${env.admin.email}`);
  } else {
    console.log('  • Admin user already exists');
  }

  await mongoose.connection.close();
  console.log('Done.');
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.connection.close();
  process.exit(1);
});
