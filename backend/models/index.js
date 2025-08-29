import User from './User.js';
import Ad from './Ad.js';
import Category from './Category.js';
import Location from './Location.js';
import Banner from './Banner.js';
import Block from './Block.js';
import Setting from './Setting.js';

// Category hierarchy
Category.hasMany(Category, { as: 'children', foreignKey: 'parentId', onDelete: 'SET NULL' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

// Location hierarchy
Location.hasMany(Location, { as: 'children', foreignKey: 'parentId', onDelete: 'SET NULL' });
Location.belongsTo(Location, { as: 'parent', foreignKey: 'parentId' });

// Ad relations
Ad.belongsTo(User, { as: 'user' });
Ad.belongsTo(Category, { as: 'category' });
Ad.belongsTo(Location, { as: 'location' });

// Exports
export { User, Ad, Category, Location, Banner, Block, Setting };