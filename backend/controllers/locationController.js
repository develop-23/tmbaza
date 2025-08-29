import { Location } from '../models/index.js';

export const create = async (req, res) => {
    const { name, parentId, active, sortOrder } = req.body;
    const loc = await Location.create({ name, parentId: parentId || null, active: active ?? true, sortOrder: sortOrder || 0 });
    res.status(201).json(loc);
};

export const list = async (req, res) => {
    const locs = await Location.findAll({ order: [['sortOrder', 'ASC'], ['name', 'ASC']] });
    res.json(locs);
};

export const update = async (req, res) => {
    const { id } = req.params; const { name, parentId, active, sortOrder } = req.body;
    const loc = await Location.findByPk(id);
    if (!loc) return res.status(404).json({ message: 'Not found' });
    if (name !== undefined) loc.name = name;
    if (parentId !== undefined) loc.parentId = parentId;
    if (active !== undefined) loc.active = active;
    if (sortOrder !== undefined) loc.sortOrder = sortOrder;
    await loc.save();
    res.json(loc);
};

export const remove = async (req, res) => {
    const { id } = req.params; const loc = await Location.findByPk(id);
    if (!loc) return res.status(404).json({ message: 'Not found' });
    await loc.destroy();
    res.json({ message: 'Deleted' });
};