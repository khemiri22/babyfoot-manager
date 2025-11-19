import { socket } from "./socket.js";

// Username will be used to identify the user in the chat
let username;

// Elements for new tchat user input
const newTchatInput = document.getElementById("new-tchat-input");
const newTchatBtn = document.getElementById("new-tchat-button");
const newMessageInput = document.getElementById("new-message-input");
const newMessageButton = document.getElementById("new-message-button");
const usernameDisplay = document.getElementById("username-display");

newMessageInput.disabled = true;
newMessageButton.disabled = true;

// Handle new tchat user
newTchatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  username = newTchatInput.value.trim();
  if (!username) return;
  usernameDisplay.textContent = username;
  newTchatInput.disabled = true;
  newTchatBtn.disabled = true;
  document.querySelector(".tchat-header button").style.pointerEvents = "none";
  newMessageInput.disabled = false;
  newMessageButton.disabled = false;
});

// Handle comming messages
const tchatMessagesList = document.querySelector(".tchat-list");

socket.on("newMessage", (message) => {
    
    const div = document.createElement("div");

    div.className =  (message.username === username ? "tchat-item right" : "tchat-item left");
    div.innerHTML = `<div class="tchat-item-name">${message.username}</div>
                     <div class="tchat-item-content">${message.content}</div>`;

    tchatMessagesList.appendChild(div);

    tchatMessagesList.scrollTop = tchatMessagesList.scrollHeight;
})

// Handle sending messages

newMessageButton.addEventListener("click", (e) => {
    e.preventDefault();
    const content = newMessageInput.value.trim();
    if (!content) return;
    let message = {
        username: username,
        content: content
    }
    socket.emit("broadcastMessage", message);
    newMessageInput.value = "";
    
})



