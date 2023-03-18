import bot from './assets/bot.svg';
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector("#chat_container")

let loadInterval;

// Function that renders a loader while the AI responds
function loader(element) {
  element.textContent= "";

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)  
}

// Function that types out the AI's text response
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      // Gets the character, under the specific index, in the text the AI is going to return.
      element.innerHTML += text.chartAt(index);
      index++
    } else {
      // If the text the AI returned has been fuly typed, clear the interval
      clearInterval(interval)
    }
  }, 20)
}

// Function to generate unique ID for every message in order to map over them.
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id=${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (
      `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // User's Chat Stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // Bot's Chat Stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  
  // Puts the new message in view right away.
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
// Another Event Listener for when you click enter to submit your question to Code Buddy.
form.addEventListener('keyup', (e) => {
 if (e.keyCode === 13) {
  handleSubmit(e);
 }
})