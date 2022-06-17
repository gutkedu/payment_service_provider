import { inject, injectable } from "tsyringe";
import { Transaction } from "@modules/payments/infra/typeorm/entities/Transaction";
import { ITransactionRepository } from "@modules/payments/repositories/ITransactionRepository";

@injectable()
export class ListTransactionsUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.list();
    return transactions;
  }
}
