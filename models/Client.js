const util = require("../utils/util");
const ioUtil = require("../utils/ioUtil");

class Client {
    #io;
    #socket;

    constructor(io, socket) {
        this.#io = io;
        this.#socket = socket;
        attachEvent();
        setupClientToolsEvents();
    }

    attachEvent() {
        this.#socket.on("disconnect", () => {
            redisHandler.removeClientId(clientId);
        });

        this.#socket.on("spin", (data) => {
            const { message } = data;
            this.emitRandomClients(1, this.#socket.id, message);
        });

        this.#socket.on("wild", (data) => {
            const { message, numClients } = data;
            this.emitRandomClients(numClients, this.#socket.id, message);
        });

        this.#socket.on("blast", (data) => {
            const { message } = data;
            this.#socket.broadcast.emit("message", message);
        });
    }

    setupClientToolsEvents() {
        socket.emit("message", { hello: "world" });

        socket.on("socketio-client", function (data) {
            console.log("type: ", typeof data, " \ndata: ", data, "\n");
            socket.emit("socketio-client", data);
        });
        socket.on("socketio-client-ack", (data, fn) => {
            console.log("on socketio-client-ack: ", data);
            fn(data);
        });
    }

    async emitRandomClients(numClients, clientId, message) {
        const clientIds = ioUtil.getClientsIds(this.#io);
        const randomClientIds = util.getRandomArray(clientIds, numClients, clientId);
        
        console.log("sending messages to", randomClientIds, "from", clientId);
        io.to(randomClientIds).emit("message", message);
    };
}

module.exports = Client
