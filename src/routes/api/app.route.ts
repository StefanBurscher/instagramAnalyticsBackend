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
}