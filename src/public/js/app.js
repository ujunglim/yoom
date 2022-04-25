const socket = io();

const welcomeDiv = document.getElementById("welcome");
const form = welcomeDiv.querySelector("form");
const roomDiv = document.getElementById("room");
let roomName;

roomDiv.hidden = true;

const showRoom = () => {
  welcomeDiv.hidden = true;
  roomDiv.hidden = false;
  const h3 = roomDiv.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  // enter_room이라는 event를 emit해줌
  // (이벤트이름, payload, 서버에서 호출하는 함수)
  socket.emit("enter_room", {payload: input.value}, showRoom);
  // 1. 어떤 event든 맘대로 만들어서 emit전송 할 수 있음
  // 2. object를 전송할 수 있음(전엔 string만 전송가능)
  roomName = input.value;
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);