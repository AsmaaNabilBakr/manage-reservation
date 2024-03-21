const data = require("../../data.json");
const express = require("express");

const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());
app.get("/reservations", (_, res) => {
  console.log(res);
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
