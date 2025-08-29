import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const isPostgres = sequelize.getDialect() === 'postgres';

const Ad = sequelize.define('Ad', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    images: {
        type: isPostgres ? DataTypes.ARRAY(DataTypes.STRING) : DataTypes.JSON,
        defaultValue: []
    },
    videos: {
        type: isPostgres ? DataTypes.ARRAY(DataTypes.STRING) : DataTypes.JSON,
        defaultValue: []
    },
    vip: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
        type: isPostgres ? DataTypes.ENUM('pending', 'approved', 'rejected') : DataTypes.STRING,
        defaultValue: 'pending'
    },
    rejectReason: { type: DataTypes.STRING },
    blockReason: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

export default Ad;
