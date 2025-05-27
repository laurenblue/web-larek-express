import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import BadRequestError from "../errors/BadRequestError";
import ConflictError from "../errors/ConflictError";
import ServerError from "../errors/ServerError";

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.json({ items: products, total: products.length });
  } catch (err) {
    next(new ServerError());
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err: any) {
    if (err instanceof Error && err.message.includes("E11000")) {
      return next(new ConflictError("Товар с таким заголовком уже существует"));
    }

    if (err.name === "ValidationError") {
      return next(
        new BadRequestError("Ошибка валидации данных при создании товара")
      );
    }

    return next(new ServerError());
  }
};
