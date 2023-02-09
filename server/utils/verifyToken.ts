import { createVerifier } from 'fast-jwt';

export default <T extends object>(token: string): Promise<T> => {
  const config = useRuntimeConfig();

  const verify = createVerifier({ key: async () => config.tokenSecret });

  return verify(token);
};
