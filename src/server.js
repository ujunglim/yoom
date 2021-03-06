import express from "express";
import http from "http";
import WebSocket from 'ws';
import SocketIO from 'socket.io';

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
const httpServer = http.createServer(app);
// create socket io server
const wsServer = SocketIO(httpServer);

// get public rooms
const publicRooms = () => {
  const {sids, rooms} = wsServer.sockets.adapter;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  })
  return publicRooms;
}

wsServer.on("connection", socket => {
  socket["nickname"] = 'Anonymus';
  socket.onAny((event) => {
    console.log(wsServer.sockets.adapter);
    console.log(`socket event: ${event}`)
  })

  socket.on("enter_room", (nickName, roomName, done) => {
    socket.join(roomName);
    done();
    socket["nickname"] = nickName;
    socket.to(roomName).emit('welcome', socket.nickname);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
  })

  socket.on("new_message", (msg, roomName, done) => {
    socket.to(roomName).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  })
});

// // create WebSocket server
// const wss = new WebSocket.Server({ server });

// // fake db. who connected to server, put the connection to here
// const sockets = [];

// // when there's connection, send message by socket
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   // anonymous
//   socket["nickname"] = "Anonymous";
//   console.log("Connected to browser ???");
//   socket.on("close", () => console.log("Disconneted from server ???"));
//   // socket send message
//   socket.on("message", (message) => {
//     const msg = JSON.parse(message);
//     switch(msg.type) {
//       case "new_msg":
//         sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${msg.payload.toString()}`));
//         break;
//       case "nickname":
//         socket["nickname"] = msg.payload;
//         break;
//     }
    
//   });
// });

httpServer.listen(3000, handleListen);
