import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import { JwtPayload } from '../types/JwtPayload';
import TokenError from '../errors/token';

const createJwtToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

function checkJwt(req: Request, res: Response, next: NextFunction) {
  let token: any;
  if (req.headers['authorization']) token = req.headers['authorization'].split(' ')[1];
  if (req.headers['x-access-token']) token = req.headers['x-access-token'];
  if (req.headers['token']) token = req.headers['token'];
  if (req.query.token) token = req.query.token;

  token = <string>token;
  if (!token) {
    return next(new TokenError('Token Missing'));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, function (err: any, data: any) {
    if (err) {
      return next(new TokenError(err.message));
    }
    data = <JwtPayload>data;
    if (!(data && data.id)) return res.status(500).send({ message: 'Jwt token not found.' });
    next();
  });
}

export { createJwtToken, checkJwt };
