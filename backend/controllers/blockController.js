import { Block } from '../models/index.js';

export const create = async (req, res) => {
    const { title, service, active, sortOrder } = req.body;
    const image = req.file ? `/uploads/media/${req.file.filename}` : undefined;
    const block = await Block.create({ title, service, active: active ?? true, sortOrder: sortOrder || 0, image });
    res.status(201).json(block);
};

export const list = async (req, res) => {
    const blocks = await Block.findAll({ order: [['sortOrder', 'ASC']] });
    res.json(blocks);
};

export const update = async (req, res) => {
    const { id } = req.params; const block = await Block.findByPk(id);
    if (!block) return res.status(404).json({ message: 'Not found' });
    const { title, service, active, sortOrder } = req.body;
    if (title !== undefined) block.title = title;
    if (service !== undefined) block.service = service;
    if (active !== undefined) block.active = active;
    if (sortOrder !== undefined) block.sortOrder = sortOrder;
    if (req.file) block.image = `/uploads/media/${req.file.filename}`;
    await block.save();
    res.json(block);
};

export const remove = async (req, res) => {
    const { id } = req.params; const block = await Block.findByPk(id);
    if (!block) return res.status(404).json({ message: 'Not found' });
    await block.destroy();
    res.json({ message: 'Deleted' });
};