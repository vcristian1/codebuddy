import bot from './assets/bot.svg';
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector("#chat_container")

let loadInterval;

function loader(element) {
  element.textContent= "";

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)  
}

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
  })
}
