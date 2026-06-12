/**
 * Simplified Saju Logic for Entertainment
 * Maps birth dates to the "Five Elements" (목, 화, 토, 금, 수)
 */

export const ELEMENTS = {
  WOOD: '목(木)',
  FIRE: '화(火)',
  EARTH: '토(土)',
  METAL: '금(金)',
  WATER: '수(水)'
};

// Simplified calculation based on the day of birth
// In a real Saju system, this would use the Ganji (Ten Stems and Twelve Branches)
// For this app, we'll use a deterministic mapping based on the date.
export function calculateElement(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // A simple formula to get one of 5 elements
  const score = (year + month + day) % 5;
  
  const mapping = [
    ELEMENTS.WOOD,
    ELEMENTS.FIRE,
    ELEMENTS.EARTH,
    ELEMENTS.METAL,
    ELEMENTS.WATER
  ];

  return mapping[score];
}

export const FACT_BOMBS = {
  [ELEMENTS.WOOD]: {
    summary: "너는 겉은 멀쩡해 보여도 속은 고집불통 나무토막이다.",
    personality: "한 번 마음 먹으면 끝까지 가야 직성이 풀리지? 근데 그게 다 네 고집인 건 알고 있냐? 남들 말 좀 들어라, 귀는 장식이 아니다.",
    love: "연애할 때도 네가 다 휘어잡아야 하지? 상대방 숨 막혀 죽는다. 좀 져줘라.",
    career: "리더십은 개뿔, 그냥 네가 시키는 대로 안 하면 화나는 거잖아. 협동 좀 배워라.",
    advice: "나무가 너무 뻣뻣하면 부러지는 법이다. 유연하게 좀 살아라."
  },
  [ELEMENTS.FIRE]: {
    summary: "성격이 급해서 제 풀에 지쳐버리는 불나방 같은 놈아.",
    personality: "팍 타올랐다가 금방 식어버리는 게 딱 너다. 시작은 창대하나 끝은 미약하기 그지없구나. 인내심 좀 길러라.",
    love: "금사빠(금방 사랑에 빠지는 사람) 기질 좀 버려라. 얼굴만 보고 달려들지 말고 속을 봐.",
    career: "열정은 좋은데 뒷심이 부족해. 마무리 좀 똑바로 해라, 칠칠치 못하게.",
    advice: "화르르 타오르기만 하면 재밖에 안 남는다. 은근한 불씨를 키워라."
  },
  [ELEMENTS.EARTH]: {
    summary: "답답하다 답답해! 느릿느릿 곰 같은 스타일이네.",
    personality: "생각이 너무 많아서 결정 하나 하는 데 한 세월이지? 그러다 기차 다 떠난다. 행동 좀 빨리 해라.",
    love: "좋으면 좋다고 말을 해! 상대방이 독심술사냐? 멍하니 있다가 다 뺏긴다.",
    career: "성실하긴 한데 융통성이 없어. 벽 보고 일하는 것 같다는 소리 안 듣냐?",
    advice: "흙은 굳으면 돌이 된다. 가끔은 삽질도 좀 하고 땅을 갈아엎어라."
  },
  [ELEMENTS.METAL]: {
    summary: "칼날같이 날카로워서 주변 사람들 다 베고 다니는구나.",
    personality: "말 한마디를 해도 비수가 꽂히게 하네. 너는 시원하다고 생각하겠지만 듣는 사람은 피눈물 흘린다. 입 조심해라.",
    love: "지나치게 따지고 재니까 사람이 없지. 완벽한 사람은 없다, 너부터 돌아봐.",
    career: "일 처리는 깔끔한데 싸가지가 없다는 소리 자주 듣지? 사회생활은 혼자 하는 게 아니다.",
    advice: "칼도 칼집에 들어가 있을 때가 있어야 한다. 날을 좀 무디게 세워라."
  },
  [ELEMENTS.WATER]: {
    summary: "속을 알 수 없는 물귀신 같은 놈, 잔머리 좀 그만 굴려라.",
    personality: "여기 붙었다 저기 붙었다, 줏대가 없구나. 머리는 좋은데 그 머리를 사기 치는 데만 쓰지 마라.",
    love: "어장관리 좀 그만해. 한 명한테 집중 안 하니 진심이 안 느껴지는 거다.",
    career: "임기응변은 최고인데 신뢰가 안 가. 묵직하게 자기 자리를 지켜봐라.",
    advice: "물이 너무 맑으면 물고기가 안 모인다. 너무 계산적으로 살지 마라."
  }
};
