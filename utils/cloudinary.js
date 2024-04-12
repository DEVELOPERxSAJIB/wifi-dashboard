const cloudinary = require("cloudinary");

// config cloudinary
cloudinary.config({
  cloud_name: "djdkjrlp8",
  api_key: "767212511153515",
  api_secret: "UouvfbLHI_yNUTaf_mroowujq9c",
});

// Upload Plan Icon
const planIconUpload = async (iconInfo) => {
  const result = await cloudinary.v2.uploader.upload(iconInfo.path);
  return result;
};

// Delete plan icon
const planIconDelete = async (publicId) => {
  console.log(publicId);
  await cloudinary.v2.uploader.destroy(publicId);
};

// Profile picture upload
// const cloudUploadAvatar = async (avaterInfo) => {
//   const results = await cloudinary.uploader.upload(avaterInfo.path, {
//     folder: "avatars",
//   });
//   return results;
// };

// export const cloudUploads = async (path) => {
//   // upload brand logo
//   const data = await cloudinary.v2.uploader.upload(path);
//   return data.secure_url;
// };




// module exports
module.exports = {
  planIconUpload,
  planIconDelete
}