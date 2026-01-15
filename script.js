// ===== Dynamic Copyright Year =====
document.getElementById('year').textContent = new Date().getFullYear();


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
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.travel-card, .blog-card, .about-professional, .about-personal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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

        // Filter cards with elegant fade
        blogCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 400);
            }
        });
    });
});

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    // Show success message
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Thank You!';
    btn.style.background = 'var(--palm)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 2500);
});

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

// ===== Elegant Parallax Effect on Hero =====
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

if (hero && heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== Image Frame Hover Effect =====
const imageFrame = document.querySelector('.image-frame');

imageFrame?.addEventListener('mouseenter', () => {
    imageFrame.style.transform = 'scale(1.02)';
});

imageFrame?.addEventListener('mouseleave', () => {
    imageFrame.style.transform = 'scale(1)';
});

// ===== Navigation Scroll Effect =====
const navHeader = document.querySelector('.nav-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        navHeader?.classList.add('scrolled');
    } else {
        navHeader?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Add scrolled nav styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-header.scrolled {
        padding: 0.75rem 3rem;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    }

    @media (max-width: 768px) {
        .nav-header.scrolled {
            padding: 0.75rem 1.5rem;
        }
    }
`;
document.head.appendChild(navStyle);

// ===== Typing Effect for Label (Elegant Version) =====
const label = document.querySelector('.label');
if (label) {
    const text = label.textContent;
    label.textContent = '';
    label.style.opacity = '1';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            label.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }

    // Start typing after page load
    setTimeout(typeWriter, 800);
}

// ===== Subtle Hover Effects for Cards =====
document.querySelectorAll('.travel-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===== Load More Button (for future blog expansion) =====
const loadMoreBtn = document.getElementById('loadMore');

loadMoreBtn?.addEventListener('click', () => {
    loadMoreBtn.textContent = 'Loading...';

    // Simulate loading (replace with actual functionality)
    setTimeout(() => {
        loadMoreBtn.textContent = 'No More Posts';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
    }, 1000);
});
