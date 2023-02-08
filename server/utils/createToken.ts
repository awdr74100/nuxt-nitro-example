import { createSigner } from 'fast-jwt';

export default (payload: object, expiresIn: number) => {
  const config = useRuntimeConfig();

  const sign = createSigner({ key: async () => config.tokenSecret, expiresIn });

  return sign(payload);
};
