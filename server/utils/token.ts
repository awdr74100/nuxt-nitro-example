import { createSigner, createVerifier } from 'fast-jwt';
import ms, { type StringValue } from 'ms';

type Type = 'accessToken' | 'refreshToken';

interface Payload {
  [key: string]: string | number | boolean;
}

export const signToken = (type: Type, payload: Payload, exp: StringValue) => {
  const config = useRuntimeConfig();

  const key = config[`${type}Secret`];
  const expiresIn = ms(exp);

  return createSigner({ key, expiresIn })(payload);
};

export const verifyToken = <T extends Payload>(type: Type, token: string) => {
  const config = useRuntimeConfig();

  const key = config[`${type}Secret`];

  return createVerifier({ key })(token) as T & { iat: number; exp: number };
};
