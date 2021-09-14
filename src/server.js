import express from "express";
import http from "http";
import WebSocket from 'ws';

const app = express();

// set view engine by pug
app.set("view engine", "pug");
// tell express where are templates
app.set("views", __dirname + "/views");

// do static
// create public url to share some files to users
// when user goes to /public, show __dirname + "/public" folder
app.use("/public", express.static(__dirname + "/public"));

// render a view
// create route hanlder which renders home.pug
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

// create http server
const server = http.createServer(app);

// create WebSocket server
const wss = new WebSocket.Server({ server });

// when there's connection, send message by socket
wss.on("connection", (socket) => {
  console.log("Connected to browser ✅");
  socket.on("close", () => console.log("Disconneted from server ❌"));
  socket.on("message", (message) => console.log(message.toString()));
  socket.send('Hiiiii');
});

server.listen(3000, handleListen);
