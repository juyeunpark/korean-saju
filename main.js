import { analyzeSaju, ANALYSIS_DATA, ELEMENTS } from './saju-engine.js';

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
      alert('생년월일을 입력해주세요.');
      return;
    }

    const result = analyzeSaju(date, time);
    renderAnalysis(result);

    inputView.style.display = 'none';
    analysisView.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    inputView.style.display = 'block';
    analysisView.style.display = 'none';
  });

  function renderAnalysis(result) {
    const { dayMaster, balance, dominant, lacking, raw } = result;

    // Title & Summary
    document.getElementById('res-title').textContent = `분석 결과: ${dayMaster}의 기운`;
    const dominantData = ANALYSIS_DATA[dominant[0]];
    document.getElementById('res-summary').textContent = dominantData.impact_strong;

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

    // Strengths
    const strengthsTags = document.getElementById('res-strengths-tags');
    strengthsTags.innerHTML = '';
    dominant.forEach(el => {
      ANALYSIS_DATA[el].traits.slice(0, 3).forEach(trait => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = trait;
        strengthsTags.appendChild(tag);
      });
    });
    document.getElementById('res-strengths-desc').textContent = 
      dominant.map(el => ANALYSIS_DATA[el].impact_strong).join(' ');

    // Lacking
    const lackingTags = document.getElementById('res-lacking-tags');
    lackingTags.innerHTML = '';
    lacking.forEach(el => {
      ANALYSIS_DATA[el].traits.slice(0, 2).forEach(trait => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = trait;
        lackingTags.appendChild(tag);
      });
    });
    document.getElementById('res-lacking-desc').textContent = 
      lacking.length > 0 ? lacking.map(el => ANALYSIS_DATA[el].impact_weak).join(' ') : "에너지 균형이 매우 안정적입니다. 특별히 부족한 기운이 보이지 않습니다.";

    // Balance Comparison
    document.getElementById('res-balance-desc').textContent = 
      `현재 당신의 에너지는 ${dominant[0]} 기운이 과다하며, ${lacking[0] || '균형 잡힌'} 기운이 부족한 상태입니다. 이는 ${ANALYSIS_DATA[dominant[0]].psych}`;

    // Career & Success
    document.getElementById('res-career').textContent = 
      `추천 환경: ${dominantData.career}. 당신은 ${dominantData.impact_strong} 따라서 성공을 위해서는 마무리에 집중하는 패턴이 필요합니다.`;

    // Love
    document.getElementById('res-love').textContent = 
      `애정 패턴: 당신은 관계에서 ${dominantData.traits[4]} 성향을 보입니다. 하지만 에너지가 과할 때 ${dominantData.traits[3]} 기질이 나와 갈등을 유발할 확률이 높습니다.`;

    // Future
    document.getElementById('res-future').textContent = 
      `확률적 전망: 현재의 ${dominant[0]} 성향을 유지할 경우, 전문 분야에서 두각을 나타낼 가능성이 높습니다. 다만 ${lacking[0] || '특정'} 기운의 부족으로 인해 번아웃이나 의사결정의 지연이 발생할 수 있으니 이를 보완하는 습관이 중요합니다.`;
  }
});
