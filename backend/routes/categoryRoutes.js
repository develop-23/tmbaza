import { Router } from 'express';
import { create, list, listWithCounts, update, remove } from '../controllers/categoryController.js';
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

r.get('/', list);
r.get('/with-counts', listWithCounts);

r.post('/', auth, requireRole('admin'), create);
r.put('/:id', auth, requireRole('admin'), update);
r.delete('/:id', auth, requireRole('admin'), remove);

export default r;
