const express = require("express");
const mongoose = require("mongoose");

// Define the Film model
const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.get("/", async (req, res) => {
  const fimls = await Film.find();
  res.send(fimls);
});

app.delete("/:id", async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  return res.send(film);
});

app.put("/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  },{
    new: true
});
  return res.send(film);
});

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });

  await film.save();
  return res.send(film);
});

app.listen(port, () => {
  // Connect to MongoDB
  mongoose.connect(
    "mongodb+srv://urtadomanojo:Douglas2024@cluster0.nw2agcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("App running on port " + port);
});
