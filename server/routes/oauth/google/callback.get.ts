import { z } from 'zod';
import { people } from '@googleapis/people';
import type { OAuthUserInfo } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const querySchema = z.object({ code: z.string().min(1) });

  try {
    const query = getQuery(event);

    const { code } = await querySchema.parseAsync(query);

    const oauth2Client = useGoogleOAuth2Client(event);

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const { data } = await people('v1').people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses,photos',
      auth: oauth2Client,
    });

    const userInfo: OAuthUserInfo = {
      id: data.resourceName?.split('/')[1]!,
      name: data.names![0].displayName!,
      picture: data.photos![0].url!,
    };

    console.log(userInfo);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
});
