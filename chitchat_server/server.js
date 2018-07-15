// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// User online count
const activeUsers = {
  type: "activeUsers",
  count: 0
};

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === SocketServer.OPEN) {
    client.send(JSON.stringify(data));
    // }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  activeUsers.count++;
  wss.broadcast(activeUsers);

  ws.on("message", function incoming(data) {
    const parsedData = JSON.parse(data);
    switch (parsedData.type) {
      case "postMessage":
        // handle post message
        parsedData.type = "incomingMessage";
        parsedData.id = uuidv1();
        break;
      case "postNotification":
        // handle post notification
        parsedData.type = "incomingNotification";
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + parsedData.type);
    }
    wss.broadcast(parsedData);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    activeUsers.count--;
    wss.broadcast(activeUsers);
  });
});
