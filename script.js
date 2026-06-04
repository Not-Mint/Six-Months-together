// Global Scripts (Cursor, Canvas Particles, Lenis, Music)

document.addEventListener("DOMContentLoaded", () => {
    // 1. Lenis Smooth Scrolling
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 2. Premium Custom Cursor System
    const cursorMain = document.createElement('div');
    cursorMain.className = 'cursor-main';
    cursorMain.innerHTML = '<div class="cursor-heart"></div>';
    document.body.appendChild(cursorMain);

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let mainX = 0, mainY = 0;
    let ringX = 0, ringY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let velocity = 0;
    let isHovering = false;
    let magneticTarget = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Calculate velocity for stretching
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        velocity = Math.sqrt(dx * dx + dy * dy);
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        // Create particles on move
        if (velocity > 2 && Math.random() > 0.7) {
            createParticle(mouseX, mouseY);
        }
    });

    function createParticle(x, y) {
        const p = document.createElement('div');
        p.className = 'particle';
        const types = ['❤️', '✨', '⭐', '🌸'];
        p.innerHTML = types[Math.floor(Math.random() * types.length)];
        
        const size = Math.random() * 15 + 10;
        const duration = 1 + Math.random();
        
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.fontSize = size + 'px';
        p.style.opacity = 0.8;
        p.style.color = Math.random() > 0.5 ? '#FF8FB1' : '#FFD9E5';
        document.body.appendChild(p);

        gsap.to(p, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100 - 50,
            rotation: Math.random() * 360,
            opacity: 0,
            scale: 0,
            duration: duration,
            ease: "power1.out",
            onComplete: () => p.remove()
        });
    }

    function animateCursor() {
        // Lerp factor
        const lerpMain = 0.2;
        const lerpRing = 0.1;

        if (isHovering && magneticTarget) {
            const rect = magneticTarget.getBoundingClientRect();
            const targetX = rect.left + rect.width / 2;
            const targetY = rect.top + rect.height / 2;
            
            // Magnetic pull
            mainX += (targetX - mainX) * 0.25;
            mainY += (targetY - mainY) * 0.25;
            ringX += (targetX - ringX) * 0.15;
            ringY += (targetY - ringY) * 0.15;
        } else {
            mainX += (mouseX - mainX) * lerpMain;
            mainY += (mouseY - mainY) * lerpMain;
            ringX += (mouseX - ringX) * lerpRing;
            ringY += (mouseY - ringY) * lerpRing;
        }

        // Velocity-based scaling (stretch)
        const scaleX = 1 + Math.min(velocity * 0.01, 0.5);
        const scaleY = 1 - Math.min(velocity * 0.005, 0.3);
        const rotation = Math.atan2(mouseY - lastMouseY, mouseX - lastMouseX) * 180 / Math.PI;

        cursorMain.style.transform = `translate(${mainX}px, ${mainY}px) translate(-50%, -50%) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        cursorRing.style.opacity = Math.max(0.2, 1 - velocity * 0.01);

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover & Click Effects
    const interactables = document.querySelectorAll('button, a, .key, .clickable');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            magneticTarget = el;
            gsap.to(cursorRing, { width: 80, height: 80, borderColor: 'rgba(255, 143, 177, 0.8)', duration: 0.4 });
            gsap.to(cursorMain, { scale: 1.5, duration: 0.4 });
            createBurst(mouseX, mouseY, 8);
        });
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            magneticTarget = null;
            gsap.to(cursorRing, { width: 40, height: 40, borderColor: 'rgba(255, 143, 177, 0.5)', duration: 0.4 });
            gsap.to(cursorMain, { scale: 1, duration: 0.4 });
        });
    });

    document.addEventListener('mousedown', (e) => {
        createRipple(e.clientX, e.clientY);
        createBurst(e.clientX, e.clientY, 15);
        gsap.to(cursorMain, { scale: 0.7, duration: 0.1, yoyo: true, repeat: 1 });
    });

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    function createBurst(x, y, count) {
        for (let i = 0; i < count; i++) {
            createParticle(x, y);
        }
    }

    // 3. Canvas Floating Particles (Ambient)
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        const particles = [];
        const particleCount = 40;

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 3 + 1,
                    speedY: Math.random() * 0.4 + 0.1,
                    speedX: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.y -= p.speedY;
                p.x += p.speedX;
                if (p.y < -10) {
                    p.y = height + 10;
                    p.x = Math.random() * width;
                }
                ctx.fillStyle = `rgba(255, 143, 177, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', init);
        init();
        draw();
    }

    // 4. Background Music Persistence
    if (sessionStorage.getItem("musicPlaying") === "true") {
        let globalAudio = document.getElementById("global-audio");
        if (!globalAudio) {
            globalAudio = new Audio(CONFIG.musicSource);
            globalAudio.id = "global-audio";
            globalAudio.loop = true;
            globalAudio.volume = 0.5;
            document.body.appendChild(globalAudio);
            
            const savedTime = sessionStorage.getItem("musicTime") || 0;
            globalAudio.currentTime = parseFloat(savedTime);
            globalAudio.play().catch(e => console.log("Audio autoplay blocked"));

            setInterval(() => {
                sessionStorage.setItem("musicTime", globalAudio.currentTime);
            }, 1000);
        }
    }

    // 5. Background Breathing Glow
    gsap.to(".glow-blob.one", {
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    gsap.to(".glow-blob.two", {
        scale: 1.3,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
    });
});
