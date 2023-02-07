import { createSigner } from 'fast-jwt';
import ms from 'ms';

export default (payload: object, expiresIn: string) => {
  const config = useRuntimeConfig();

  const signWithPromise = createSigner({
    key: async () => config.tokenSecret,
    expiresIn: ms(expiresIn),
  });

  return signWithPromise(payload);
};
