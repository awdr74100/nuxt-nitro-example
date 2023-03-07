import { z } from 'zod';
import { stringify } from 'node:querystring';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    email: z.string().email(),
    title: z.string().min(3),
    amount: z.number().gt(0),
  });

  try {
    const body = await readBody(event);
    const { email, title, amount } = await bodySchema.parseAsync(body);

    const config = useRuntimeConfig();

    // const redirectURL =
    //   'https://ccore.newebpay.com/MPG/mpg_gateway?' +
    //   stringify({
    //     MerchantID: config.NEWEBPAY_MERCHANT_ID,
    //     TradeInfo: '',
    //     TradeSha: '',
    //     Version: '2.0',
    //   });

    // return sendRedirect(event, redirectURL);

    // return { success: true, email, title, amount };
    return { success: true };
  } catch (error) {
    return { success: false };
  }
});
