import { Prisma } from "../../generated/prisma";
import ConflictError from "./ConflictError";
import NotFoundError from "./NotFoundError";
import BadRequestError from "./BadRequestError";

export function mapPrismaError(err: unknown) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        return new ConflictError("Invalid uplicate value");
      }
      case "P2025":
        return new NotFoundError("Resource not found");
      case "P2003":
        return new BadRequestError("Invalid reference to another resource");
    }
  }

  return err;
}
