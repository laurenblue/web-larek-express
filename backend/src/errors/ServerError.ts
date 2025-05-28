export default class ServerError extends Error {
  public statusCode: number;

  constructor(message = 'Ошибка на сервере') {
    super(message);
    this.statusCode = 500;
  }
}
