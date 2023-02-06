// import { verify } from 'jsonwebtoken';

// export default defineEventHandler(async (e) => {
//   const token = e.node.req.headers.authorization?.split(' ')[1];
// });

// // export default defineEventHandler(async (e) => {
// //   const token = e.node.req.headers.authorization?.split(' ')[1];

// //   if (token) {
// //     try {
// //       const decoded = verify(token, 'a');
// //       e.context.user = decoded;
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// // });

export default defineEventHandler((e) => {});
