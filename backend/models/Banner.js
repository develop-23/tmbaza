import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Banner = sequelize.define('Banner', {
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
    position: { type: DataTypes.ENUM('top', 'bottom', 'inline'), defaultValue: 'inline' }
}, { timestamps: true });

export default Banner;