import { PrismaClient } from '@prisma/client';
import got from 'got';
import { auth } from '@googleapis/oauth2';
import getURL from 'requrl';
import type { MultiPartData, H3Event } from 'h3';

let _prisma: PrismaClient;

export const usePrismaClient = () => {
  if (!_prisma) {
    _prisma = new PrismaClient();
  }

  return _prisma;
};

let _imgurAccessToken: string;

export const useImgurClient = () => {
  const config = useRuntimeConfig();

  const getAccessToken = () => {
    return got
      .post('https://api.imgur.com/oauth2/token', {
        json: {
          client_id: config.IMGUR_CLIENT_ID,
          client_secret: config.IMGUR_CLIENT_SECRET,
          refresh_token: config.IMGUR_REFRESH_TOKEN,
          grant_type: 'refresh_token',
        },
        retry: {
          limit: 0,
        },
      })
      .json<{ access_token: string }>()
      .then(({ access_token }) => access_token);
  };

  return {
    async upload(files: MultiPartData[]) {
      if (!_imgurAccessToken) {
        _imgurAccessToken = await getAccessToken();
      }

      return Promise.all(
        files.map(({ data: buffer }) => {
          return got
            .post('https://api.imgur.com/3/image', {
              headers: {
                Authorization: `Bearer ${_imgurAccessToken}`,
              },
              json: {
                image: buffer.toString('base64'),
              },
              retry: {
                limit: 1,
                methods: ['POST'],
                statusCodes: [403],
              },
              hooks: {
                beforeRetry: [
                  async (error) => {
                    if (error.response?.statusCode === 403) {
                      _imgurAccessToken = await getAccessToken();
                    }
                  },
                ],
              },
            })
            .json<{ data: { link: string } }>()
            .then(({ data }) => data.link);
        }),
      );
    },
  };
};

export const useGoogleOAuth2Client = (event: H3Event) => {
  const config = useRuntimeConfig();

  return new auth.OAuth2(
    config.GCP_OAUTH_CLIENT_ID,
    config.GCP_OAUTH_CLIENT_SECRET,
    `${getURL(event.node.req)}/oauth/google/callback`,
  );
};
