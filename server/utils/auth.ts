import type { H3Event } from 'h3';

export const useAuth = <T>(event: H3Event) => {
  const accessToken = getCookie(event, 'accessToken');

  const payload = verifyAccessToken(accessToken || '');
};
U
