const http = require("http");
require('dotenv').config();
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model.js");
const {loadLaunchData} = require('./models/launches.models.js')
  // set PORT=5000 && node server.js on package json
  const PORT = process.env.PORT || 8000;

const server = http.createServer(app); // create a server using the app and using native http module

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer(); // start the server
