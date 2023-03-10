const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { jwtRouter } = require("./jwt");
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

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/jwt", jwtRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
