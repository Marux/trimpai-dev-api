export interface JwtPayload {
  sub: string;
  email: string;
  rol: string;
  iat?: number;
  exp?: number;
}