const { createServer } = require("http");
const IOServer = require("./models/IOServer");

// creating socket io with http server
const httpServer = createServer();
const ioServer = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;

// After setting the adapter starting the io server with http
ioServer.setRedisAdapter()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log("Listening on port", PORT);
        });
    });