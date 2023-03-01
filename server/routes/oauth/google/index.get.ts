export default defineEventHandler((event) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  const oauth2Client = useGoogleOAuth2Client(event);

  const url = oauth2Client.generateAuthUrl({ scope: scopes });

  return sendRedirect(event, url);
});
