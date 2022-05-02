# Zoom Clone

using NodeJS, WebRTC and WebSockets

```
npm i nodemon -D
npm i @babel/core @babel/cli @babel/node -D
npm i @babel/preset-env -D
npm i express
npm i pug
npm i ws
npm i socket.io
```

```
npm run dev
```

app.js = frontend
server.js = backend

socket.onAny()
socket.id()
socket.rooms
socket.join()
socket.to() send message to room
socket.on() = addEventListener

disconneting !== disconnect

Adapter: synchronize realtime application among different servers
서로다른 서버간의 동기화, 모든 유저가 동일한 서버에 연결되는건 아니기떄문
어답터는 누가 연결됬는지, 현재 엡에 룸이 얼마나 있는지 알려줄거

const {sids, rooms} = sockets.adapter;
