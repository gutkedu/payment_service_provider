import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      value,
      payment_method,
      description,
      card_name,
      card_number,
      card_validate,
      card_cvv,
    } = request.body;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase
    );

    const transaction = await createTransactionUseCase.execute({
      value,
      payment_method,
      description,
      card_name,
      card_number,
      card_validate,
      card_cvv,
    });

    return response.status(201).json(transaction);
  }
}
