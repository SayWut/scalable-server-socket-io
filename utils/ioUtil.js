/**
 * Create an array of connected clients' ids
 * 
 * @param {*} io 
 * @returns array of connected clients' ids
 */
const getClientsIds = async (io) => {
    const sockets = await io.fetchSockets();
    const clientIds = sockets.map((socket) => {
        return socket.id;
    });

    return clientIds;
}

module.exports = {
    getClientsIds
}