const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "CRUD-Login-Logout",
    })
    .then((conn) =>
      console.log(`Database Connected with ${conn.connection.host}`)
    )
    .catch((err) => console.log(err));
};

module.exports = { connectDB };
