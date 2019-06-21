// setup server
const express = require('express');
const server = express();
server.use(express.json()); // parser
const games = require('../data/gamesModel');

server.get("/", (req, res) => {
  res.status(200).json({ api: "hello world" });
});

server.post("/games", (req, res) => {
  const { title, genre } = req.body;
  if (title && genre) {
    games
      .insert(req.body)
      .then(game => res.status(201).json(game))
      .catch(err => res.status(500).json(err));
  } else {
    res.status(422).json({ message: "Title and Genre required" });
  }
});

server.get("/games", (req, res) => {
  games
    .get()
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err));
});

// export server
module.exports = server;