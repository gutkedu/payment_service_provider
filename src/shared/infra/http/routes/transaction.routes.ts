import { CreateTransactionController } from "@modules/payments/useCases/createTransaction/CreateTransactionController";
import { ListTransactionsController } from "@modules/payments/useCases/listTransactions/ListTransactionsController";
import { Router } from "express";

const transactionRoutes = Router();

const listTransactionController = new ListTransactionsController();
const createTransactionController = new CreateTransactionController();

transactionRoutes.get("/", listTransactionController.handle);

transactionRoutes.post("/", createTransactionController.handle);

export { transactionRoutes };
