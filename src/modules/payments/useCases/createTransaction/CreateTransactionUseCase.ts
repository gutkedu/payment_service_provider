import { Transaction } from "@modules/payments/infra/typeorm/entities/Transaction";
import { ITransactionRepository } from "@modules/payments/repositories/ITransactionRepository";
import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { IPayableRepository } from "@modules/payments/repositories/IPayableRepository";
import { Payable } from "@modules/payments/infra/typeorm/entities/Payable";

interface IRequest {
  value: number;
  payment_method: string;
  description: string;
  card_name: string;
  card_number: string;
  card_validate: string;
  card_cvv: string;
}

interface IResponse {
  transaction: Transaction;
  payable: Payable;
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("PayableRepository")
    private payableRepository: IPayableRepository
  ) {}

  async execute({
    value,
    payment_method,
    description,
    card_name,
    card_number,
    card_validate,
    card_cvv,
  }: IRequest): Promise<IResponse> {
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

    let fee: number = 0;
    let payment_date: Date;
    let status: string;
    const debitCardFee: number = 3;
    const creditCardFee: number = 5;

    if (payment_method === "debit_card") {
      fee = (value / 100) * debitCardFee;
      payment_date = this.dateProvider.dateNow();
      status = "paid";
    } else if (payment_method === "credit_card") {
      fee = (value / 100) * creditCardFee;
      payment_date = this.dateProvider.addDays(30);
      status = "waiting_funds";
    }

    const transaction = await this.transactionRepository.create({
      value: value - fee,
      payment_method,
      description,
      card_name,
      card_number: card_number.slice(-4),
      card_validate,
      card_cvv,
    });

    const payable = await this.payableRepository.create({
      fee,
      payment_date,
      status,
      transaction_id: transaction.id,
    });

    console.log(payable);

    return { transaction, payable };
  }
}
