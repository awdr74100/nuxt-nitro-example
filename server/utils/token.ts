import { SignJWT, jwtVerify } from 'jose';

interface JWTPayload {
  [propName: string]: unknown;
}

export const signAccessToken = (payload: JWTPayload, expiresIn: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.accessTokenSecret);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const signRefreshToken = (payload: JWTPayload, expiresIn: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.refreshTokenSecret);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const verifyAccessToken = <T extends JWTPayload>(token: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.accessTokenSecret);

  return jwtVerify(token, secret).then(
    ({ payload }) => payload as T & { iat: number; exp: number },
  );
};

export const verifyRefreshToken = <T extends JWTPayload>(token: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.refreshTokenSecret);

  return jwtVerify(token, secret).then(
    ({ payload }) => payload as T & { iat: number; exp: number },
  );
};
