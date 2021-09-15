const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

socket.addEventListener("open", () => {
  console.log("Connected to server ✅");
});

// get message
socket.addEventListener("message", (message) => {
  console.log(message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconneted from server ❌");
});

messageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const input = messageForm.querySelector('input');
  // send input from frontend to backend
  socket.send(input.value);
  // empty input
  input.value = "";
});