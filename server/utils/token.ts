import { createSigner, createVerifier } from 'fast-jwt';
import ms, { type StringValue } from 'ms';

type TokenType = 'accessToken' | 'refreshToken';

interface TokenPayload {
  [key: string]: string | number | boolean;
}

export const signToken = (
  type: TokenType,
  payload: TokenPayload,
  expiresIn: StringValue,
) => {
  const config = useRuntimeConfig();

  const signSync = createSigner({
    key: config[`${type}Secret`],
    expiresIn: ms(expiresIn),
  });

  return signSync(payload);
};

export const verifyToken = <T extends TokenPayload>(
  type: TokenType,
  token: string,
) => {
  const config = useRuntimeConfig();

  const verifySync = createVerifier({
    key: config[`${type}Secret`],
  });

  return verifySync(token) as T & { iat: number; exp: number };
};
