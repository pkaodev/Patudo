//???extend ERROR
//want same shapes as below

//for any error, choose status code
export class PseudoCustomError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

//for game logic errors, 400 status code
export class PseudoGameError {
  constructor(message) {
    this.statusCode = 400;
    this.message = message;
  }
}


