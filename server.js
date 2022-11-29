const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createServer } = require("http");
const redisHandler = require("./handlers/redisHandler");
const clientHandler = require("./handlers/clientHandler");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
redisHandler.init();

const pubClient = redisHandler.duplicate();
const subClient = redisHandler.duplicate();

clientHandler.init(io);
io.on("connection", (socket) => clientHandler.connectionHandler(socket, io));

const PORT = process.env.PORT || 8080;
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  httpServer.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });
});
