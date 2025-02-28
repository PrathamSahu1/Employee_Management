import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path, { join, dirname, basename as _basename } from 'path';
import { Sequelize } from 'sequelize';
import configFile from '../../config/config.js';

// ✅ Fix for Windows: Convert absolute path to `file://` URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = configFile[env];

const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// ✅ Fix: Convert Windows paths to `file://` URLs when using `import`
const modelFiles = readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js') || file.endsWith('.cjs'));

for (const file of modelFiles) {
  const modelPath = pathToFileURL(join(__dirname, file)).href; // Convert path to file URL
  const { default: modelInit } = await import(modelPath);
  const model = modelInit(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log("db",db)

export default db;
