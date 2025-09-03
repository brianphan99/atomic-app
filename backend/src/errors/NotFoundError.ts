import AppError from "./AppError";
export default class NotFoundError extends AppError {
  constructor(message = "Not found") { super(message, 404); }
}