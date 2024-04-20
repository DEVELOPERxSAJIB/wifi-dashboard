const multer = require("multer");

// multer storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000000) + "-" + file.originalname
    );
  },
});

// multer for plan icon
const planIcon = multer({ storage }).single("planicon");
const customerPicture = multer({ storage }).single("customerPicture");

// multer for users
const fileUploader = multer({ storage }).fields([
  { name: "userAvatar", maxCount: 1 },
  { name: "userDocuments", maxCount: 5 },
]);

// module exports
module.exports = {
  planIcon,
  fileUploader,
  customerPicture,
};
