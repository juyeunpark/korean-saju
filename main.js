import { analyzeSaju, CONVERSATIONS } from './saju-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputView = document.getElementById('input-view');
  const chatHistory = document.getElementById('chat-history');
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const controls = document.getElementById('controls');
  const typing = document.getElementById('typing');

  const birthDateInput = document.getElementById('birth-date');
  const birthTimeInput = document.getElementById('birth-time');
  const userNameInput = document.getElementById('user-name');

  let currentMessages = [];
  let currentIndex = 0;

  startBtn.addEventListener('click', () => {
    const date = birthDateInput.value;
    const name = userNameInput.value || '무명씨';

    if (!date) {
      alert('생년월일은 넣어야지!');
      return;
    }

    const result = analyzeSaju(date, birthTimeInput.value);
    currentMessages = CONVERSATIONS[result.dominant];
    currentIndex = 0;

    inputView.style.display = 'none';
    controls.style.display = 'flex';
    
    addMessage('user', `${name}, ${date} 생이다.`);
    processNextMessage();
  });

  nextBtn.addEventListener('click', () => {
    processNextMessage();
  });

  restartBtn.addEventListener('click', () => {
    location.reload();
  });

  async function processNextMessage() {
    if (currentIndex >= currentMessages.length) {
      nextBtn.style.display = 'none';
      addMessage('ai', "자, 내 할 말은 다 했다. 가서 밥이나 잘 챙겨 먹어라.");
      return;
    }

    nextBtn.disabled = true;
    typing.style.display = 'block';
    
    // Smooth scrolling to bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    
    typing.style.display = 'none';
    addMessage('ai', currentMessages[currentIndex]);
    currentIndex++;
    nextBtn.disabled = false;

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatHistory.appendChild(msg);
  }
});
