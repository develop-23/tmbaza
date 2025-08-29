import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

r.get('/', getSettings);
r.patch('/', auth, requireRole('admin'), updateSettings);

export default r;