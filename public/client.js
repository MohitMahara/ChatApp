const socket = io();
let Name;
let textarea = document.getElementById("textarea");
let messageArea = document.querySelector(".msg-area");
let audio = new Audio('/notification.mp3');


do {
    Name = prompt('Please enter your name: ');

} while (!Name)

textarea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }

})

// send message through button 

function sendThroughBtn() {
    let message = textarea.value;
    sendMessage(message);
}

function sendMessage(mssg) {
    let msg = {
        user: Name,
        message: mssg.trim()
    }
    //  Append
    appendMessage(msg, 'outgoing');
    scrollToBottom();
    textarea.value = "";

    //  send to server
    socket.emit('message', msg);
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'msg');

    let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>`;

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);

}


// recieve messages

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
    audio.play();
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

