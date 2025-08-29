import { Op } from 'sequelize';
import sequelize from '../config/db.js';
import { Ad, Category, Location, Banner, Setting } from '../models/index.js';
import paginate from '../utils/pagination.js';
import injectBanners from '../utils/injectBanners.js';

export const create = async (req, res) => {
    const { title, description, categoryId, locationId } = req.body;
    const setting = await Setting.findOne();
    const mediaLimit = setting?.mediaLimit || Number(process.env.MEDIA_LIMIT || 5);

    const images = (req.files?.images || []).map((f) => `/uploads/media/${f.filename}`);
    const videos = (req.files?.videos || []).map((f) => `/uploads/media/${f.filename}`);
    const total = images.length + videos.length;
    if (total > mediaLimit) return res.status(400).json({ message: `Max media is ${mediaLimit}` });

    const ad = await Ad.create({
        title,
        description,
        categoryId,
        locationId,
        userId: req.user.id,
        images,
        videos,
        status: 'pending'
    });
    res.status(201).json(ad);
};

export const update = async (req, res) => {
    const { id } = req.params; const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Not found' });
    if (ad.UserId !== req.user.id && req.user.role === 'user') return res.status(403).json({ message: 'Forbidden' });

    const setting = await Setting.findOne();
    const mediaLimit = setting?.mediaLimit || Number(process.env.MEDIA_LIMIT || 5);

    const images = (req.files?.images || []).map((f) => `/uploads/media/${f.filename}`);
    const videos = (req.files?.videos || []).map((f) => `/uploads/media/${f.filename}`);

    const payload = req.body || {};
    ['title','description','categoryId','locationId'].forEach((k) => {
        if (payload[k] !== undefined) ad[k] = payload[k];
    });
    if (images.length || videos.length) {
        const total = (images.length || ad.images.length) + (videos.length || ad.videos.length);
        if (total > mediaLimit) return res.status(400).json({ message: `Max media is ${mediaLimit}` });
        if (images.length) ad.images = images;
        if (videos.length) ad.videos = videos;
    }
    ad.status = 'pending'; // re-moderate after edit
    await ad.save();
    res.json(ad);
};

export const remove = async (req, res) => {
    const { id } = req.params; const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Not found' });
    if (ad.UserId !== req.user.id && req.user.role === 'user') return res.status(403).json({ message: 'Forbidden' });
    await ad.destroy();
    res.json({ message: 'Deleted' });
};

export const getById = async (req, res) => {
    const ad = await Ad.findByPk(req.params.id, { include: ['category', 'location', 'user'] });
    if (!ad) return res.status(404).json({ message: 'Not found' });
    res.json(ad);
};

export const list = async (req, res) => {
    const { page, limit, offset } = paginate(req.query);
    const { q, categoryId, locationId, vip } = req.query;
    const where = { status: 'approved' };
    const likeOp = sequelize.getDialect() === 'postgres' ? Op.iLike : Op.like;
    if (q) where.title = { [likeOp]: `%${q}%` };
    if (categoryId) where.categoryId = categoryId;
    if (locationId) where.locationId = locationId;
    if (vip !== undefined) where.vip = vip === 'true';

    const { rows, count } = await Ad.findAndCountAll({
        where,
        include: ['category', 'location'],
        order: [ ['vip', 'DESC'], ['createdAt', 'DESC'] ],
        limit,
        offset
    });

    // Inline banners after N
    const setting = await Setting.findOne();
    const frequency = setting?.bannerFrequency || Number(process.env.BANNER_FREQUENCY || 30);
    const inlineBanners = await Banner.findAll({ where: { active: true, position: 'inline' }, order: [['createdAt','DESC']] });
    const data = injectBanners(rows, inlineBanners, frequency);

    res.json({ page, limit, count, data });
};

export const moderate = async (req, res) => {
    const { id } = req.params; const { action, reason } = req.body; // approve | reject | block | vip | unvip | delete
    const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Not found' });

    switch(action) {
        case 'approve': ad.status = 'approved'; ad.rejectReason = null; break;
        case 'reject': ad.status = 'rejected'; ad.rejectReason = reason || 'Not specified'; break;
        case 'vip': ad.vip = true; break;
        case 'unvip': ad.vip = false; break;
        case 'delete': await ad.destroy(); return res.json({ message: 'Deleted' });
        default: return res.status(400).json({ message: 'Unknown action' });
    }
    await ad.save();
    res.json(ad);
};

export const requestVipInfo = async (req, res) => {
    // According to ТЗ: to apply for VIP user writes to admin via WhatsApp
    res.json({ message: 'To request VIP, contact admin via WhatsApp', whatsapp: process.env.WHATSAPP_NUMBER });
};
