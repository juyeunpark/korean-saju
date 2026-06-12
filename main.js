import { analyzeSaju, DEEP_ANALYSIS, ELEMENTS } from './saju-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputView = document.getElementById('input-view');
  const viralReport = document.getElementById('viral-report');
  const analyzeBtn = document.getElementById('analyze-btn');
  const shareBtn = document.getElementById('share-btn');

  const birthDateInput = document.getElementById('birth-date');
  const birthTimeInput = document.getElementById('birth-time');
  const userNameInput = document.getElementById('user-name');

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
      renderHierarchicalReport(result, name);

      inputView.style.display = 'none';
      viralReport.style.display = 'block';
      window.scrollTo(0, 0);
    }, 1500);
  });

  function renderHierarchicalReport(result, name) {
    const { dominant } = result;
    const data = DEEP_ANALYSIS[dominant];

    const container = document.getElementById('viral-report');
    container.innerHTML = `
      <section class="hook-section">
        <div class="hook-text">"${name}야, 돋보기 좀 가져와라. 네 인생 설계도 좀 뜯어보자."</div>
        <div class="scroll-hint">심층 분석 결과 ↓</div>
      </section>

      <div class="deep-report-body">
        
        <!-- 1. Overall Destiny -->
        <div class="section-group">
          <h2 class="section-title">1. 전체적인 운명 구조 (Overall Destiny)</h2>
          <div class="sub-section">
            <h4>타고난 기운의 핵심</h4>
            <p>${data.destiny.energy}</p>
          </div>
          <div class="sub-section">
            <h4>인생의 지향점</h4>
            <p>${data.destiny.direction}</p>
          </div>
          <div class="sub-section">
            <h4>내면과 외면의 괴리</h4>
            <p>${data.destiny.internal_external}</p>
          </div>
        </div>

        <!-- 2. Personality -->
        <div class="section-group">
          <h2 class="section-title">2. 성격 및 기질 분석 (Personality)</h2>
          <div class="sub-section">
            <h4>사고방식 (Thinking Style)</h4>
            <p>${data.personality.thinking}</p>
          </div>
          <div class="sub-section">
            <h4>감정 반응 패턴</h4>
            <p>${data.personality.emotion}</p>
          </div>
          <div class="sub-section">
            <h4>사회적 행동 양식</h4>
            <p>${data.personality.social}</p>
          </div>
          <div class="sub-section">
            <h4>스트레스 대응 기제</h4>
            <p>${data.personality.stress}</p>
          </div>
          <div class="sub-section highlight">
            <h4>핵심 강점</h4>
            <p>${data.personality.strengths}</p>
          </div>
          <div class="sub-section highlight danger">
            <h4>치명적 약점</h4>
            <p>${data.personality.weaknesses}</p>
          </div>
        </div>

        <!-- 3. Love -->
        <div class="section-group">
          <h2 class="section-title">3. 애정 및 인간관계 (Love & Relationship)</h2>
          <div class="sub-section">
            <h4>끌리는 이성의 유형</h4>
            <p>${data.love.attraction}</p>
          </div>
          <div class="sub-section">
            <h4>관계 시작의 패턴</h4>
            <p>${data.love.initiation}</p>
          </div>
          <div class="sub-section">
            <h4>연애 중의 행동 양식</h4>
            <p>${data.love.behavior}</p>
          </div>
          <div class="sub-section">
            <h4>갈등 발생 시 대처</h4>
            <p>${data.love.conflict}</p>
          </div>
          <div class="sub-section">
            <h4>이별의 징후와 방식</h4>
            <p>${data.love.breakup}</p>
          </div>
          <div class="sub-section danger">
            <h4>반복되는 연애 실수</h4>
            <p>${data.love.mistakes}</p>
          </div>
        </div>

        <!-- 4. Wealth -->
        <div class="section-group">
          <h2 class="section-title">4. 재물 운용 및 금전 감각 (Wealth)</h2>
          <div class="sub-section">
            <h4>돈을 대하는 태도</h4>
            <p>${data.wealth.mindset}</p>
          </div>
          <div class="sub-section">
            <h4>지출 및 소비 습관</h4>
            <p>${data.wealth.spending}</p>
          </div>
          <div class="sub-section danger">
            <h4>재물이 새어나가는 지점</h4>
            <p>${data.wealth.leakage}</p>
          </div>
          <div class="sub-section">
            <h4>저축 및 자산 축적 능력</h4>
            <p>${data.wealth.saving}</p>
          </div>
          <div class="sub-section">
            <h4>기회 포착 및 투자 성향</h4>
            <p>${data.wealth.opportunity}</p>
          </div>
        </div>

        <!-- 5. Career -->
        <div class="section-group">
          <h2 class="section-title">5. 직업적 성취와 성공 패턴 (Career)</h2>
          <div class="sub-section">
            <h4>최적의 근무 환경</h4>
            <p>${data.career.suitable}</p>
          </div>
          <div class="sub-section">
            <h4>피해야 할 환경</h4>
            <p>${data.career.unsuitable}</p>
          </div>
          <div class="sub-section">
            <h4>성공의 메커니즘</h4>
            <p>${data.career.success}</p>
          </div>
          <div class="sub-section danger">
            <h4>실패의 트리거</h4>
            <p>${data.career.failure}</p>
          </div>
          <div class="sub-section">
            <h4>성장 속도와 패턴</h4>
            <p>${data.career.growth}</p>
          </div>
        </div>

        <!-- 6. Warnings -->
        <div class="section-group">
          <h2 class="section-title">6. 인생의 함정과 주의사항 (Warnings)</h2>
          <div class="sub-section danger">
            <h4>반복되는 삶의 실수</h4>
            <p>${data.warning.mistakes}</p>
          </div>
          <div class="sub-section">
            <h4>정서적 취약점</h4>
            <p>${data.warning.emotional}</p>
          </div>
          <div class="sub-section">
            <h4>인간관계의 리스크</h4>
            <p>${data.warning.relationship}</p>
          </div>
          <div class="sub-section">
            <h4>직업적 리스크</h4>
            <p>${data.warning.career}</p>
          </div>
        </div>

        <!-- 7. Future -->
        <div class="section-group">
          <h2 class="section-title">7. 미래의 시나리오 (Future Scenarios)</h2>
          <div class="sub-section">
            <h4>현재 궤적 유지 시의 모습</h4>
            <p>${data.future.trajectory}</p>
          </div>
          <div class="sub-section">
            <h4>단기적인 변화의 흐름</h4>
            <p>${data.future.short_term}</p>
          </div>
          <div class="sub-section highlight">
            <h4>장기적 인생 경로 (2-3가지)</h4>
            <p>${data.future.scenarios}</p>
          </div>
        </div>

        <!-- 8. Final Advice -->
        <div class="section-group advice-final">
          <h2 class="section-title">8. 할머니의 뼈 때리는 조언 (Final Advice)</h2>
          <div class="sub-section">
            <h4>핵심적인 문제 지점</h4>
            <p>${data.advice.core}</p>
          </div>
          <div class="sub-section">
            <h4>당장 교정해야 할 습관</h4>
            <p>${data.advice.habit}</p>
          </div>
          <div class="sub-section highlight">
            <h4>현실적인 인생 가이드</h4>
            <p>${data.advice.realistic}</p>
          </div>
        </div>

        <div class="share-area" style="text-align: center; margin-top: 4rem;">
          <button class="btn-primary" id="share-btn">이 심층 분석 공유하기</button>
          <button class="btn-secondary" onclick="location.reload()" style="margin-top: 1rem; width: 100%; padding: 1rem; border-radius: 15px; border: 1px solid #ddd; background: white; font-weight: 700; cursor: pointer;">다시 분석하기</button>
        </div>
      </div>
    `;

    // Re-bind share button since we overwrote innerHTML
    document.getElementById('share-btn').addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'AI 심층 사주 감명서',
          text: '팩폭할머니의 뼈 때리는 인생 상담 결과',
          url: window.location.href,
        }).catch(console.error);
      } else {
        alert('주소가 복사되었다!');
        navigator.clipboard.writeText(window.location.href);
      }
    });
  }
});
