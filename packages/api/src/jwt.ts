import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
}

export function signJwt(
  payload: JwtPayload,
  secret: string = process.env.JWT_SECRET || 'secret',
): string {
  return jwt.sign(payload, secret);
}

export function verifyJwt(
  token: string,
  secret: string = process.env.JWT_SECRET || 'secret',
): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}
