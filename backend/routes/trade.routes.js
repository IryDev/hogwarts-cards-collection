import { Router } from 'express';
import { getTrades, requestTrade } from '../controllers/trade.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const tradeRouter = Router();

tradeRouter.get('/requests/', authorize, getTrades)

tradeRouter.post('/request', authorize, requestTrade);

// tradeRouter.post('/respond/:tradeId', authorize, respondToTrade);

export default tradeRouter;