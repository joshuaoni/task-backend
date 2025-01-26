let io;

function init(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["PUT", "POST", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
}

module.exports = { init, getIO };
