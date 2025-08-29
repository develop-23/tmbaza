import bcrypt from 'bcrypt';
import { User, Ad } from '../models/index.js';

export const me = async (req, res) => {
    const me = await User.findByPk(req.user.id, { attributes: { exclude: ['passwordHash'] } });
    res.json(me);
};

export const listUsers = async (req, res) => {
    const users = await User.findAll({where: { role: 'user' }, order: [['createdAt', 'DESC']] });
    res.json(users);
};

export const verifyUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.verified = true;
    user.blocked = false;
    await user.save();
    res.json({ message: 'Verified' });
};

export const blockUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.blocked = true;
    user.verified = false;
    await user.save();
    res.json({ message: 'Blocked' });
};

export const userAds = async (req, res) => {
    const { id } = req.params;
    const ads = await Ad.findAll({ where: { UserId: id }, order: [['createdAt', 'DESC']] });
    res.json(ads);
};

export const changeAdminPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const me = await User.findByPk(req.user.id);
    if (!me) return res.status(404).json({ message: 'Not found' });
    const ok = await bcrypt.compare(currentPassword || '', me.passwordHash || '');
    if (!ok) return res.status(401).json({ message: 'Wrong password' });
    me.passwordHash = await bcrypt.hash(newPassword, 10);
    await me.save();
    res.json({ message: 'Password updated' });
};

export const addOperator = async (req, res) => {
    const { name, username, password } = req.body;
    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(409).json({ message: 'Username exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const op = await User.create({ name, username, passwordHash, role: 'operator', phone: 'N/A', verified: true });
    res.status(201).json(op);
};

export const listOperators = async (req, res) => {
    const ops = await User.findAll({ where: { role: 'operator' }, attributes: { exclude: ['passwordHash'] } });
    res.json(ops);
};

export const updateOperator = async (req, res) => {
    const { id } = req.params; const { name, username, password } = req.body;
    const op = await User.findByPk(id);
    if (!op || op.role !== 'operator') return res.status(404).json({ message: 'Not found' });
    if (name) op.name = name;
    if (username) op.username = username;
    if (password) op.passwordHash = await bcrypt.hash(password, 10);
    await op.save();
    res.json(op);
};

export const deleteOperator = async (req, res) => {
    const { id } = req.params; const op = await User.findByPk(id);
    if (!op || op.role !== 'operator') return res.status(404).json({ message: 'Not found' });
    await op.destroy();
    res.json({ message: 'Operator removed' });
};