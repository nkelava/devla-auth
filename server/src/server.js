const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
