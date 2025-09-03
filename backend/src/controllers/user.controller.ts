import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.login(req.body.email, req.body.password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUser(req.user!.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();