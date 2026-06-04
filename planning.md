# Anniversary Website Project Planning

## Directory Structure
- `index.html`: Intro page (Are you ready?) & Rejection state (No -> angry/sad face + retry).
- `page2.html`: Password lock page (051126).
- `page3.html`: Calendar memory page.
- `page4.html`: 2-page Love letter.
- `page5.html`: Vertical scroll gallery (tilted photos).
- `page6.html`: End page with fading text.
- `style.css`: All premium animations, cursor, and layout styling.
- `script.js`: GSAP animations, interactions, audio control, and logic.
- `config.js`: Central configuration for texts, images, password, and music.
- `assets/`: Holds `images/` and `music/`.

## Technology Stack
- **HTML5/CSS3/JavaScript (ES6+)**
- **GSAP (GreenSock)** for timeline and complex animations.
- **Lenis** for smooth scrolling.
- **Canvas Confetti** for celebration particles.

## Animation & Design System
- **Background**: Romantic dreamy gradient (`#FFF5F7` to `#FFD9E5`) with floating glow blobs, floating hearts, and breathing light effect.
- **Interactions**: Custom glowing cursor with heart trail, magnetic buttons, hover effects.
- **Page Transitions**: Smooth fade and scale transitions via GSAP.
- **Performance**: Use GPU acceleration (`transform`, `opacity`), requestAnimationFrame for custom particles.

## Implementation Steps
1. [x] Scaffold directory and configuration (`config.js`).
2. [ ] Build global `style.css` (Background, utility classes, typography, custom cursor).
3. [ ] Build global `script.js` (Background animations, music player, cursor logic).
4. [ ] Implement `index.html` (Intro & Rejection).
5. [ ] Implement `page2.html` (Password).
6. [ ] Implement `page3.html` (Calendar).
7. [ ] Implement `page4.html` (Letter).
8. [ ] Implement `page5.html` (Vertical Gallery).
9. [ ] Implement `page6.html` (Outro).
