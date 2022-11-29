const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const redisHandler = require("./handlers/redisHandler");
const Client = require("./models/Client");

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const pubClient = redisHandler.duplicate();
const subClient = redisHandler.duplicate();

io.on("connection", (socket) => new Client(socket, io));


Promise.all([pubClient.connect(), subClient.connect()])
    .then(() => {
        io.adapter(createAdapter(pubClient, subClient));
    });
