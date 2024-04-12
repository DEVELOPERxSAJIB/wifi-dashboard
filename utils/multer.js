const multer = require("multer");

// multer storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000000) + "-" + file.fieldname
    );
  },
});

// multer for plan icon
const planIcon = multer({ storage }).single("planicon");

// module exports
module.exports = {
  planIcon
}