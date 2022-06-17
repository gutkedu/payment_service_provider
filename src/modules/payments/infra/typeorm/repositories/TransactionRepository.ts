import { ICreateTransactionDTO } from "@modules/payments/dtos/ICreateTransactionDTO";
import { ITransactionRepository } from "@modules/payments/repositories/ITransactionRepository";
import { getRepository, Repository } from "typeorm";
import { Transaction } from "../entities/Transaction";

export class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async create({
    value,
    payment_method,
    description,
    card_name,
    card_number,
    card_cvv,
    card_validate,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.repository.create({
      value,
      payment_method,
      description,
      card_name,
      card_number,
      card_cvv,
      card_validate,
    });
    await this.repository.save(transaction);
    return transaction;
  }

  async list(): Promise<Transaction[]> {
    const allTransactions = await this.repository.find();
    return allTransactions;
  }
}
