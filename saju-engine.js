/**
 * AI Saju Engine (Approximated Myeongrihak)
 * Calculates the Five Elements distribution and Day Master (Ilgan).
 */

export const ELEMENTS = {
  WOOD: '목(木)',
  FIRE: '화(火)',
  EARTH: '토(土)',
  METAL: '금(金)',
  WATER: '수(水)'
};

const ELEMENT_COLORS = {
  [ELEMENTS.WOOD]: '#4CAF50',
  [ELEMENTS.FIRE]: '#F44336',
  [ELEMENTS.EARTH]: '#FFEB3B',
  [ELEMENTS.METAL]: '#9E9E9E',
  [ELEMENTS.WATER]: '#2196F3'
};

/**
 * Calculates a simplified Five Elements distribution based on birth date.
 * In a real system, this involves complex Sexagenary cycle conversions.
 * Here we use an approximation based on Year, Month, Day, and Time cycles.
 */
export function analyzeSaju(dateStr, timeStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = timeStr ? parseInt(timeStr.split(':')[0]) : 12;

  // 1. Calculate base weights (Year, Month, Day, Hour pillars)
  // This is a heuristic mapping for simulation.
  const weights = {
    [ELEMENTS.WOOD]: (year % 5 === 0 ? 30 : 10) + (month >= 2 && month <= 4 ? 20 : 5),
    [ELEMENTS.FIRE]: (year % 5 === 1 ? 30 : 10) + (month >= 5 && month <= 7 ? 20 : 5),
    [ELEMENTS.EARTH]: (year % 5 === 2 ? 30 : 10) + ([1, 4, 7, 10].includes(month) ? 20 : 5),
    [ELEMENTS.METAL]: (year % 5 === 3 ? 30 : 10) + (month >= 8 && month <= 10 ? 20 : 5),
    [ELEMENTS.WATER]: (year % 5 === 4 ? 30 : 10) + (month >= 11 || month <= 1 ? 20 : 5)
  };

  // Day influence (Day Master approximation)
  const dayElementIndex = (day + month) % 5;
  const dayElement = Object.values(ELEMENTS)[dayElementIndex];
  weights[dayElement] += 40; // The Day Master has the most influence

  // Time influence
  const timeElementIndex = Math.floor(hour / 4.8) % 5;
  const timeElement = Object.values(ELEMENTS)[timeElementIndex];
  weights[timeElement] += 15;

  // Normalize scores
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const normalized = {};
  for (let key in weights) {
    normalized[key] = Math.round((weights[key] / total) * 100);
  }

  // Determine Strong vs Weak
  const sorted = Object.entries(normalized).sort((a, b) => b[1] - a[1]);
  const dominant = sorted.filter(e => e[1] >= 25).map(e => e[0]);
  const lacking = sorted.filter(e => e[1] < 15).map(e => e[0]);

  return {
    dayMaster: dayElement,
    balance: normalized,
    dominant,
    lacking,
    raw: sorted
  };
}

export const ANALYSIS_DATA = {
  [ELEMENTS.WOOD]: {
    traits: ["추진력", "성장욕구", "창의성", "고집", "배려심"],
    career: "교육, 디자인, 기획, 목재/조경, 스타트업",
    impact_strong: "새로운 일을 벌이는 데 천재적이지만, 마무리가 약할 수 있습니다. 수직적인 성장 욕구가 강해 억눌리는 환경을 극대화로 싫어합니다.",
    impact_weak: "자신감이 부족하고 새로운 시작을 두려워합니다. 결정력이 약해 남의 의견에 쉽게 휩쓸리는 경향이 있습니다.",
    psych: "뿌리를 내리려는 욕구와 가지를 뻗으려는 욕구가 충돌하면 번아웃이 옵니다."
  },
  [ELEMENTS.FIRE]: {
    traits: ["열정", "표현력", "급한 성격", "화려함", "솔직함"],
    career: "예술, 방송, IT, 마케팅, 에너지 산업",
    impact_strong: "자신을 드러내는 데 능숙하며 에너지가 넘칩니다. 하지만 감정 기복이 심하고 금방 타올랐다 꺼질 위험이 있습니다.",
    impact_weak: "내성적이며 열정이 부족해 보일 수 있습니다. 사회적 관계에서 에너지를 얻기보다 소모되는 느낌을 자주 받습니다.",
    psych: "인정 욕구가 강해 타인의 시선에 민감하게 반응하며, 감정 소모 패턴을 주의해야 합니다."
  },
  [ELEMENTS.EARTH]: {
    traits: ["포용력", "안정감", "신용", "고집", "중재력"],
    career: "부동산, 상담, 교육, 관리직, 중개업",
    impact_strong: "믿음직하고 중심을 잘 잡습니다. 그러나 변화를 극도로 싫어하며 고집이 세어 소통이 단절될 수 있습니다.",
    impact_weak: "안정감이 부족하고 정착하지 못하는 느낌을 받습니다. 감정의 기복을 조절하기 어려워하며 불안감을 자주 느낍니다.",
    psych: "모든 것을 품으려다 스스로의 공간을 잃어버리는 '내부적 과부하' 패턴이 보입니다."
  },
  [ELEMENTS.METAL]: {
    traits: ["결단력", "논리", "결벽", "의리", "냉철함"],
    career: "금융, 법률, 엔지니어링, 군경, 전문기술직",
    impact_strong: "일 처리가 완벽하고 공사가 뚜렷합니다. 하지만 차가운 인상을 주며 타인에게 엄격한 잣대를 들이대 갈등을 유발합니다.",
    impact_weak: "맺고 끊음이 약해 손해를 보는 경우가 많습니다. 비판적인 사고가 부족해 사기를 당하거나 상황 판단이 흐려질 수 있습니다.",
    psych: "완벽주의적 성향이 강해 스스로를 옥죄는 '자기 검열' 패턴이 강합니다."
  },
  [ELEMENTS.WATER]: {
    traits: ["지혜", "유연함", "침착함", "생각이 많음", "비밀스러움"],
    career: "전략기획, 연구, 무역, 유통, 심리학",
    impact_strong: "지혜롭고 상황 대처 능력이 뛰어납니다. 다만 속을 알 수 없어 음흉하다는 오해를 받거나 우울감에 빠지기 쉽습니다.",
    impact_weak: "유연성이 부족하고 생각이 짧을 수 있습니다. 스트레스 상황에서 회복 탄력성이 낮아 고립되는 경향이 있습니다.",
    psych: "깊은 심연을 가진 스타일로, 자신의 감정을 숨기다 한꺼번에 터지는 폭발성을 주의해야 합니다."
  }
};
