import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { requestLogger, errorLogger } from "./middlewares/logger";
import productRoutes from "./routes/productRoutes";
import path from "path";
import orderRoutes from "./routes/orderRoutes";
import { errors } from "celebrate";
import errorHandler from "./middlewares/errorHandler";
import NotFoundError from "./errors/NotFoundError";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

app.use(productRoutes);
app.use(orderRoutes);

app.use((_req, _res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/weblarek")
  .then(() => console.log("Подключено к MongoDB :) "))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));
