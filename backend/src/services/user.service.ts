import prisma from "../prisma/client";
import BadRequestError from "../errors/BadRequestError";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret"; // in prod, use env variable

class UserService {
  async register(user: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      const newUser = await prisma.user.create({
        data: { email: user.email, password: hashedPassword },
      });
      const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "30d" });
      return {token};
    } catch (err: any) {
      if (err.code === "P2002")
        throw new ConflictError("Email already registered");
      throw err;
    }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestError("Wrong email or password");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new BadRequestError("Wrong email or password");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });
    return { token };
  }

  async deleteUser(id: number) {
    await prisma.user.delete({ where: { id } });
  }
}

export default new UserService();
