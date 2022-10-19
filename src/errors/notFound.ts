import BaseError from './error';

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'RowNotFoundError';
  }
}

export default NotFoundError;
