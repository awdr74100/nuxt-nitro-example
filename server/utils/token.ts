import { SignJWT, jwtVerify } from 'jose';

export const createAccessToken = (payload: object, expiresIn: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.accessTokenSecret);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const createRefreshToken = (payload: object, expiresIn: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.refreshTokenSecret);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const verifyAccessToken = (token: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.accessTokenSecret);

  return jwtVerify(token, secret);
};

export const verifyRefreshToken = (token: string) => {
  const config = useRuntimeConfig();

  const secret = new TextEncoder().encode(config.refreshTokenSecret);

  return jwtVerify(token, secret);
};
