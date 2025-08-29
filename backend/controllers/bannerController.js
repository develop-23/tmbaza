import { Banner } from '../models/index.js';

export const create = async (req, res) => {
    const { title, link, position, active } = req.body;
    const image = req.file ? `/uploads/media/${req.file.filename}` : undefined;
    const banner = await Banner.create({ title, link, position, active: active ?? true, image });
    res.status(201).json(banner);
};

export const list = async (req, res) => {
    const { position } = req.query;
    const where = {};
    if (position) where.position = position;
    const banners = await Banner.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(banners);
};

export const update = async (req, res) => {
    const { id } = req.params; const banner = await Banner.findByPk(id);
    if (!banner) return res.status(404).json({ message: 'Not found' });
    const { title, link, position, active } = req.body;
    if (title !== undefined) banner.title = title;
    if (link !== undefined) banner.link = link;
    if (position !== undefined) banner.position = position;
    if (active !== undefined) banner.active = active;
    if (req.file) banner.image = `/uploads/media/${req.file.filename}`;
    await banner.save();
    res.json(banner);
};

export const remove = async (req, res) => {
    const { id } = req.params; const banner = await Banner.findByPk(id);
    if (!banner) return res.status(404).json({ message: 'Not found' });
    await banner.destroy();
    res.json({ message: 'Deleted' });
};

export const click = async (req, res) => {
    const { id } = req.params; const banner = await Banner.findByPk(id);
    if (!banner) return res.status(404).json({ message: 'Not found' });
    banner.clicks += 1; await banner.save();
    res.json({ clicks: banner.clicks, link: banner.link });
};