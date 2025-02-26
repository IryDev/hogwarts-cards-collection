import { Router } from "express";
import { getCardBySlug, getCards } from "../controllers/card.controller.js";

const cardsRouter = Router();

cardsRouter.get("/", getCards);

cardsRouter.get("/:slug", getCardBySlug);

export default cardsRouter;