const io = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("taskCreated", (task) => {
  console.log("Task created:", task);
});

socket.on("taskUpdated", (task) => {
  console.log("Task updated:", task);
});

socket.on("taskDeleted", (task) => {
  console.log("Task deleted:", task);
});

socket.on("disconnect", () => {
  console.log("Socket.IO connection closed");
});
