import { Router } from "express";

const router = Router();

router.get("/", (request, response) => response.json("Hello World!"));

export { router };
