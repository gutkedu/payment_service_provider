import { TransactionRepository } from "@modules/payments/infra/typeorm/repositories/TransactionRepository";
import { ITransactionRepository } from "@modules/payments/repositories/ITransactionRepository";
import { container } from "tsyringe";

container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);
