import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transaction } from "../infra/typeorm/entities/Transaction";

export interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  list(): Promise<Transaction[]>;
}
