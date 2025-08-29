import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: true, unique: true }, // for admins/operators
    passwordHash: { type: DataTypes.STRING },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.ENUM('user', 'operator', 'admin'), defaultValue: 'user' }
}, { timestamps: true });

export default User;