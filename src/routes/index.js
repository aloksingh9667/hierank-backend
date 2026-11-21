import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter, formLimiter } from '../middleware/rateLimit.js';
import {
  applicationSchema, enquirySchema, loginSchema, settingSchema, statusUpdateSchema, tourSchema,
} from '../validators/index.js';
import * as auth from '../controllers/auth.controller.js';
import * as lead from '../controllers/lead.controller.js';
import * as placement from '../controllers/placement.controller.js';
import * as settings from '../controllers/settings.controller.js';
import {
  campusCtrl, facultyCtrl, newsCtrl, programmeCtrl, recruiterCtrl, testimonialCtrl,
} from '../controllers/content.controller.js';
import { crudRouter } from './crud.router.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ success: true, status: 'ok', time: new Date().toISOString() }));

/* Auth */
router.post('/auth/login', authLimiter, validate(loginSchema), auth.login);
router.get('/auth/me', protect, auth.me);

/* Public content (+ admin writes) */
router.use('/programmes', crudRouter(programmeCtrl));
router.use('/faculty', crudRouter(facultyCtrl));
router.use('/news', crudRouter(newsCtrl));
router.use('/recruiters', crudRouter(recruiterCtrl));
router.use('/testimonials', crudRouter(testimonialCtrl));
router.use('/campus', crudRouter(campusCtrl));

/* Placements */
router.get('/placements/stats', placement.getCurrent);
router.get('/placements/stats/all', placement.listAll);
router.put('/placements/stats', protect, restrictTo('admin', 'editor'), placement.upsert);
router.delete('/placements/stats/:id', protect, restrictTo('admin'), placement.remove);

/* Site settings */
router.get('/settings', settings.getAll);
router.put('/settings/:key', protect, restrictTo('admin'), validate(settingSchema), settings.setOne);

/* Public form submissions */
router.post('/enquiries', formLimiter, validate(enquirySchema), lead.createEnquiry);
router.post('/applications', formLimiter, validate(applicationSchema), lead.createApplication);
router.post('/tours', formLimiter, validate(tourSchema), lead.createTour);

/* Admin: lead management */
const admin = Router();
admin.use(protect, restrictTo('admin', 'editor'));
admin.get('/stats', lead.dashboardStats);
admin.get('/enquiries', lead.listEnquiries);
admin.patch('/enquiries/:id', validate(statusUpdateSchema), lead.updateEnquiryStatus);
admin.get('/applications', lead.listApplications);
admin.get('/applications/:id', lead.getApplication);
admin.patch('/applications/:id/status', validate(statusUpdateSchema), lead.updateApplicationStatus);
admin.get('/tours', lead.listTours);
admin.patch('/tours/:id', validate(statusUpdateSchema), lead.updateTourStatus);
router.use('/admin', admin);

export default router;
