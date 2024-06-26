const mongoose = require("mongoose");

const mongoBDConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log(`mongodb connect successful`.bgMagenta.black);
    }
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};

module.exports = mongoBDConnect;
