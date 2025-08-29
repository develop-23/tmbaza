import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Setting = sequelize.define('Setting', {
    mediaLimit: { type: DataTypes.INTEGER, defaultValue: Number(process.env.MEDIA_LIMIT || 5) },
    bannerFrequency: { type: DataTypes.INTEGER, defaultValue: Number(process.env.BANNER_FREQUENCY || 30) },
    whatsappNumber: { type: DataTypes.STRING, defaultValue: process.env.WHATSAPP_NUMBER || '' }
}, { timestamps: true });

export default Setting;