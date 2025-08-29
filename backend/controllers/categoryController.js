import { Category, Ad } from '../models/index.js';
import { Sequelize } from 'sequelize';

export const create = async (req, res) => {
    const { name, parentId, active, sortOrder } = req.body;
    const cat = await Category.create({ name, parentId: parentId || null, active: active ?? true, sortOrder: sortOrder || 0 });
    res.status(201).json(cat);
};

export const list = async (req, res) => {
    const cats = await Category.findAll({ order: [['sortOrder', 'ASC'], ['name', 'ASC']] });
    res.json(cats);
};

export const listWithCounts = async (req, res) => {
    try {
        const cats = await Category.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "Ads" AS "Ad"
                            WHERE "Ad"."categoryId" = "Category"."id"
                            AND "Ad"."status" = 'approved'
                        )`),
                        'adsCount'
                    ]
                ]
            },
            order: [['sortOrder', 'ASC'], ['name', 'ASC']]
        });
        res.json(cats);
    } catch (error) {
        console.error('Error fetching categories with counts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const update = async (req, res) => {
    const { id } = req.params; const { name, parentId, active, sortOrder } = req.body;
    const cat = await Category.findByPk(id);
    if (!cat) return res.status(404).json({ message: 'Not found' });
    if (name !== undefined) cat.name = name;
    if (parentId !== undefined) cat.parentId = parentId;
    if (active !== undefined) cat.active = active;
    if (sortOrder !== undefined) cat.sortOrder = sortOrder;
    await cat.save();
    res.json(cat);
};

export const remove = async (req, res) => {
    const { id } = req.params; const cat = await Category.findByPk(id);
    if (!cat) return res.status(404).json({ message: 'Not found' });
    await cat.destroy();
    res.json({ message: 'Deleted' });
};
