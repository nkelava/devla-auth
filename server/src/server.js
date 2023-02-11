const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userRouter } = require("./user");
const { authRouter } = require("./auth");
const { DB_USERNAME, DB_PASSWORD, DB_IP, DB_PORT, DB_NAME } = require("./db/db.config");

const mongoURL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_IP}:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the database..."))
  .catch((err) => console.error(err));

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
