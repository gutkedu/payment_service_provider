import { Router } from "express";
import { transactionRoutes } from "./transaction.routes";

const router = Router();

router.get("/", (request, response) => response.json("Hello World!"));
router.use("/transaction", transactionRoutes);

export { router };
