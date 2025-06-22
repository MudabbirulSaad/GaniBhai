// Main JavaScript for Anniversary Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations
    initAnimations();
    
    // Initialize countdown timer
    initCountdown();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Add floating hearts
    setInterval(createFloatingHeart, 3000);
    
    // Initialize anniversary animation
    initAnniversaryAnimation();
    
    // Create particles for anniversary animation
    createParticles();
    
    // Handle mobile-specific adjustments
    handleMobileAdjustments();
});

// GSAP Animations
function initAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .to("#title", {duration: 1.2, opacity: 1, y: 0, ease: "power3.out"})
        .to("#subtitle", {duration: 1, opacity: 1, y: 0, ease: "power2.out"}, "-=0.7")
        .to("#photo1", {duration: 1.2, opacity: 1, scale: 1, ease: "back.out(1.7)"}, "-=0.5")
        .to("#plus", {duration: 0.6, opacity: 1, scale: 1, ease: "power2.out"}, "-=0.4")
        .to("#photo2", {duration: 1.2, opacity: 1, scale: 1, ease: "back.out(1.7)"}, "-=0.7")
        .to("#exploreBtn", {duration: 0.8, opacity: 1, y: 0, ease: "power2.out"}, "-=0.3")
        .to("#teluguWish", {duration: 1, opacity: 1, scale: 1, ease: "elastic.out(1, 0.5)"}, "-=0.2");

    // Timeline animations on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%", // Adjusted for better mobile visibility
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Quotes section animation
    gsap.from("#quotes-section .quote", {
        opacity: 0,
        y: 30, // Reduced for smoother mobile animation
        stagger: 0.3,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#quotes-section",
            start: "top 85%", // Adjusted for better mobile visibility
            toggleActions: "play none none none"
        }
    });
    
    // Anniversary countdown animation
    gsap.from(".countdown-item", {
        opacity: 0,
        scale: 0.5,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: "#countdown-section",
            start: "top 85%", // Adjusted for better mobile visibility
            toggleActions: "play none none none"
        }
    });
    
    // Milestone cards animation
    gsap.from(".milestone-card", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".milestone-card",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
}

// Initialize Anniversary Animation
function initAnniversaryAnimation() {
    const animationTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".anniversary-animation-container",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });
    
    // Heart animation
    animationTimeline
        .to("#animation-heart", {
            opacity: 1,
            scale: 1.2,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
        })
        .to("#animation-heart", {
            scale: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5")
        // Rings animation
        .to(".ring-animation", {
            opacity: 0.8,
            scale: 1.2,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        // Text animation
        .to("#animation-text", {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5")
        // Continuous animations
        .to("#animation-heart", {
            scale: 1.1,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "power1.inOut"
        }, "+=0.5")
        .to(".ring-animation", {
            scale: 1.1,
            opacity: 0.6,
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
        }, "<");
}

// Create particles for anniversary animation
function createParticles() {
    const particlesContainer = document.getElementById('animation-particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 30; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4; // 4-12px
    
    // Randomly choose particle type
    const particleType = Math.random() > 0.7 ? 'star' : (Math.random() > 0.5 ? 'heart' : 'circle');
    
    particle.className = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    if (particleType === 'star') {
        particle.innerHTML = '<i class="fas fa-star text-yellow-400"></i>';
        particle.style.fontSize = `${size}px`;
    } else if (particleType === 'heart') {
        particle.innerHTML = '<i class="fas fa-heart text-pink-400"></i>';
        particle.style.fontSize = `${size}px`;
    } else {
        particle.style.backgroundColor = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.8)`;
        particle.style.borderRadius = '50%';
    }
    
    // Position randomly within container
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    container.appendChild(particle);
    
    // Animate the particle
    gsap.to(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Handle mobile-specific adjustments
function handleMobileAdjustments() {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Adjust font sizes for better mobile readability
        document.querySelectorAll('.font-script').forEach(el => {
            if (el.classList.contains('text-5xl') || el.classList.contains('text-6xl')) {
                el.classList.remove('text-5xl', 'text-6xl');
                el.classList.add('text-4xl');
            }
        });
        
        // Adjust spacing for mobile
        document.querySelectorAll('section').forEach(section => {
            if (section.classList.contains('py-20')) {
                section.classList.remove('py-20');
                section.classList.add('py-12');
            }
        });
        
        // Make timeline items more compact on mobile
        document.querySelectorAll('.timeline-item').forEach(item => {
            const contentDiv = item.querySelector('.p-6');
            if (contentDiv) {
                contentDiv.classList.remove('p-6');
                contentDiv.classList.add('p-4');
            }
        });
        
        // Adjust card heights for better mobile display
        document.querySelectorAll('.reveal-card').forEach(card => {
            if (card.classList.contains('h-32')) {
                card.style.height = '100px';
            }
        });
    }
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', function() {
        // Refresh animations and layouts after orientation change
        setTimeout(() => {
            ScrollTrigger.refresh();
            adjustCountdownSize();
        }, 200);
    });
    
    // Initial call to adjust countdown size
    adjustCountdownSize();
}

// Adjust countdown size based on screen width
function adjustCountdownSize() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    if (countdownItems.length === 0) return;
    
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 380;
    
    countdownItems.forEach(item => {
        // Adjust number size
        const numberEl = item.querySelector('.text-4xl, .text-5xl, .text-6xl');
        if (numberEl) {
            numberEl.classList.remove('text-4xl', 'text-5xl', 'text-6xl');
            if (isSmallMobile) {
                numberEl.classList.add('text-3xl');
            } else if (isMobile) {
                numberEl.classList.add('text-4xl');
            } else {
                numberEl.classList.add('text-5xl');
            }
        }
        
        // Adjust label size
        const labelEl = item.querySelector('.text-sm, .text-xs');
        if (labelEl) {
            labelEl.classList.remove('text-sm', 'text-xs');
            labelEl.classList.add(isSmallMobile ? 'text-xs' : 'text-sm');
        }
    });
}

// Scroll to next section
function scrollToNext() {
    document.getElementById('timeline').scrollIntoView({
        behavior: 'smooth'
    });
}

// Card flip functionality
function flipCard(card) {
    const cardFlip = card.querySelector('.card-flip');
    cardFlip.classList.toggle('flipped');
}

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.className = 'fixed text-pink-400 text-sm pointer-events-none z-50';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heart.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.animation = 'float-up linear forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Initialize countdown timer
function initCountdown() {
    // Set the anniversary date to June 24, 2025
    const anniversaryDate = new Date('June 24, 2025 00:00:00');
    // Note: Using specific date instead of calculating next anniversary
    
    function updateCountdown() {
        const currentDate = new Date();
        const difference = anniversaryDate - currentDate;
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check
}

// Image gallery modal functionality
function openModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    
    modalImg.src = imageSrc;
    modal.classList.remove('hidden');
    
    gsap.from(modalImg, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out"
    });
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.add('hidden');
}
