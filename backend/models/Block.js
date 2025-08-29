import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Block = sequelize.define('Block', {
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    service: { type: DataTypes.STRING }, // which filter target it maps to
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

export default Block;