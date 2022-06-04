import CONFIG from '../config';
import { DatabaseConnection } from '../models';

DatabaseConnection.init({
  dbName: CONFIG.DB_NAME,
  dbPass: CONFIG.DB_PASSWORD,
  dbUser: CONFIG.DB_USER,
  dbHost: CONFIG.DB_HOST,
  dbPort: CONFIG.DB_PORT,
  poolSettings: {
    min: 10,
    max: 30
  }
});

export const DB = DatabaseConnection.db;
