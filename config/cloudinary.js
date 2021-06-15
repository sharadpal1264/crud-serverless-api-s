const cloudinary = require('cloudinary').v2;

const connectCloudinary = async () => {
    try {
      await cloudinary.config({
            cloud_name:'socialadda',
            api_key:'847675548688454',
            api_secret:'ZF0doSpYwCTZ4oENFbGrQDp4ToU'
            });
      console.log('Cloudinary Connected !!');
    } catch (err) {
      console.log('Cloudinary not Connected ??');
      console.error(err.message);
      process.exit(1);
    }
  };
  
  connectCloudinary();