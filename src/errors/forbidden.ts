import BaseError from './error';

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
