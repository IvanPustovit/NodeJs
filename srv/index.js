const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const router = require("../router/index");

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());
app.use(morgan());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).send({ message: "NOT FOUND" });
});

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("Server started port", PORT),
);
