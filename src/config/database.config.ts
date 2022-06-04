import CONFIG from './index';

const {DB_NAME, DB_PASSWORD, DB_HOST, DB_USER} = CONFIG;

const config: any = {};
const env = process.env.NODE_ENV;

config[env] = {
  'username': DB_USER,
  'password': DB_PASSWORD,
  'database': DB_NAME,
  'host': DB_HOST,
  'port': 3306,
  'dialect': 'mysql',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: true
  },
  'logging': false
};

module.exports = config;
