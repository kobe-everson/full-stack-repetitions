const express = require("express");
const cors = require("cors");
const config = require("./knexfile.js");
const knex = require("knex")(config.development);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(`API up and running`);
});

app.get("/movies", (req, res) => {
  knex("favorites")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message: `Unable to get data`,
      }),
    );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
