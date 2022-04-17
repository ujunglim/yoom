const socket = io();

const welcomeDiv = document.getElementById("welcome");
const form = welcomeDiv.querySelector("form");

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  // enter_room이라는 event를 emit해줌
  // (이벤트이름, payload, 서버에서 호출하는 함수)
  socket.emit("enter_room", {payload: input.value}, () => {
    console.log("server is done!");
  });
  // 1. 어떤 event든 맘대로 만들어서 emit전송 할 수 있음
  // 2. object를 전송할 수 있음(전엔 string만 전송가능)
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);