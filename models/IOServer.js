const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const redisHandler = require("../handlers/redisHandler");
const IOClient = require("./IOClient");

class IOServer {
    io;

    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*",
            },
        });

        this._attachEvents();
    }

    
    /**
     * Settings redis adapter to io server
     */
    async setRedisAdapter() {
        const pubClient = redisHandler.duplicate();
        const subClient = redisHandler.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.io.adapter(createAdapter(pubClient, subClient));
    }

    /**
     * Setting up events
     */
    _attachEvents() {
        this.io.on("connection", (socket) => {
            console.log("New connection", socket.id);
            const client = new IOClient(this.io, socket);
        });
    }
}

module.exports = IOServer;