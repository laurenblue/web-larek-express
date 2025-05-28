import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import ServerError from '../errors/ServerError';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    items,
    total,
    payment,
    email,
    phone,
    address,
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new BadRequestError('Нужно передать хотя бы один товар'));
  }

  try {
    const products = await Product.find({
      _id: { $in: items },
      price: { $ne: null },
    });

    const sum = products.reduce((acc, p) => acc + (p.price ?? 0), 0);

    if (sum !== total) {
      return next(new BadRequestError('Неверная сумма заказа'));
    }

    if (!['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Неверный способ оплаты'));
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return next(new BadRequestError('Неверный email'));
    }

    if (!phone || typeof phone !== 'string') {
      return next(new BadRequestError('Неверный номер телефона'));
    }

    if (!address || typeof address !== 'string') {
      return next(new BadRequestError('Адрес обязателен'));
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total: sum,
    });
  } catch (err) {
    return next(new ServerError());
  }
};

export default createOrder;
