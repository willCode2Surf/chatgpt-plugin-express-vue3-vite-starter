import express from "express";
import bodyParser from "body-parser";
import routes from "./express-routes/index.js";
import http from "http";
import { ConfigurationData } from "./config/index.js";
import { WebSocketServer } from "ws";

const app = express();
const wsServer = new WebSocketServer({
  noServer: true,
});

const main = async () => {
  wsServer.on("connection", (socket) => {
    socket.on("message", (message) => {
      console.log("SERVER RECEIVED: socket.on(message)", JSON.parse(message));
      // echo the user
      socket.send(JSON.stringify({ message: "hello client" }));
    });
  });

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use("/", express.static("dist"));
  app.use("/routes", routes);

  var server = http.createServer(app);
  server.listen(ConfigurationData.server.port);
  server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request);
    });
  });

  console.info(`Server started on port ${ConfigurationData.server.port}`);
  console.info(`http://127.0.0.1:${ConfigurationData.server.port}`);
};

main().catch(console.error);

process.on("uncaughtException", function (err) {
  console.info("(¯`·._.·(¯`·._.· MASSIVE ERROR ·._.·´¯)·._.·´¯)");
  console.log("exception: " + err);
  console.info("(¯`·._.·(¯`·._.· MASSIVE ERROR ·._.·´¯)·._.·´¯)");
});
