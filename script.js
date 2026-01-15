// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.innerHTML = theme === 'dark' ? '&#9790;' : '&#9728;';
    }
}

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.travel-card, .blog-card, .about-professional, .about-personal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Blog Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Filter cards
        blogCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    // Show success message (in a real implementation, you'd send this to a backend)
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Subscribed!';
    btn.style.background = 'var(--magenta)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 2000);
});

// ===== Cursor Trail Effect =====
const cursorTrail = [];
const trailLength = 10;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.5}px;
        height: ${8 - i * 0.5}px;
        background: ${i % 2 === 0 ? 'var(--cyan)' : 'var(--magenta)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.1};
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(dot);
    cursorTrail.push(dot);
}

let mouseX = 0, mouseY = 0;
let trailPositions = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show trail dots
    cursorTrail.forEach(dot => dot.style.display = 'block');
});

document.addEventListener('mouseleave', () => {
    cursorTrail.forEach(dot => dot.style.display = 'none');
});

function animateTrail() {
    trailPositions.unshift({ x: mouseX, y: mouseY });

    if (trailPositions.length > trailLength) {
        trailPositions.pop();
    }

    cursorTrail.forEach((dot, i) => {
        const pos = trailPositions[i] || trailPositions[trailPositions.length - 1];
        if (pos) {
            dot.style.left = pos.x + 'px';
            dot.style.top = pos.y + 'px';
        }
    });

    requestAnimationFrame(animateTrail);
}

animateTrail();

// ===== Avatar Click Effect =====
const avatar = document.querySelector('.placeholder-avatar');

avatar?.addEventListener('click', () => {
    avatar.style.animation = 'spin 0.5s ease';

    // Create confetti
    for (let i = 0; i < 20; i++) {
        createConfetti(avatar);
    }

    setTimeout(() => {
        avatar.style.animation = '';
    }, 500);
});

function createConfetti(element) {
    const confetti = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const color = Math.random() > 0.5 ? 'var(--cyan)' : 'var(--magenta)';

    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        pointer-events: none;
        z-index: 9999;
    `;

    document.body.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    let opacity = 1;
    let x = 0, y = 0;

    function animate() {
        x += vx;
        y += vy + 2; // gravity
        opacity -= 0.02;

        confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x * 5}deg)`;
        confetti.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    }

    animate();
}

// Add spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        to { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(spinStyle);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Typing Effect for Label =====
const label = document.querySelector('.label');
if (label) {
    const text = label.textContent;
    label.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            label.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// ===== Glow Pulse Animation =====
const glowElements = document.querySelectorAll('.logo, .hero h1');
glowElements.forEach(el => {
    el.style.animation = 'glow-pulse 6s ease-in-out infinite';
});

const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes glow-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
    }
`;
document.head.appendChild(glowStyle);
