import { NextFunction, Request, Response } from 'express';
// import { DatabaseConnection } from '../../models';

// const DB = DatabaseConnection.db;


export class AppRoute {
    /**
     *
     * Used to login user
     * @param req
     * @param res
     * @param next
     */
    static async healthCheck(req: Request, res: Response, next: NextFunction) {
      try {
        res.status(200).end();
      } catch (err) {
        next(err);
      }
    }

    /**
     *
     * Used to login user
     * @param req
     * @param res
     * @param next
     */
     static async auth(req: Request, res: Response, next: NextFunction) {
      try {
        console.log('Auth', req.body);

        res.status(200).end();
      } catch (err) {
        next(err);
      }
    }

    /**
     *
     * Used to login user
     * @param req
     * @param res
     * @param next
     */
    static async deAuth(req: Request, res: Response, next: NextFunction) {
      try {
        console.log('De auth', req.body);
        res.status(200).end();
      } catch (err) {
        next(err);
      }
    }

    /**
     *
     * Used to login user
     * @param req
     * @param res
     * @param next
     */
    static async delete(req: Request, res: Response, next: NextFunction) {
      try {
        console.log('Delete', req.body);
        res.status(200).end();
      } catch (err) {
        next(err);
      }
    }
}