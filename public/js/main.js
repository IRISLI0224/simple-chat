const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const chatMessagesOther = document.querySelector('.messages-container-other');
const BotInfo = document.querySelector('.bot-message');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');



// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  //const user = getCurrentUser(socket.id);
  //console.log(user,"   ",message.username)
  //if (message.username==user){
    outputMessage(message);
  //}
  

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  //console.log(msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
if(message.username=="SimpleChat Bot"){
  // const div=document.createElement('div');
  // const p = document.createElement('p');
  // p.classList.add('bot');
  // p.innerText = message.text;
  // div.appendChild(p);

  // document.querySelector('.bot-message').appendChild(div);
  console.log("bot");
}else if (message.username==username){
  
  const divmain=document.createElement('div');
  divmain.classList.add('message-container');
  
  const avatar = document.createElement('img');
  avatar.classList.add('message-avatar');
  avatar.src="../img/defual-avatar.jpg";
  divmain.appendChild(avatar);

  
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  div.appendChild(p);


  const para = document.createElement('p');
  para.classList.add('message-text');
  para.innerText = message.text;
  div.appendChild(para);

  const time= document.createElement('div');
  time.classList.add('message-time');
  time.innerText = message.time;
  div.appendChild(time);
  
  divmain.appendChild(div);
  document.querySelector('.chat-messages').appendChild(divmain);
  
  }else{
    const divmain=document.createElement('div');
    divmain.classList.add('message-container-other');
    
    const avatar = document.createElement('img');
    avatar.classList.add('message-avatar-other');
    avatar.src="../img/defual-avatar.jpg";
    divmain.appendChild(avatar);
  
    
    const div = document.createElement('div');
    div.classList.add('message-other');
    const p = document.createElement('p');
    p.classList.add('meta-other');
    p.innerText = message.username;
    div.appendChild(p);
  
  
    const para = document.createElement('p');
    para.classList.add('message-text-other');
    para.innerText = message.text;
    div.appendChild(para);
  
    const time= document.createElement('div');
    time.classList.add('message-time-other');
    time.innerText = message.time;
    div.appendChild(time);
    
    divmain.appendChild(div);
    document.querySelector('.chat-messages').appendChild(divmain);
  }
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
