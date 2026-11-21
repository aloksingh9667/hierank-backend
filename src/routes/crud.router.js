import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.js';

/** Builds a router: public GET list + GET one, admin-only write operations. */
export function crudRouter(ctrl) {
  const router = Router();
  router.get('/', ctrl.listPublic);
  router.get('/admin/all', protect, ctrl.listAdmin); // includes unpublished
  router.get('/:id', ctrl.getOne);
  router.post('/', protect, restrictTo('admin', 'editor'), ctrl.create);
  router.put('/:id', protect, restrictTo('admin', 'editor'), ctrl.update);
  router.delete('/:id', protect, restrictTo('admin'), ctrl.remove);
  return router;
}
