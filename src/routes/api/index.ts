import bodyParser = require('body-parser');
import cors from 'cors';
import { Router } from 'express';
import CONFIG, { ApplicationEnv } from '../../config';
import { error } from '../handlers/errorHandler.handler';
// import { session } from '../session';
import { AppRoute } from './app.route';
import { GraphRoute } from './graph.route';

const v1 = Router();
// const baseUrl = '/api/backend/v1';
const baseUrl = '';

v1.use(cors({
  origin: (origin, callback) => {
    ![ApplicationEnv.DEVELOPMENT, ApplicationEnv.RELEASE].includes(CONFIG.NODE_ENV) &&  CONFIG.CORS_DOMAINS ? callback(undefined, CONFIG.CORS_DOMAINS.includes(origin)) : callback(undefined, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// todo: set upload size
// tslint:disable-next-line: deprecation
v1.use(bodyParser.json({ limit: '50mb' }));
// tslint:disable-next-line: deprecation
v1.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));

// v1.use(session);

v1.get(`${baseUrl}/health`, AppRoute.healthCheck);
v1.get(`${baseUrl}/auth`, AppRoute.auth);
v1.post(`${baseUrl}/deauth`, AppRoute.deAuth);
v1.post(`${baseUrl}/delete`, AppRoute.delete);

v1.post(`${baseUrl}/send-notification`, AppRoute.sendNotification);


v1.get(`${baseUrl}/graph/auth`, GraphRoute.auth);
v1.post(`${baseUrl}/graph/deauth`, GraphRoute.deAuth);
v1.post(`${baseUrl}/graph/delete`, GraphRoute.delete);

v1.use(error);

export default v1;
