import { Router } from 'express';
import { create, list, update, remove } from '../controllers/locationController.js';
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

r.get('/', list);

r.post('/', auth, requireRole('admin'), create);
r.patch('/:id', auth, requireRole('admin'), update);
r.delete('/:id', auth, requireRole('admin'), remove);

export default r;