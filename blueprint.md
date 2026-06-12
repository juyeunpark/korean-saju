# **Blueprint: AI Saju Analysis System (Deep Myeongrihak)**

## **1. Project Overview**
A professional-grade (yet entertainment-focused) Saju analysis system that combines traditional Korean Myeongrihak with an "AI Psychologist" persona. It provides deep, structured insights into personality, life cycles, and element balance.

### **Core Capabilities**
- **Deep Saju Analysis:** Simplified Manse-ryeok (Calendar) calculation to determine the "Four Pillars" (Year, Month, Day, Time) and "Five Elements" balance.
- **AI Psychologist Tone:** Insightful, blunt, analytical, and structured advice.
- **Structured Reporting:** Comparative analysis of strengths vs. weaknesses.

---

## **2. Detailed Project Outline**

### **Design & Style**
- **Theme:** "Digital Mysticism" - A mix of technical data visualization and traditional Korean aesthetics.
- **Color Palette:**
  - `background`: OKLCH(15% 0.02 250) (Deep Midnight Blue)
  - `card`: OKLCH(20% 0.03 250) (Dark Navy)
  - `text`: OKLCH(95% 0.01 250) (Soft White)
  - `accent-wood`: #4CAF50, `accent-fire`: #F44336, `accent-earth`: #FFEB3B, `accent-metal`: #9E9E9E, `accent-water`: #2196F3.
- **Visuals:** 
  - Radar charts or bar graphs for Element Balance.
  - Clean, structured "Analysis Cards."

### **Features & Report Structure**
1. **Overall Summary:** Interpretation of the total energy balance.
2. **Strength Analysis:** 3-5 dominant traits and their life impact.
3. **Weakness/Missing Elements:** Lacking traits and their real-life impact.
4. **Balance Comparison:** Explicit comparison of Strong vs. Weak.
5. **Life Specifics:**
   - **Career:** Suitable environments, risk patterns (burnout, etc.).
   - **Wealth:** Success and financial patterns.
   - **Relationship:** Attachment styles, conflict patterns, ideal partners.
6. **Future Outlook:** Probabilistic tendencies based on current energy.

---

## **3. Implementation History**
- **Phase 0:** Basic "Fact-Bombing Grandmother" app with simple logic.
- **Phase 1 (Current):** Upgrading logic engine to support 10 Heavenly Stems and 12 Earthly Branches approximation.
- **Phase 2:** Redesigning UI for "AI Psychologist" persona and structured data display.

---

## **4. Current Step: Logic Expansion & Data Mapping**
- Implementing a robust `saju-engine.js` that approximates the Four Pillars.
- Creating a comprehensive content library for the "AI Psychologist" persona.
- Updating `index.html` to accommodate the 7-part structured report.
