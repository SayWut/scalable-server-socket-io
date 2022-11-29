/**
 * Create an array of connected clients' ids
 * 
 * @param {*} io 
 * @returns array of connected clients' ids
 */
const getClientsIds = async (io) => {
    const sockets = await io.fetchSockets();
    const onlySockets = sockets.filter((socket) => socket.constructor.name === "Socket")
    const clientIds = onlySockets.map((socket) => {
        return socket.id;
    });

    return clientIds;
}

module.exports = {
    getClientsIds
}