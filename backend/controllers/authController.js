import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export const register = async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'Name and phone required' });
    const exists = await User.findOne({ where: { phone } });
    if (exists) return res.status(409).json({ message: 'Phone already exists' });
    const user = await User.create({ name, phone, role: 'user', verified: false });
    res.status(201).json({
        message: 'Registered. To verify, write to WhatsApp admin.',
        whatsapp: process.env.WHATSAPP_NUMBER,
        user: { id: user.id, name: user.name, phone: user.phone, verified: user.verified }
    });
};

// User login by phone (no password). Admin/operator use username+password.
export const loginUser = async (req, res) => {
    const { phone } = req.body;
    const user = await User.findOne({ where: { phone } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.blocked) return res.status(403).json({ message: 'Blocked' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });
    res.json({ token, role: user.role, verified: user.verified });
};

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || (user.role !== 'admin' && user.role !== 'operator')) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role });
};
