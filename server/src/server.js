const express = require("express");
const mongoose = require("mongoose");
const { DB_USERNAME, DB_PASSWORD, DB_IP, DB_PORT, DB_NAME } = require("./config/config");

const mongoURL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_IP}:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected to database..."))
  .catch((error) => console.log(error));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_req, resp) => {
  resp.send("<h1>Hello Universe!!!</h1>");
});

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
