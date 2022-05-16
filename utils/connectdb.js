const mongoose = require("mongoose");
const uri = process.env.MONGO_DB_CONNECTION_STRING;
const connect = mongoose
.connect(process.env.MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
connect
  .then((db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
