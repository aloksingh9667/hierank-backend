import { Programme, Faculty, News, Recruiter, Testimonial, CampusItem } from '../models/index.js';
import { makeCrud } from './crud.factory.js';

export const programmeCtrl = makeCrud(Programme, {
  sort: { order: 1 },
  slugFrom: 'code',
  lookup: 'slug',
  filterable: ['level', 'code'],
});

export const facultyCtrl = makeCrud(Faculty, {
  sort: { isLeadership: -1, order: 1 },
  slugFrom: 'name',
  lookup: 'slug',
  filterable: ['department', 'isLeadership'],
  searchable: ['name', 'designation'],
});

export const newsCtrl = makeCrud(News, {
  sort: { publishedAt: -1 },
  slugFrom: 'title',
  lookup: 'slug',
  filterable: ['category'],
  searchable: ['title', 'summary'],
});

export const recruiterCtrl = makeCrud(Recruiter, { sort: { order: 1, name: 1 }, filterable: ['sector'] });

export const testimonialCtrl = makeCrud(Testimonial, { sort: { featured: -1, order: 1 }, filterable: ['type', 'featured'] });

export const campusCtrl = makeCrud(CampusItem, { sort: { order: 1 }, filterable: ['type'] });
