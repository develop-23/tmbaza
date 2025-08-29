import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import sequelize from './config/db.js';
import './models/index.js'; // init models + associations
import bootstrap from './utils/bootstrap.js';
import errorHandler from './middleware/errorHandler.js';
import apiLimiter from './middleware/rateLimit.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adRoutes from './routes/adRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blockRoutes from './routes/blockRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.json({ ok: true, name: 'Turkmenbazar API', version: '1.0.0' });
});

app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/blocks', blockRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// DB connect & start
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await bootstrap(); // create first admin/settings if missing
        app.listen(PORT, () => console.log(`API running on :${PORT}`));
    } catch (e) {
        console.error('Failed to start:', e);
        process.exit(1);
    }
})();