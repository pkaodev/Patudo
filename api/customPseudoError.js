//???extend ERROR
//want same shape as below
export class CustomPseudoError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

