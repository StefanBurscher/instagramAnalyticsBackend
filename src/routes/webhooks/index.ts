import bodyParser from 'body-parser';
import { Router } from 'express';

const webhook = Router();

// todo: set upload size
// tslint:disable-next-line: deprecation
webhook.use(bodyParser.json({ limit: '50mb' }));
// tslint:disable-next-line: deprecation
webhook.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));

// Gmail webhooks
// webhook.post(`${baseUrl}/webhooks/pin`, s.pinEmailRequest, WebhookRoute.pin);

export default webhook;
