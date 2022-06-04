const dotenv = require('dotenv')
const env = dotenv.config({silent: true})


const {
  // Default config
  PORT,
  NODE_ENV,
  CORS_DOMAINS,

  // DB  info
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD
} = process.env;

export enum ApplicationEnv {
  PRODUCTION = 'production',
  RELEASE = 'release',
  DEVELOPMENT = 'development'
}

const ENV: ApplicationEnv = NODE_ENV as ApplicationEnv || ApplicationEnv.DEVELOPMENT;

const CONFIG = {
  // Default config
  NODE_ENV: ENV,
  PORT: +PORT,
  CORS_DOMAINS: CORS_DOMAINS ? (<string[]> JSON.parse(CORS_DOMAINS)) : undefined,

  // DB info
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD
};

export default CONFIG;
