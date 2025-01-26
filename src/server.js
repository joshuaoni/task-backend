const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();
const http = require("http");
const { init } = require("./config/socket");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);
init(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
