import { analyzeSaju, PERSONA_DATA, ELEMENTS } from './saju-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputView = document.getElementById('input-view');
  const analysisView = document.getElementById('analysis-view');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resetBtn = document.getElementById('reset-btn');

  const birthDateInput = document.getElementById('birth-date');
  const birthTimeInput = document.getElementById('birth-time');

  const colors = {
    [ELEMENTS.WOOD]: '#4CAF50',
    [ELEMENTS.FIRE]: '#F44336',
    [ELEMENTS.EARTH]: '#FFEB3B',
    [ELEMENTS.METAL]: '#E0E0E0',
    [ELEMENTS.WATER]: '#2196F3'
  };

  analyzeBtn.addEventListener('click', () => {
    const date = birthDateInput.value;
    const time = birthTimeInput.value;

    if (!date) {
      alert('야 이놈아, 생년월일은 넣어야 할 거 아니냐!');
      return;
    }

    // Loading Simulation
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = '할머니가 돋보기 쓰고 분석 중...';

    setTimeout(() => {
      const result = analyzeSaju(date, time);
      renderDetailedAnalysis(result);

      inputView.style.display = 'none';
      analysisView.style.display = 'block';
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = '데이터 분석 시작';
      window.scrollTo(0, 0);
    }, 1500);
  });

  resetBtn.addEventListener('click', () => {
    inputView.style.display = 'block';
    analysisView.style.display = 'none';
  });

  function renderDetailedAnalysis(result) {
    const { dayMaster, balance, dominant, lacking, raw } = result;
    const domData = PERSONA_DATA[dominant];
    const lackData = PERSONA_DATA[lacking];

    // 1. Overall Summary
    document.getElementById('res-title').textContent = `🔮 전체 운명 총평: ${dayMaster}의 기운`;
    document.getElementById('res-summary').innerHTML = `
      <p style="font-size: 1.1rem; line-height: 1.8;">
        야 이놈아, 너는 태생이 <b>${dayMaster}</b> 기운을 타고났구나. 
        전체적인 에너지 흐름을 보아하니 ${domData.overall}
        <br><br>
        네 인생의 큰 흐름은 '결단'과 '인내' 사이에서 줄타기를 하는 형국이야. 
        지금 네가 힘들다고 징징대는 거, 사실 네 기운이 한쪽으로 쏠려서 그런 거야. 
        에너지 구조를 보면 <b>${dominant}</b> 기운이 과하게 넘쳐나는데, 
        정작 네 삶을 부드럽게 만들어줄 <b>${lacking}</b> 기운은 씨가 말랐어. 
        이러니 인생이 뻑뻑하고 자꾸만 삐걱거리는 거지.
      </p>
    `;

    // Chart
    const chart = document.getElementById('res-chart');
    chart.innerHTML = '';
    raw.forEach(([name, value]) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${value}%`;
      bar.style.backgroundColor = colors[name];
      bar.innerHTML = `<span>${value}%</span><label>${name[0]}</label>`;
      chart.appendChild(bar);
    });

    // 2. Strength & Weakness Details
    const strengthsTags = document.getElementById('res-strengths-tags');
    strengthsTags.innerHTML = '';
    domData.traits_strong.forEach(trait => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.style.color = colors[dominant];
      tag.textContent = trait.split(' ')[0];
      strengthsTags.appendChild(tag);
    });

    let strengthHTML = `<ul style="padding-left: 1.2rem; margin-top: 1rem;">`;
    domData.traits_strong.forEach(trait => {
      strengthHTML += `<li style="margin-bottom: 0.8rem;"><b>${trait}</b>: 이게 네 장점이긴 한데, 잘못 쓰면 독이 된다는 걸 알아야 해.</li>`;
    });
    strengthHTML += `</ul>`;
    document.getElementById('res-strengths-desc').innerHTML = strengthHTML;

    // Weakness (Lacking Impact)
    const lackingTags = document.getElementById('res-lacking-tags');
    lackingTags.innerHTML = '';
    lackData.traits_weak.forEach(trait => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.style.color = colors[lacking];
      tag.textContent = trait.split(' ')[0];
      lackingTags.appendChild(tag);
    });

    let lackingHTML = `<ul style="padding-left: 1.2rem; margin-top: 1rem;">`;
    lackData.traits_weak.forEach(trait => {
      lackingHTML += `<li style="margin-bottom: 0.8rem;"><b>${trait}</b>: 너한테 이게 부족해서 자꾸만 인생이 꼬이는 거야. 정신 차려!</li>`;
    });
    lackingHTML += `</ul>`;
    document.getElementById('res-lacking-desc').innerHTML = lackingHTML;

    // 3. Imbalance Analysis
    document.getElementById('res-balance-desc').innerHTML = `
      <p style="margin-bottom: 1rem;">
        너는 지금 <b>${dominant}</b> 기운이 너무 세서 탈이야. 이게 현실에서 어떻게 나타나느냐? 
        ${domData.psych} 
      </p>
      <p>
        반면에 <b>${lacking}</b> 기운이 부족하니까 ${lackData.overall.split('.')[0]}. 
        왜 이런 성격이 만들어졌냐고? 네가 태어날 때부터 가져온 설계도가 원래 그래. 
        하지만 설계도가 그렇다고 해서 평생 그렇게 살 거냐? 
        부족한 기운을 채우려고 노력해야 인생이 펴지는 법이다.
      </p>
    `;

    // 4. Career & Wealth
    document.getElementById('res-career').innerHTML = `
      <p style="margin-bottom: 1rem;"><b>잘 맞는 환경:</b> ${domData.career}</p>
      <p style="margin-bottom: 1rem;"><b>절대 맞지 않는 환경:</b> 너는 ${lackData.career} 같은 곳 가면 하루도 못 버티고 때려치울 거다. 헛물켜지 마라.</p>
      <p><b>돈 흐름:</b> 너는 돈을 ${dominant === ELEMENTS.FIRE ? '불꽃처럼 써버리는' : '지독하게 쥐고만 있는'} 경향이 있어. 
      실패 패턴을 보아하니 ${domData.traits_weak[1]} 때문에 재산을 날릴 확률이 높으니까 항상 조심해라.</p>
    `;

    // 5. Love & Relationship
    document.getElementById('res-love').innerHTML = `
      <p style="margin-bottom: 1rem;"><b>애착 스타일:</b> ${domData.love.split('.')[0]}.</p>
      <p style="margin-bottom: 1rem;"><b>반복되는 실수:</b> ${domData.traits_weak[2]} 때문에 매번 똑같은 이유로 차이거나 싸우는 거야. 지겹지도 않냐?</p>
      <p><b>상대에게 보이는 인상:</b> 겉으로는 ${domData.traits_strong[0].split(' ')[0]} 해 보이지만, 속은 ${lackData.traits_weak[0].split(' ')[0]} 한 사람으로 보여. 반전 매력은 개뿔, 그냥 피곤한 스타일이지.</p>
    `;

    // 6. Future Outlook
    document.getElementById('res-future').innerHTML = `
      <p style="margin-bottom: 1rem;">
        1. <b>성공 확률 70%:</b> 네가 가진 <b>${dominant}</b>의 추진력을 유지하되, <b>${lacking}</b>의 유연함을 배우면 크게 성공할 가능성이 높다. 
      </p>
      <p style="margin-bottom: 1rem;">
        2. <b>정체 확률 30%:</b> 지금처럼 고집만 부리고 남의 말 안 들으면 평생 그 자리에 머물며 남 탓만 하다가 늙어 죽을 경향이 커. 
      </p>
      <p>
        인생은 확정된 게 아니야. 네가 오늘 어떤 선택을 하느냐에 따라 흐름은 바뀐다. 하지만 지금 네 꼬락서니를 봐서는... 에휴 말을 말자.
      </p>
    `;

    // 7. Grandmother's Final Advice
    const adviceBox = document.createElement('div');
    adviceBox.className = 'ana-card comparison';
    adviceBox.style.marginTop = '2rem';
    adviceBox.style.border = `2px solid ${colors[dominant]}`;
    adviceBox.innerHTML = `
      <h3 style="color: ${colors[dominant]}; font-size: 1.5rem;">🧘 할머니의 마지막 따끔한 충고</h3>
      <p style="font-size: 1.1rem; line-height: 2; white-space: pre-line;">
        야 이놈아, 여기까지 읽느라 고생했다. 
        근데 읽고 나서 '아 그렇구나' 하고 넘어가면 아무 소용 없어. 
        너 지금 당장 <b>${lackData.traits_strong[0].split(' ')[0]}</b> 하는 습관부터 길러라. 
        
        인생이 왜 힘드냐고? 네가 너를 너무 모르고 살아서 그래. 
        운이 나쁜 게 아니라 네 태도가 문제인 적이 더 많았을 거다. 
        세상이 너를 중심으로 돌아간다고 생각하지 마라. 
        
        그래도 네가 여기까지 와서 물어보는 거 보니까, 잘 살고 싶은 마음은 있나 보구나. 
        그 마음 하나는 기특하다. 
        가서 밥 잘 챙겨 먹고, 오늘 내가 한 말 곱씹어 보면서 정신 똑바로 차리고 살아라. 
        너는 하면 되는 놈인데 안 해서 문제인 거야. 알겠냐?
      </p>
    `;
    analysisView.appendChild(adviceBox);
  }
});
