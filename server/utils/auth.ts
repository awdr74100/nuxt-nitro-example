import type { H3Event } from 'h3';

interface JWTPayload {
  [propName: string]: unknown;
}

export const useAuth = <T extends JWTPayload>(event: H3Event) => {
  const accessToken = getCookie(event, 'accessToken');

  return verifyAccessToken<T>(accessToken || '');
};
