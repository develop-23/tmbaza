import { Setting } from '../models/index.js';

export const getSettings = async (req, res) => {
    const s = await Setting.findOne();
    res.json(s);
};

export const updateSettings = async (req, res) => {
    const body = req.body || {};
    const s = await Setting.findOne();
    if (!s) return res.status(404).json({ message: 'Settings not initialized' });
    ['mediaLimit', 'bannerFrequency', 'whatsappNumber'].forEach((k) => {
        if (body[k] !== undefined) s[k] = body[k];
    });
    await s.save();
    res.json(s);
};