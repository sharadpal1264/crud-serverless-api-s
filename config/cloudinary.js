const cloudinary = require('cloudinary').v2;

const connectCloudinary = async () => {
    try {
      await cloudinary.config({
            cloud_name:'socialadda',
            api_key:process.env.CLOUDNIARY_API_KEY,
            api_secret:process.env.CLOUDNIARY_SECRET_KEY
            });
      console.log('Cloudinary Connected !!');
    } catch (err) {
      console.log('Cloudinary not Connected ??');
      console.error(err.message);
      process.exit(1);
    }
  };
  
  connectCloudinary();