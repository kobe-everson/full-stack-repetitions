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

app.post("/movies", (req, res) => {
  const newMovie = req.body;
  knex("favorites")
    .insert(
      {
        title: newMovie.title,
        main_character: newMovie.main_character,
        year_released: newMovie.year_released,
      },
      ["id", "title", "main_character", "year_released"],
    )
    .then((insertedMovie) => {
      res.status(201).json(insertedMovie[0]);
    })
    .catch((err) => {
      console.error("Error adding movie", err);
      res.status(500).json({ message: "Unable to add movie" });
    });
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await knex("favorites").del().where({ id });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie delete successful" });
  } catch (err) {
    console.error("Unable to delete movie", err);
    res.status(500).json({ message: "Failed to delete movie" });
  }
});

app.patch("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await knex("favorites")
      .update(updates, ["id", "title", "main_character", "year_released"])
      .where({ id });
    if (updated.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(updated[0]);
  } catch (err) {
    console.error("Error deleting movie", err);
    res.status(500).json({ message: "Failed to update movie" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
