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
      console.log('Auth', req.body, req.query);
      const { code } = req.query;
      console.log("🚀 ~ file: app.route.ts ~ line 34 ~ AppRoute ~ auth ~ code", code)

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


  /**
   *
   * Used to login user
   * @param req
   * @param res
   * @param next
   */
  static async sendNotification(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('sendNotification', req.body);
      const { token } = req.body

      const message = {
        to: token,
        sound: "default",
        title: "Test",
        body: "Backend",
        data: {}
      };

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });

      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }




}