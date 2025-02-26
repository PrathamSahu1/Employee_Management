import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { Sequelize } from 'sequelize';
import configFile from '../../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically import models
const modelFiles = readdirSync(__dirname)
  .filter(file => file !== path.basename(__filename) && file.endsWith('.js'));

for (const file of modelFiles) {
  const { default: model } = await import(join(__dirname, file));
  db[model.name] = model(sequelize, Sequelize.DataTypes);
}

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
