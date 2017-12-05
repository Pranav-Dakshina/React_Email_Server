let mongoose = require('mongoose');
let options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  keepAlive: 10000,
};

mongoose.connect('mongodb://localhost/thabpet', options)
  .then(
    () =>
    {
      console.log("Connected to MongoDB successfully!!");
      require('./seed.js');
    },
    err =>
    {
      console.log("Connection Error : ");
      console.log(err);
    }
  );
