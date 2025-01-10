import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);


const db = {};


// default Config 

//const env = process.env.NODE_ENV || 'development';
// const configPath = path.join(__dirname, '../config/config.json');
// const configRaw = fs.readFileSync(configPath, 'utf-8');
// const config = JSON.parse(configRaw)[env];


// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

//custom config

const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
};

console.log(config)

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Define an async IIFE to handle the initialization
(async () => {
  const modelFiles = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    });

  for (const file of modelFiles) {
    const modelPath = path.join(__dirname, file);
    // Convert file path to URL format for Windows compatibility
    const modelUrl = `file://${modelPath.replace(/\\/g, '/')}`;
    const modelModule = await import(modelUrl);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  // Set up associations after all models are imported and registered
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Set sequelize and Sequelize on the db object after models are initialized
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
})();

export default db;