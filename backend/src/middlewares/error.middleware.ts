import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { mapPrismaError } from "../errors/PrismaErrorMapper";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const mappedError = mapPrismaError(err);

  if (mappedError instanceof AppError) {
    return res.status(mappedError.statusCode).json({
      message: mappedError.message,
    });
  }

  console.error("Unexpected Error:", err);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
}

export default errorHandler;