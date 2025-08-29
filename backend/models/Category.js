import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Categories', {
    name: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

// parentId handled via association in index.js
export default Category;