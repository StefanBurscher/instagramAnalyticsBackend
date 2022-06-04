import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import morgan from 'morgan';
import CONFIG, { ApplicationEnv } from './config';
import { DB } from './services/database.service';

// Establish database connection
DB.authenticate();

import v1 from './routes/api';
import webhooks from './routes/webhooks';


const app = express();

// Middleware
app.use(morgan([ApplicationEnv.DEVELOPMENT, ApplicationEnv.RELEASE].includes(CONFIG.NODE_ENV) ? 'dev' : 'combined'));

// Webhooks (currently only Stripe webhooks)
app.use(webhooks);

app.use(helmet.xssFilter());

// Might possibly crash whitelabel websites
/*app.use(helmet.hsts({
  maxAge: 365 * 24 * 60 * 60,
  includeSubDomains: true
}));*/

app.use(helmet.frameguard({
  action: 'deny'
}));

app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());

// Admin
// Routes
app.use(v1);

const server = createServer(app);

const AppPort = +CONFIG.PORT || 3000
server.listen(AppPort, () => {
  console.log(`Server is listening on port: ${AppPort}`);
  console.log('Press CTRL-C to stop\n');
});

server.timeout = 100000;

export default app;
