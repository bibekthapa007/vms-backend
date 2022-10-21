import { Request, Response, NextFunction } from 'express';

import HttpStatus from 'http-status-codes';

import TokenError from '../errors/token';
import DatabaseError from '../errors/database';
import ForbiddenError from '../errors/forbidden';
import ValidationError from '../errors/validation';
import NotFoundError from '../errors/notFound';
import Logger from '../utils/Logger';

function buildError(error: any) {
  if (error instanceof NotFoundError) {
    return {
      code: HttpStatus.NOT_FOUND,
      message: error.message,
    };
  }

  if (error instanceof ValidationError) {
    return {
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: error.message,
    };
  }

  if (error instanceof ForbiddenError) {
    return {
      code: HttpStatus.FORBIDDEN,
      message: error.message,
    };
  }

  if (error instanceof DatabaseError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: error.message || 'Something went wrong',
    };
  }

  if (error instanceof TokenError) {
    return {
      code: HttpStatus.UNAUTHORIZED,
      message: error.message || 'Invalid token',
    };
  }
  console.error(error);
  // Logger.error(error);
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong',
  };
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const error = buildError(err);
  res.status(error.code).json(error);
}
