//for any error, choose status code
export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

//for illegal game moves, 400 status code
export class GameError extends Error {
  constructor(message) {
    super(message);
    this.name = "GameError";
    this.statusCode = 400;
  }
}


