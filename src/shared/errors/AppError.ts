import { ValidationError } from "class-validator";

export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly validation: ValidationError[];

  constructor(
    message: string,
    statusCode = 400,
    validation?: ValidationError[]
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.validation = validation;
  }
}
