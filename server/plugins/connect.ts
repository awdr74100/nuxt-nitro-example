import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/nuxtDB');

    console.log('● MongoDB connected');
  } catch (error) {
    console.log(error);
  }
});
