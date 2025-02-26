import cookieParser from "cookie-parser";
import express from "express";
import { PORT } from "./config/env.js";
import { connectDB } from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import boosterRouter from "./routes/booster.routes.js";
import cardsRouter from "./routes/card.routes.js";
import tradeRouter from "./routes/trade.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(errorMiddleware)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cards", cardsRouter);
app.use("/api/v1/booster", boosterRouter);
app.use("/api/v1/trade", tradeRouter)

app.get("/", (req, res) => {
    res.send("Hello World");
}
)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);

    connectDB();
}
);

export default app;