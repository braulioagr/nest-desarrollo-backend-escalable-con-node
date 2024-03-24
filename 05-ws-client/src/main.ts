import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>

    <input placeholder="Json Web Token" id="jwt-input"/>
    <button id="connect-btn">Connect</button>
    <br>
    <span id="server-status"> offline</span>
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul">
    </ul>

  </div>
`

const jwtInput = document.querySelector<HTMLInputElement>('#jwt-input')!;
const connectBtn = document.querySelector<HTMLButtonElement>('#connect-btn')!;

connectBtn.addEventListener('click', () => {
  const jwt = jwtInput.value.trim();
  if (jwt.length <= 0) {
    return alert('JWT is required');
  }
  connectToServer(jwt);
});


// connectToServer();