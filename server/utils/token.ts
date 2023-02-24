import { SignJWT, jwtVerify } from 'jose';

interface JWTPayload {
  [propName: string]: unknown;
}

export const signAccessToken = (payload: JWTPayload, expiresIn: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.APP_ACCESS_TOKEN_SECRET);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const signRefreshToken = (payload: JWTPayload, expiresIn: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.APP_REFRESH_TOKEN_SECRET);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const verifyAccessToken = <T extends JWTPayload>(token: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.APP_ACCESS_TOKEN_SECRET);

  return jwtVerify(token, secret).then(
    ({ payload }) => payload as T & { iat: number; exp: number },
  );
};

export const verifyRefreshToken = <T extends JWTPayload>(token: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.APP_REFRESH_TOKEN_SECRET);

  return jwtVerify(token, secret).then(
    ({ payload }) => payload as T & { iat: number; exp: number },
  );
};
