const http = require("http");
const mongoose = require('mongoose')
const app = require("./app");
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000; // set PORT=5000 && node server.js on package json

const MONGO_URL = 'mongodb+srv://nasa-api:smAggCdwfQ0iCTm9@nasacluster.doeii3q.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app); // create a server using the app and using native http module

mongoose.connection.once('open',()=>{
  console.log("MongoDB connection ready!")
});

mongoose.connection.on('error',(err)=>{
  console.error(err);
})


async function startServer() {
  await mongoose.connect(MONGO_URL)
    await loadPlanetsData();
    
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  }
  
startServer(); // start the server