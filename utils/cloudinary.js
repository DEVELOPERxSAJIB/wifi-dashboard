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
  await cloudinary.v2.uploader.destroy(publicId);
};

// avatar upload
const cloudUploadAvatar = async (avaterInfo) => {
  const results = await cloudinary.uploader.upload(avaterInfo.path);
  return results;
};

// documnets upload
const cloudUploadDocumnets = async (docArray) => {
  const results = await Promise.all(
    docArray?.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type : "auto",
        allowed_formats: ["pdf", "doc", "docx", "png", "jpg", "jpeg"],
        format: file.originalname.split('.').pop(),
      });
      return result;
    })
  );

  return results;
};

// export const cloudUploads = async (path) => {
//   // upload brand logo
//   const data = await cloudinary.v2.uploader.upload(path);
//   return data.secure_url;
// };

// module exports
module.exports = {
  planIconUpload,
  planIconDelete,
  cloudUploadAvatar,
  cloudUploadDocumnets,
};
