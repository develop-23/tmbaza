import { Router } from 'express';
import { register, loginUser, loginAdmin } from '../controllers/authController.js';

const r = Router();

r.post('/register', register); // name, phone
r.post('/login', loginUser); // phone only (user)
r.post('/admin/login', loginAdmin); // username + password

export default r;