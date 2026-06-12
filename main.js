import { analyzeSaju, CONVERSATIONS, ELEMENTS } from './saju-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputView = document.getElementById('input-view');
  const viralReport = document.getElementById('viral-report');
  const analyzeBtn = document.getElementById('analyze-btn');
  const shareBtn = document.getElementById('share-btn');

  const birthDateInput = document.getElementById('birth-date');
  const birthTimeInput = document.getElementById('birth-time');
  const userNameInput = document.getElementById('user-name');

  // Intersection Observer for Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  analyzeBtn.addEventListener('click', () => {
    const date = birthDateInput.value;
    const name = userNameInput.value || '무명씨';

    if (!date) {
      alert('생년월일은 넣어야 할 거 아니냐!');
      return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = '할머니가 돋보기 쓰는 중...';

    setTimeout(() => {
      const result = analyzeSaju(date, birthTimeInput.value);
      renderViralReport(result, name);

      inputView.style.display = 'none';
      viralReport.style.display = 'block';
      
      // Initialize Observer on newly shown items
      document.querySelectorAll('.insight-item').forEach(item => observer.observe(item));
      
      window.scrollTo(0, 0);
    }, 1200);
  });

  function renderViralReport(result, name) {
    const { dominant } = result;
    const msgs = CONVERSATIONS[dominant];

    // 1. Hook (Emotional Opening)
    const hooks = {
      [ELEMENTS.WOOD]: "너는 성실한 게 아니라 그냥 미련하게 버티고 있는 거다.",
      [ELEMENTS.FIRE]: "화려해 보이고 싶어서 안달복달하는 네 모습이 안쓰럽구나.",
      [ELEMENTS.EARTH]: "신중한 척하지 마라. 너는 지금 그냥 결정하기 무서운 거다.",
      [ELEMENTS.METAL]: "완벽주의? 웃기지 마라. 너는 남들에게 비난받기 싫은 겁쟁이다.",
      [ELEMENTS.WATER]: "지혜로운 척 굴지 마라. 너는 그냥 현실을 회피하고 있을 뿐이야."
    };
    document.getElementById('res-hook').textContent = `"${name}야, ${hooks[dominant]}"`;

    // 2. One-line Insights
    document.getElementById('res-summary').textContent = msgs[0].split('.')[0] + ".";
    document.getElementById('res-personality').textContent = msgs[1].split('.')[0] + ".";
    document.getElementById('res-love').textContent = msgs[2].split('.')[0] + ".";
    document.getElementById('res-wealth').textContent = msgs[3].split('.')[0] + ".";

    // 4. Pain Point (Screenshot-worthy)
    const painPoints = {
      [ELEMENTS.WOOD]: "실패가 두려운 게 아니라, 남들에게 실패한 것처럼 보일까 봐 그게 제일 무서운 거다.",
      [ELEMENTS.FIRE]: "네가 받는 박수 소리가 멈추면, 너는 네가 아무것도 아닌 사람이 될까 봐 겁나지?",
      [ELEMENTS.EARTH]: "안정적인 게 아니라 정체된 거다. 고인 물은 결국 썩는 법이야.",
      [ELEMENTS.METAL]: "네가 세운 그 날카로운 기준이 결국 네 주변 사람들뿐만 아니라 너 자신까지 베고 있다.",
      [ELEMENTS.WATER]: "똑똑한 척 잔머리 굴리다가 네 인생의 가장 큰 기회를 스스로 차버리고 있다."
    };
    document.getElementById('res-pain-point').textContent = `"${painPoints[dominant]}"`;

    // 5. Future
    document.getElementById('res-future').textContent = msgs[6].split('.')[0] + ". 네 선택에 달렸다.";

    // 6. Advice
    document.getElementById('res-advice').textContent = msgs[7].replace(/<br>/g, '\n');
  }

  shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: '팩폭할머니 사주 상담',
        text: document.getElementById('res-pain-point').textContent,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('주소가 복사되었다. 친구들에게 팩폭을 날려라!');
      navigator.clipboard.writeText(window.location.href);
    }
  });
});
