import { Router } from 'express';
import upload from '../middleware/upload.js';
import { create, list, update, remove } from '../controllers/blockController.js';
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

r.get('/', list);
r.post('/', auth, requireRole('admin'), upload.single('image'), create);
r.patch('/:id', auth, requireRole('admin'), upload.single('image'), update);
r.delete('/:id', auth, requireRole('admin'), remove);

export default r;