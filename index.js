// import server
const server = require('./api/server');

// create heroku ready port
const port = process.env.PORT || 5000;

// setup listener
server.listen(port, () => console.log(`** server listening on ${port} **`))