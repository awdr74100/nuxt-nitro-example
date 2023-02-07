import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongodbUrl);

    console.log('● MongoDB connection established');
  } catch (error) {
    console.log(error);
  }
});
