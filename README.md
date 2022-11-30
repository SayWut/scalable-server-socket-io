# scalable-server-socket-io

This project is a SocketIO with server scalability using redis adapter
This project has support for [SocketIO client tool](https://github.com/amritb/socketio-client-tool)

## Events

| event | json data                                                                       | description                                            |
|-------|---------------------------------------------------------------------------------|--------------------------------------------------------|
| spin  | "message" - message's text to send                                                | sends a message to a random connected client           |
| wild  | "message" - message's text to send<br>"numClients" - number of random client to send | sends a message to a multiple random connected clients |
| blast | "message" - message's text to send                                                | sends a message to all connected clients               |

## Requirements
Redis version - 6.2.6

Node version - 14.17.3