import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError";

const JWT_SECRET = process.env.JWT_SECRET || "secret"; // use env variable in production

interface JwtPayload {
  id: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Missing or invalid authorization header"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: payload.id };
    next();
  } catch (err) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}