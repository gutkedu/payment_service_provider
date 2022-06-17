import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

export class ListTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTransactionUseCase = container.resolve(ListTransactionsUseCase);

    const allTransactions = await listTransactionUseCase.execute();

    return response.status(200).json(allTransactions);
  }
}
