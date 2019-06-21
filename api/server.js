// setup server
const express = require('express');
const server = express();
server.use(express.json()); // parser

// set default
server.get('/', (req, res) => {
    res.status(200).json({ api: 'hello world' })
});

// export server
module.exports = server;