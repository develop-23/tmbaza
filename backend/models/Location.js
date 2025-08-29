import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Location = sequelize.define('Location', {
    name: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

export default Location;