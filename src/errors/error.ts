class BaseError extends Error {
  private readonly custom: boolean;

  constructor(message = '') {
    super(message);

    this.message = message;
    this.custom = true;
  }
}

export default BaseError;
