import { createSigner, createVerifier } from 'fast-jwt';
import ms, { StringValue } from 'ms';

interface Payload {
  [key: string]: unknown;
}

export const signAccessToken = (payload: Payload, expiresIn: StringValue) => {
  const config = useRuntimeConfig();

  const signSync = createSigner({
    key: config.accessTokenSecret,
    expiresIn: ms(expiresIn),
  });

  return signSync(payload);
};

export const signRefreshToken = (payload: Payload, expiresIn: StringValue) => {
  const config = useRuntimeConfig();

  const signSync = createSigner({
    key: config.refreshTokenSecret,
    expiresIn: ms(expiresIn),
  });

  return signSync(payload);
};

export const verifyAccessToken = <T extends Payload>(token: string) => {
  const config = useRuntimeConfig();

  const verifySync = createVerifier({
    key: config.accessTokenSecret,
  });

  return verifySync(token) as T & { iat: number; exp: number };
};

export const verifyRefreshToken = <T extends Payload>(token: string) => {
  const config = useRuntimeConfig();

  const verifySync = createVerifier({
    key: config.refreshTokenSecret,
  });

  return verifySync(token) as T & { iat: number; exp: number };
};
