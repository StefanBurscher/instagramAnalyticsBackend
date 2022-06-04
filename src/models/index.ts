
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

export interface DatabaseConnectionInfo {
    dbName: string;
    dbPass: string;
    dbUser: string;
    dbHost: string;
    dbPort: string;
    poolSettings?: sequelize.PoolOptions;
  }
  
  const defaultPoolOptions: sequelize.PoolOptions = {
    min: 2,
    max: 7,
    idle: 30000,
    acquire: 60000,
    evict: undefined
  };
  export class DatabaseConnection {
    private static sequelize: Sequelize;
  
    public static get db(): Sequelize {
      if (!this.sequelize) {
        throw new Error('Sequelize connection is not initialized!');
      }
  
      return this.sequelize;
    }
  
    static init(info: DatabaseConnectionInfo) {
      if (this.sequelize) {
        throw new Error('Sequelize already initialized!');
      }
  
      this.sequelize = new Sequelize({
        name: info.dbName,
        password: info.dbPass,
        username: info.dbUser,
        dialect: 'mysql',
        host: info.dbHost,
        port: +info.dbPort,
        modelPaths: [__dirname + '/*.model.js'],
        pool: {
          min: (info.poolSettings && info.poolSettings.min) || defaultPoolOptions.min,
          max: (info.poolSettings && info.poolSettings.max) || defaultPoolOptions.max,
          idle: (info.poolSettings && info.poolSettings.idle) || defaultPoolOptions.idle,
          acquire: (info.poolSettings && info.poolSettings.acquire) || defaultPoolOptions.acquire,
          evict: (info.poolSettings && info.poolSettings.evict) || defaultPoolOptions.evict
        },
        dialectOptions: {
          connectTimeout: 30000
        }
      });
    }
  
    static async closeConnection() {
      await this.sequelize.close();
      this.sequelize = undefined;
    }
  }
  