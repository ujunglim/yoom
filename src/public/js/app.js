const socket = new WebSocket(`ws://${window.location.host}`);
const nicknameForm = document.querySelector('#nickname');
const messageForm = document.querySelector('#message');
const messageList = document.querySelector('ul');

socket.addEventListener("open", () => {
  console.log("Connected to server ✅");
});

// get message from server
socket.addEventListener("message", (message) => {
  // make new msg li
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("Disconneted from server ❌");
});

// send Message to server
const makeMessage = (type, payload) => {
  const msg = {type, payload}; // make obj
  return JSON.stringify(msg); // return str
}

// send message to server
messageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const input = messageForm.querySelector('input');
  // send msg from frontend to backend
  socket.send(makeMessage("new_msg", input.value));
  input.value = "";
});

nicknameForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
})