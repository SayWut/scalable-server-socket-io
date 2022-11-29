const redisHandler = require("./redisHandler");

let io;
const init = (server) => {
  io = server;
};

const connectionHandler = (socket) => {
  console.log("new client connected", socket.id);

  const clientId = socket.id;
  redisHandler.addClientId(clientId);

  socket.on("disconnect", () => {
    redisHandler.removeClientId(clientId);
  });

  socket.on("spin", (data) => {
    const { message } = data;
    emitRandomClients(1, socket.id, message);
  });

  socket.on("wild", (data) => {
    const { message, numClients } = data;
    emitRandomClients(numClients, socket.id, message);
  });

  socket.on("blast", (data) => {
    const { message } = data;
    socket.broadcast.emit("message", message);
  });

  socket.emit("message", { hello: "world" });

  socket.on("socketio-client", function (data) {
    console.log("type: ", typeof data, " \ndata: ", data, "\n");
    socket.emit("socketio-client", data);
  });
  socket.on("socketio-client-ack", (data, fn) => {
    console.log("on socketio-client-ack: ", data);
    fn(data);
  });
};

const emitRandomClients = async (numClients, clientId, message) => {
  const clientIds = await getRandomClients(numClients, clientId);
  console.log("sending messages to", clientIds, "from", clientId);
  clientIds.forEach((clientId) => {
    io.to(clientId).emit("message", message);
  });
};

const getRandomClients = async (numClients, currentClientId) => {
  const sockets = await io.fetchSockets();
  const clientIds = sockets.map((socket) => {
    console.log(socket.constructor.name, socket.id);
    return socket.id;
  });

  const filteredClientIds = clientIds.filter(
    (clientId) => currentClientId != clientId
  );

  if (numClients >= filteredClientIds.length) {
    return filteredClientIds;
  }

  const selectedIds = {};

  while (Object.keys(selectedIds).length < numClients) {
    const index = Math.floor(Math.random() * filteredClientIds.length);
    const id = filteredClientIds[index];
    selectedIds[index] = id;
  }

  return Object.values(selectedIds);
};

module.exports = {
  init,
  connectionHandler,
};
