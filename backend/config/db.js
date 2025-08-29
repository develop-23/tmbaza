import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASS) {
    // Use PostgreSQL if credentials are provided
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                ssl: false
            }
        }
    );
} else {
    // Fallback to SQLite for development
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
    console.log('Using SQLite database for development');
}

export default sequelize;
