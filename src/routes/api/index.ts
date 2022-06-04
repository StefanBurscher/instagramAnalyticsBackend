import bodyParser = require('body-parser');
import cors from 'cors';
import { Router } from 'express';
import CONFIG, { ApplicationEnv } from '../../config';
import { error } from '../handlers/errorHandler.handler';
import { session } from '../session';
import { AppRoute } from './app.route';

const v1 = Router();
const baseUrl = '/api/backend/v1';

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

v1.use(session);

v1.post(`${baseUrl}/health`, AppRoute.healthCheck);

v1.use(error);

export default v1;
