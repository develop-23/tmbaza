import bcrypt from 'bcrypt';
import { User, Setting } from '../models/index.js';

export default async function bootstrap() {
    const admin = await User.findOne({ where: { role: 'admin' } });
    if (!admin) {
        const passwordHash = await bcrypt.hash(process.env.BOOTSTRAP_ADMIN_PASSWORD || 'admin', 10);
        await User.create({
            name: process.env.BOOTSTRAP_ADMIN_NAME || 'Admin',
            phone: process.env.BOOTSTRAP_ADMIN_PHONE || '+0000000000',
            username: process.env.BOOTSTRAP_ADMIN_USERNAME || 'admin',
            passwordHash,
            role: 'admin',
            verified: true
        });
        console.log('Bootstrap admin created');
    }
    const setting = await Setting.findOne();
    if (!setting) {
        await Setting.create({});
        console.log('Default settings created');
    }
}