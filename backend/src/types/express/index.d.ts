import "express";

declare module "express-serve-static-core" {
  interface Request { // Adding property user to Request
    user?: {
      id: number;
    };
  }
}