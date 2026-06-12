import { analyzeSaju, CONVERSATIONS, ELEMENTS } from './saju-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputView = document.getElementById('input-view');
  const reportContent = document.getElementById('report-content');
  const generateBtn = document.getElementById('generate-btn');

  const birthDateInput = document.getElementById('birth-date');
  const birthTimeInput = document.getElementById('birth-time');
  const userNameInput = document.getElementById('user-name');

  generateBtn.addEventListener('click', () => {
    const date = birthDateInput.value;
    const name = userNameInput.value || '무명씨';

    if (!date) {
      alert('야 이놈아, 생년월일은 넣어야 할 거 아니냐!');
      return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = '할머니가 돋보기 쓰고 적는 중...';

    setTimeout(() => {
      const result = analyzeSaju(date, birthTimeInput.value);
      renderLongFormReport(result, name);

      inputView.style.display = 'none';
      reportContent.style.display = 'block';
      window.scrollTo(0, 0);
    }, 1500);
  });

  function renderLongFormReport(result, name) {
    const { dayMaster, dominant } = result;
    const msgs = CONVERSATIONS[dominant];

    // Build the narrative essay
    let html = `
      <div class="narrative-p">
        ${name}야, 어디 보자... 돋보기 좀 가져와라. 이놈 봐라, 기운이 아주 <b>${dominant}</b>의 성질을 고스란히 품고 태어났구나. 
        네 인생의 큰 설계도를 펼쳐보니, 너는 태생부터 <b>${dayMaster}</b>의 기운을 바탕으로 세상을 살아가는 형국이야. 
      </div>

      <span class="highlight-sentence">${msgs[0].split('?')[0]}? 네 인생 자체가 개척 아니면 고집이야.</span>

      <div class="narrative-p">
        ${msgs[0].split('?')[1] || ''} 
        인생이라는 게 참 묘하지? 네가 가진 그 뜨겁거나 차가운 성질이 네 성격의 뿌리가 되고, 그 뿌리가 결국 네 운명의 줄기를 만들어내는 거야.
      </div>

      <h2 class="section-title">🧠 타고난 기질과 성격의 양면성</h2>
      <div class="narrative-p">
        ${msgs[1]} 
        사람들이 너 보고 뭐라 하든 상관없다고 하지만, 사실 네 속마음은 그게 아니잖아? 네 강점이 때로는 네 발목을 잡는 족쇄가 되기도 해. 
        특히나 네가 가진 그 지독한 성미가 현실에서 부딪힐 때마다 너는 스스로를 갉아먹고 있지는 않은지 돌아봐야 해.
      </div>

      <span class="highlight-sentence">${msgs[1].split('.')[0]}. 그게 네가 인생을 대하는 태도야.</span>

      <h2 class="section-title">💔 관계와 연애, 그리고 반복되는 패턴</h2>
      <div class="narrative-p">
        ${msgs[2]}
        사랑이라는 게 네 마음대로 되는 게 아니란다. 네가 상대방을 대할 때 나오는 그 무의식적인 습관들이 결국 관계를 망치고 있지는 않은지 잘 생각해 봐. 
        네가 매번 똑같은 이유로 상처받거나 지치는 건 운이 나빠서가 아니라, 네가 가진 관계의 설계도가 그렇게 그려져 있기 때문이야.
      </div>

      <h2 class="section-title">💰 재물과 성공, 그리고 삶의 터전</h2>
      <div class="narrative-p">
        ${msgs[3]}
        ${msgs[4]}
        돈이라는 건 들어오는 구멍보다 나가는 구멍을 잘 막아야 하는 법이야. 네 기운을 보아하니 성공하고 싶은 욕심은 끝도 없는데, 정작 그 성공을 담을 그릇은 구멍이 뚫려 있구나. 
        네가 어떤 환경에서 빛을 발할지, 그리고 어떤 함정을 조심해야 할지 내가 일러준 말들 가슴 깊이 새겨둬라.
      </div>

      <h2 class="section-title">⚠️ 인생의 덫과 주의해야 할 함정</h2>
      <div class="narrative-p">
        ${msgs[5]}
        사람 인생 살다 보면 누구나 위기가 오기 마련이지. 하지만 너는 네 성격 때문에 스스로 그 위기를 자초하는 경향이 커. 
        네가 가진 눈먼 낙관이나 지독한 우울함이 현실을 왜곡해서 보게 만들 때가 많아. 그럴 때마다 내가 해준 이 말을 떠올리며 정신 똑바로 차려라.
      </div>

      <h2 class="section-title">🔮 미래의 확률과 변화의 지점</h2>
      <div class="narrative-p">
        ${msgs[6]}
        인생은 확정된 게 아니야. 하지만 네가 지금처럼 살면 네가 마주할 미래는 뻔해. 
        어떤 선택이 네 흐름을 바꿀지, 그리고 네가 40대, 50대 이후에 어떤 모습으로 늙어갈지는 오늘 네가 이 글을 읽고 무엇을 느끼느냐에 달려 있어. 
        가능성은 무궁무진하지만, 네 태도가 변하지 않으면 그 가능성은 그냥 꿈일 뿐이란다.
      </div>

      <div class="footer-advice">
        ${msgs[7]}
        <br><br>
        자, 내 할 말은 다 했다. 가서 밥이나 잘 챙겨 먹고, 오늘 내가 한 말 곱씹어 보면서 정신 똑바로 차리고 살아라. 
        너는 하면 되는 놈인데 안 해서 문제인 거야. 알겠냐?
      </div>

      <button class="btn" onclick="location.reload()" style="margin-top: 4rem; background: transparent; border: 1px solid #ddd; color: #666;">다시 작성하기</button>
    `;

    reportContent.innerHTML = html;
  }
});
