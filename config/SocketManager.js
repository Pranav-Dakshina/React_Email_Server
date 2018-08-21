const io = require('../app.js').io

module.exports = (socket) => {
  console.log("Socket Id: ", socket.id);
}
