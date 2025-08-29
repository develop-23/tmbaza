import { Router } from 'express';
import upload from '../middleware/upload.js';
import { auth, requireRole } from '../middleware/auth.js';
import { create, update, remove, getById, list, moderate, requestVipInfo } from '../controllers/adController.js';

const r = Router();

r.get('/', list);
r.get('/:id', getById);

// create/update with images/videos fields
const media = upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 }
]);

r.post('/', auth, requireRole('user','operator','admin'), media, create);
r.patch('/:id', auth, requireRole('user','operator','admin'), media, update);
r.put('/:id', auth, requireRole('user','operator','admin'), media, update); // Frontend uses PUT
r.delete('/:id', auth, requireRole('user','operator','admin'), remove);

// moderation (admin/operator)
r.post('/:id/moderate', auth, requireRole('admin','operator'), moderate);

// VIP info (user-triggered)
r.get('/:id/request-vip', auth, requireRole('user','operator','admin'), requestVipInfo);

export default r;
