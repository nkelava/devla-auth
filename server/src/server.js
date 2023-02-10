const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const { DB_USERNAME, DB_PASSWORD, DB_IP, DB_PORT, DB_NAME } = require("./config/config");

const port = process.env.SERVER_PORT || 3000;
const mongoURL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_IP}:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to database..."))
  .catch((error) => console.log(error));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/users", userRouter);

app.get("/", (_req, resp) => {
  resp.send("<h1>Hello Universe!!!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
