import { createSigner, createVerifier } from 'fast-jwt';
import ms, { type StringValue } from 'ms';

type Kind = 'accessToken' | 'refreshToken';

interface Data {
  [key: string]: string | number | boolean;
}

export const signToken = (kind: Kind, data: Data, expiresIn: StringValue) => {
  const config = useRuntimeConfig();

  const signSync = createSigner({
    key: config[`${kind}Secret`],
    expiresIn: ms(expiresIn),
  });

  return signSync(data);
};

export const verifyToken = <T extends Data>(kind: Kind, token: string) => {
  const config = useRuntimeConfig();

  const verifySync = createVerifier({
    key: config[`${kind}Secret`],
  });

  return verifySync(token) as T & { iat: number; exp: number };
};
