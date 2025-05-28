export default class BadRequestError extends Error {
  public statusCode: number;

  constructor(message = 'Некорректные данные') {
    super(message);
    this.statusCode = 400;
  }
}
