import { container } from "tsyringe";

import { PayableRepository } from "@modules/payments/infra/typeorm/repositories/PayableRepository";
import { TransactionRepository } from "@modules/payments/infra/typeorm/repositories/TransactionRepository";
import { IPayableRepository } from "@modules/payments/repositories/IPayableRepository";
import { ITransactionRepository } from "@modules/payments/repositories/ITransactionRepository";
import { IDateProvider } from "./provider/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./provider/DateProvider/implementations/DayJsDateProvider";

container.registerSingleton<ITransactionRepository>(
  "TransactionRepository",
  TransactionRepository
);

container.registerSingleton<IPayableRepository>(
  "PayableRepository",
  PayableRepository
);

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
