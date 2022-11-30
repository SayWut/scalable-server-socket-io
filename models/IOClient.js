const ClientEvents = require("./ClientEvents");
const util = require("../utils/util");
const ioUtil = require("../utils/ioUtil");

class IOClient {
    #io;
    socket;

    constructor(io, socket) {
        this.#io = io;
        this.socket = socket;
        this._attachEvents();
        this._setupClientToolsEvents();
    }

    /**
     * Setting up events
     */
    _attachEvents() {
        this.socket.on(ClientEvents.SPIN, (data) => {
            const { message } = data;
            this._emitRandomClients(1, message);
        });

        this.socket.on(ClientEvents.WILD, (data) => {
            const { message, numClients } = data;
            this._emitRandomClients(numClients, message);
        });

        this.socket.on(ClientEvents.BLAST, (data) => {
            const { message } = data;
            console.log("blast message");
            this.socket.broadcast.emit(ClientEvents.MESSAGE, message);
        });
    }

    /**
     * Setup events and emits for socket-io-client-tool
     */
    _setupClientToolsEvents() {
        this.socket.emit(ClientEvents.MESSAGE, { hello: "world" });

        this.socket.on(ClientEvents.SOCKETIO_CLIENT, (data) => {
            console.log("type: ", typeof data, " \ndata: ", data, "\n", this.socket.id);
            this.socket.emit(ClientEvents.SOCKETIO_CLIENT, data);
        });
        this.socket.on(ClientEvents.SOCKETIO_CLIENT_ACK, (data, fn) => {
            console.log("on socketio-client-ack: ", data, this.socket.id);
            fn(data);
        });
    }

    /**
     * Sends a message to number of random clients based on `numClients`
     * 
     * @param {number} numClients - number of random clients
     * @param {string} clientId - exclude this client id from random clients 
     * @param {string} message - message to send
     */
    async _emitRandomClients(numClients, message) {
        const clientIds = await ioUtil.getClientsIds(this.#io);
        const randomClientIds = await util.getRandomArray(clientIds, numClients, this.socket.id);
        
        console.log("sending messages to", randomClientIds, "from", this.socket.id);
        this.#io.to(randomClientIds).emit(ClientEvents.MESSAGE, message);
    };
}

module.exports = IOClient
