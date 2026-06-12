import { calculateElement, FACT_BOMBS } from './saju-logic.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputSection = document.getElementById('input-section');
  const resultSection = document.getElementById('result-section');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resetBtn = document.getElementById('reset-btn');

  const birthDateInput = document.getElementById('birth-date');
  const userNameInput = document.getElementById('user-name');

  const resultElement = document.getElementById('result-element');
  const resultSummary = document.getElementById('result-summary');
  const resultPersonality = document.getElementById('result-personality');
  const resultLove = document.getElementById('result-love');
  const resultCareer = document.getElementById('result-career');
  const resultAdvice = document.getElementById('result-advice');

  analyzeBtn.addEventListener('click', () => {
    const birthDate = birthDateInput.value;
    const userName = userNameInput.value || '무명씨';

    if (!birthDate) {
      alert('생년월일은 넣어야 할 거 아니냐!');
      return;
    }

    // Logic Execution
    const element = calculateElement(birthDate);
    const data = FACT_BOMBS[element];

    // UI Update
    resultElement.textContent = `태어난 기운: ${element}`;
    resultSummary.textContent = `${userName}야, ${data.summary}`;
    resultPersonality.textContent = data.personality;
    resultLove.textContent = data.love;
    resultCareer.textContent = data.career;
    resultAdvice.textContent = data.advice;

    // Transition
    inputSection.style.display = 'none';
    resultSection.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    inputSection.style.display = 'block';
    resultSection.style.display = 'none';
    
    // Optional: Clear inputs
    birthDateInput.value = '';
    userNameInput.value = '';
  });
});
