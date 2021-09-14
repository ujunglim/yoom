const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to server ✅");
});

// get message
socket.addEventListener("message", (message) => {
  console.log("Just got this message", message, "from server");
});

socket.addEventListener("close", () => {
  console.log("Disconneted from server ❌");
});

setTimeout(() => {
  socket.send("hello from the browser!")
}, 3000);