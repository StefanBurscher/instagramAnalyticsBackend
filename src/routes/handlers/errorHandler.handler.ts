import {
    AuthenticationError,
    AuthorizationError,
    ConflictError,
    CustomValidationError,
    InvalidRequestError,
    NotFoundError,
    ServiceUnavailableError
} from '../../enum/error';
import {
  APIResponse,
  TimedOutError
} from '../../utils';
import { NextFunction, Request, Response } from 'express';

/**
 *
 * Global error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
function error (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AuthenticationError) {
      res.status(401).json(APIResponse.error(401, err.message ? err.message : 'Unauthorized'));
    } else if (err instanceof AuthorizationError) {
      res.status(403).json(APIResponse.error(403, err.message ? err.message : 'Forbidden'));
    } else if (err instanceof NotFoundError) {
      res.status(404).json(APIResponse.error(404, err.message ? err.message : 'Not found'));
    } else if (err instanceof ConflictError) {
      res.status(409).json(APIResponse.error(409, err.message || 'Conflict Error'));
    } else if (err instanceof InvalidRequestError) {
      res.status(400).json(APIResponse.error(400, err.message || 'Bad Request'));
    } else if (err instanceof ServiceUnavailableError) {
      res.status(503).json(APIResponse.error(503, err.message || 'Service Unavailable'));
    }  else if (err instanceof CustomValidationError) {
      res.status(422).json(APIResponse.error(422, err.message ? err.message : 'Validation Error', err.err));
    } else if (err instanceof TimedOutError) {
      res.status(522).json(APIResponse.error(522, err.message || 'Connection Timed Out'));
    } else {
      const status = 500;
      const message =  err.stack;
      res.status(status).send(message).end();
    }
}
/**
 *
 * Returns status 200
 * @param req
 * @param res
 * @param next
 */
function ok (req: Request, res: Response, next: NextFunction) {
  res.status(200).end();
}

export {
  error,
  ok
};
