import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer =(jwt: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: jwt
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');
  addListeners();
}

const addListeners = () => {
  const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  const serverStatusLabel = document.getElementById('server-status')!;

  socket.on('clients-updated', (clients: string[]) => {
    let clientsList = '';
    clients.forEach(client => {
      clientsList += `<li>${client}</li>`;
    });
    clientsUl.innerHTML = clientsList;
  });

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected';
  });

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnected';
  });

  socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
    const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>
    `;
    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);
  });

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) {
      return;
    }
    socket.emit('message-from-client', {
      id: '123',
      message: messageInput.value
    });

    messageInput.value = '';
  });

}