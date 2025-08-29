import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { me, listUsers, verifyUser, blockUser, userAds, changeAdminPassword, addOperator, listOperators, updateOperator, deleteOperator } from '../controllers/userController.js';

const r = Router();

r.get('/me', auth, me);
r.get('/me/ads', auth, async (req, res) => {
    try {
        const { Ad, Category, Location } = await import('../models/index.js');
        const ads = await Ad.findAll({
            where: { userId: req.user.id },
            include: [
                { model: Category, as: 'category', attributes: ['name'] },
                { model: Location, as: 'location', attributes: ['name'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(ads);
    } catch (error) {
        console.error('User ads error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin only
r.get('/', auth, requireRole('admin'), listUsers);
r.patch('/:id/verify', auth, requireRole('admin'), verifyUser);
r.patch('/:id/block', auth, requireRole('admin'), blockUser);

// Admin: operators management
r.post('/operators', auth, requireRole('admin'), addOperator);
r.get('/operators', auth, requireRole('admin'), listOperators);
r.patch('/operators/:id', auth, requireRole('admin'), updateOperator);
r.delete('/operators/:id', auth, requireRole('admin'), deleteOperator);

// Admin/operator: change own password (for admin/operator)
r.post('/change-password', auth, requireRole('admin','operator'), changeAdminPassword);

// View user's ads
r.get('/:id/ads', auth, requireRole('admin','operator'), userAds);

export default r;
