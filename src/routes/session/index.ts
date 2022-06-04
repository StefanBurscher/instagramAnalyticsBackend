
import { Request } from 'express';
import MySQLStore from 'express-mysql-session';
import expressSession from 'express-session';
import CONFIG, { ApplicationEnv } from '../../config';

const {
  SESSION_KEY,
  SESSION_SECRET,
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_SECURE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const sessionStoreOtions = {
  host: DB_HOST,
  port: +DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
};

const sessionStore: any = new MySQLStore(sessionStoreOtions);

export const getApiKey = (req: Request): string => {
  return (req.headers['x-api-key'] || '').toString();
};

export const session = expressSession({
  name: SESSION_KEY,
  secret: SESSION_SECRET,
  store: sessionStore,
  unset: 'destroy',
  resave: false,
  saveUninitialized: true,
  // Trusts the reverse proxy(Nginx)
  proxy: true,
  cookie: {
    maxAge: +SESSION_COOKIE_MAX_AGE,
    sameSite: [ApplicationEnv.DEVELOPMENT, ApplicationEnv.RELEASE].includes(CONFIG.NODE_ENV) ? undefined : 'lax',
    secure: SESSION_COOKIE_SECURE !== 'false',
    httpOnly: true
  }
});
