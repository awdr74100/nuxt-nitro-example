import { createSigner, createVerifier } from 'fast-jwt';
import ms, { type StringValue } from 'ms';

type Type = 'accessToken' | 'refreshToken';

interface Payload {
  [key: string]: string | number | boolean;
}

export const signToken = (type: Type, payload: Payload, exp: StringValue) => {
  const config = useRuntimeConfig();

  const signSync = createSigner({
    key: config[`${type}Secret`],
    expiresIn: ms(exp),
  });

  return signSync(payload);
};

export const verifyToken = <T extends Payload>(type: Type, token: string) => {
  const config = useRuntimeConfig();

  const verifySync = createVerifier({
    key: config[`${type}Secret`],
  });

  return verifySync(token) as T & { iat: number; exp: number };
};
