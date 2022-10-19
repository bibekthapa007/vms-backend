import BaseError from './error';

class TokenError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}

export default TokenError;
