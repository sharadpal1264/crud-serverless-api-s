require('dotenv').config();
const mongoose= require('mongoose');
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
const mongodbUri = 'mongodb+srv://sharad:Vermasaloni@12644@myfirstcluster.q3xza.mongodb.net/node-google-0auth2-jwt?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();