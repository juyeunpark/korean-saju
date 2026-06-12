# **Blueprint: 팩폭할머니 사주 (Fact-Bombing Grandmother Saju)**

## **1. Project Overview**
A fun, entertainment-focused Saju (Korean fortune-telling) web app that delivers blunt, direct, and humorous life advice in the persona of a "Fact-Bombing Grandmother."

### **Core Capabilities**
- **Saju Analysis:** Simplified calculation based on birth date (Year/Month/Day) to determine the "Element" (Ilju/Ilgan).
- **Fact-Bomb Persona:** Blunt, sarcastic, yet caring grandmother tone.
- **Modern UI:** Responsive, accessible, and visually themed around "Traditional Modern" Korean aesthetics.

---

## **2. Detailed Project Outline**

### **Design & Style**
- **Theme:** "Grandmother's Cozy Room" with a modern twist.
- **Color Palette:**
  - `background`: OKLCH(95% 0.01 80) (Warm parchment)
  - `primary`: OKLCH(45% 0.15 30) (Traditional Crimson)
  - `secondary`: OKLCH(40% 0.12 250) (Deep Indigo)
  - `accent`: OKLCH(60% 0.1 140) (Sage Green)
- **Typography:**
  - Headings: Expressive Serif (e.g., 'Gowun Batang' or similar).
  - Body: Readable Sans-serif (e.g., 'Pretendard' or system default).
- **Visual Effects:** 
  - Subtle noise texture overlay.
  - Multi-layered drop shadows for cards.
  - Interactive "glow" on buttons.

### **Features**
1. **`<saju-app>`:** Main state container.
2. **`<saju-form>`:** 
   - Birth Date picker.
   - Birth Time selection (Optional).
   - Gender toggle.
3. **`<saju-result>`:** 
   - Grandmother's "Fact-Bomb" message.
   - Detailed sections: Summary, Love, Career, Advice.
   - "Try Again" button.

---

## **3. Implementation History**
- **Phase 0:** Initialized Git and connected to `https://github.com/juyeunpark/korean-saju.git`.
- **Phase 1 (Current):** Setting up basic HTML/CSS/JS structure and Saju logic.

---

## **4. Current Step: Foundation & Logic**
- Implementing `saju-logic.js` for element calculation.
- Defining the "Fact-Bomb" database.
- Building the main shell in `index.html`.
