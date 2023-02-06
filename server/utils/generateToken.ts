import jwt from 'jsonwebtoken';

export default (payload: string | object, expiresIn: string) => {
  const { accessTokenSecret } = useRuntimeConfig();

  return jwt.sign(payload, accessTokenSecret, { expiresIn });
};
