import { Transaction } from "@modules/payments/infra/typeorm/entities/Transaction";
import { ITransactionRepository } from "@modules/payments/repositories/ITransactionRepository";
import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  value: number;
  payment_method: string;
  description: string;
  card_name: string;
  card_number: string;
  card_validate: string;
  card_cvv: string;
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository
  ) {}

  async execute({
    value,
    payment_method,
    description,
    card_name,
    card_number,
    card_validate,
    card_cvv,
  }: IRequest): Promise<Transaction> {
    const validateTransactionObject =
      await this.transactionRepository.createObject({
        value,
        payment_method,
        description,
        card_name,
        card_number,
        card_validate,
        card_cvv,
      });

    const error = await validate(validateTransactionObject);

    if (error.length > 0) {
      console.log(error);
      throw new AppError("Validation failed", 400, error);
    }

    const transaction = await this.transactionRepository.create({
      value,
      payment_method,
      description,
      card_name,
      card_number: card_number.slice(-4),
      card_validate,
      card_cvv,
    });

    return transaction;
  }
}
