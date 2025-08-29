import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { User, Ad, Category, Location, Banner, Block, Setting } from '../models/index.js';
import { Sequelize } from 'sequelize';

const r = Router();

// Apply auth middleware to all admin routes
r.use(auth);
r.use(requireRole('admin', 'operator'));

// Dashboard stats
r.get('/stats', async (req, res) => {
    try {
        const stats = await Promise.all([
            User.count(),
            Ad.count(),
            Ad.count({ where: { status: 'pending' } }),
            Ad.count({ where: { vip: true } })
        ]);

        res.json({
            users: stats[0],
            ads: stats[1],
            pending: stats[2],
            vip: stats[3]
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Recent ads for dashboard
r.get('/ads/recent', async (req, res) => {
    try {
        const ads = await Ad.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['name']
            }]
        });
        res.json(ads);
    } catch (error) {
        console.error('Recent ads error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Recent users for dashboard
r.get('/users/recent', async (req, res) => {
    try {
        const users = await User.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'name', 'email', 'createdAt']
        });
        res.json(users);
    } catch (error) {
        console.error('Recent users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User management
r.get('/users', async (req, res) => {
    try {
        const { search, status, role, page = 1, limit = 20 } = req.query;
        const where = {};

        if (search) {
            where[Sequelize.Op.or] = [
                { name: { [Sequelize.Op.like]: `%${search}%` } },
                { email: { [Sequelize.Op.like]: `%${search}%` } }
            ];
        }
        if (status) where.status = status;
        if (role) where.role = role;

        const users = await User.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
            order: [['createdAt', 'DESC']]
        });

        res.json(users);
    } catch (error) {
        console.error('Users list error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Ads management
r.get('/ads', async (req, res) => {
    try {
        const { search, status, categoryId, vip, page = 1, limit = 20 } = req.query;
        const where = {};

        if (search) where.title = { [Sequelize.Op.like]: `%${search}%` };
        if (status) where.status = status;
        if (categoryId) where.categoryId = categoryId;
        if (vip !== undefined) where.vip = vip === 'true';

        const ads = await Ad.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, attributes: ['name'] },
                { model: Category, attributes: ['name'] }
            ]
        });

        res.json(ads);
    } catch (error) {
        console.error('Admin ads error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Categories management
r.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['sortOrder', 'ASC'], ['name', 'ASC']]
        });
        res.json(categories);
    } catch (error) {
        console.error('Admin categories error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Locations management
r.get('/locations', async (req, res) => {
    try {
        const locations = await Location.findAll({
            order: [['sortOrder', 'ASC'], ['name', 'ASC']]
        });
        res.json(locations);
    } catch (error) {
        console.error('Admin locations error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Banners management
r.get('/banners', async (req, res) => {
    try {
        const banners = await Banner.findAll({
            order: [['sortOrder', 'ASC']]
        });
        res.json(banners);
    } catch (error) {
        console.error('Admin banners error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Blocks management
r.get('/blocks', async (req, res) => {
    try {
        const blocks = await Block.findAll({
            order: [['sortOrder', 'ASC']]
        });
        res.json(blocks);
    } catch (error) {
        console.error('Admin blocks error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Settings management
r.get('/settings', async (req, res) => {
    try {
        const settings = await Setting.findAll();
        res.json(settings);
    } catch (error) {
        console.error('Admin settings error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Operators management (same as users but filtered)
r.get('/operators', async (req, res) => {
    try {
        const operators = await User.findAll({
            where: { role: ['admin', 'operator'] },
            attributes: ['id', 'name', 'email', 'role', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
        res.json(operators);
    } catch (error) {
        console.error('Operators error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin CRUD operations for categories
r.post('/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.put('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.update(req.body);
        res.json(category);
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.delete('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.destroy();
        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin CRUD operations for locations
r.post('/locations', async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        console.error('Create location error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.put('/locations/:id', async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });

        await location.update(req.body);
        res.json(location);
    } catch (error) {
        console.error('Update location error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.delete('/locations/:id', async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });

        await location.destroy();
        res.json({ message: 'Location deleted' });
    } catch (error) {
        console.error('Delete location error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin CRUD operations for banners
r.post('/banners', async (req, res) => {
    try {
        const banner = await Banner.create(req.body);
        res.status(201).json(banner);
    } catch (error) {
        console.error('Create banner error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.put('/banners/:id', async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Banner not found' });

        await banner.update(req.body);
        res.json(banner);
    } catch (error) {
        console.error('Update banner error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.delete('/banners/:id', async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Banner not found' });

        await banner.destroy();
        res.json({ message: 'Banner deleted' });
    } catch (error) {
        console.error('Delete banner error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin CRUD operations for blocks
r.post('/blocks', async (req, res) => {
    try {
        const block = await Block.create(req.body);
        res.status(201).json(block);
    } catch (error) {
        console.error('Create block error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.put('/blocks/:id', async (req, res) => {
    try {
        const block = await Block.findByPk(req.params.id);
        if (!block) return res.status(404).json({ message: 'Block not found' });

        await block.update(req.body);
        res.json(block);
    } catch (error) {
        console.error('Update block error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.delete('/blocks/:id', async (req, res) => {
    try {
        const block = await Block.findByPk(req.params.id);
        if (!block) return res.status(404).json({ message: 'Block not found' });

        await block.destroy();
        res.json({ message: 'Block deleted' });
    } catch (error) {
        console.error('Delete block error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin CRUD operations for users
r.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update(req.body);
        res.json(user);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin CRUD operations for operators
r.post('/operators', async (req, res) => {
    try {
        const operator = await User.create({ ...req.body, role: 'operator' });
        res.status(201).json(operator);
    } catch (error) {
        console.error('Create operator error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.put('/operators/:id', async (req, res) => {
    try {
        const operator = await User.findByPk(req.params.id);
        if (!operator) return res.status(404).json({ message: 'Operator not found' });

        await operator.update(req.body);
        res.json(operator);
    } catch (error) {
        console.error('Update operator error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

r.delete('/operators/:id', async (req, res) => {
    try {
        const operator = await User.findByPk(req.params.id);
        if (!operator) return res.status(404).json({ message: 'Operator not found' });

        await operator.destroy();
        res.json({ message: 'Operator deleted' });
    } catch (error) {
        console.error('Delete operator error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin settings operations
r.put('/settings', async (req, res) => {
    try {
        const settings = await Setting.findOne();
        if (!settings) {
            const newSettings = await Setting.create(req.body);
            return res.json(newSettings);
        }

        await settings.update(req.body);
        res.json(settings);
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Health check
r.get('/health', (req, res) => {
    res.json({ ok: true });
});

export default r;
