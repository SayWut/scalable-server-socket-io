const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createServer } = require("http");
const redisHandler = require("./handlers/redisHandler");
const Client = require("./models/Client");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const pubClient = redisHandler.duplicate();
const subClient = redisHandler.duplicate();

clientHandler.init(io);
io.on("connection", (socket) => new Client(socket, io));

const PORT = process.env.PORT || 8080;

Promise.all([pubClient.connect(), subClient.connect()])
    .then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        httpServer.listen(PORT, () => {
            console.log("Listening on port", PORT);
        });
    });
