const socket = io('http://localhost:3000') // връзка със сървър
const messageContainer = document.getElementById('message-container') 
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messegePass = document.getElementById('password-input')

function CheckPassword(messegePass) 
{ 
var passw=  /^[A-Za-z]\w{7,14}$/;
if(messegePass.value.match(passw)) 
{ 
alert('Correct')
return true;
}
else
{ 
alert('Wrong...!')
return false;
}
}

if (messageForm != null) {
  const name = prompt('What is your name?')
  const password = prompt('What is your password') 
 if(CheckPassword(password))
 { appendMessage('You joined')
  socket.emit('new-user', roomName, name)//казва на сървара че има нов потребител
  } //казва на сървара че има нов потребител
  else
  {
    appendMessage('Wrong password')
  }
  

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = '' // изкарва съобщението
  })
 
}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room // разбирам коя е стаята
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}` // добавям id на стаята
  roomLink.innerText = 'join' 
  roomContainer.append(roomElement) //добавя елементи 
  roomContainer.append(roomLink) // добаня линк
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`) // разпраща съобщението в сървара
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`) 
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement) //ъпдейтва дома
}