export default defineEventHandler((event) => {
  const cookies = parseCookies(event);

  if (cookies.accessToken) {
    console.log(cookies.accessToken);
  }
});
