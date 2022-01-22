
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');

exports.uploadToCloudinary = (image, folder) => {
  return new Promise(function (resolve, reject) {
    cloudinary.v2.uploader.upload(
      image,
      { public_id: `${Date.now()}-${uuidv4()}`, folder: folder },
      async function (error, result) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};

exports.destroyCloudinary = (public_id) => {
  return new Promise(function (resolve, reject) {
    cloudinary.v2.uploader.destroy(public_id, function (error, result) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
