document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page with all features
    initProductsPage();
    initParticleBackground();
    setupUnavailableProducts();
    setupProductAnimations();
    addWhatsAppButtons(); // New function for WhatsApp buttons
});

function addWhatsAppButtons() {
    const phoneNumber = '0790186940';
    const whatsappMessage = 'Hello Ofinity Tech, I have a question about your products!';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Create WhatsApp button for each product card
    document.querySelectorAll('.product-card[data-available="false"]').forEach(card => {
        const whatsappBtn = document.createElement('button');
        whatsappBtn.className = 'whatsapp-btn';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Contact via WhatsApp';
        whatsappBtn.onclick = () => window.open(whatsappUrl, '_blank');
        
        // Style the button to match your theme
        whatsappBtn.style.marginTop = '10px';
        whatsappBtn.style.background = 'linear-gradient(45deg, #25D366, #128C7E)';
        whatsappBtn.style.color = 'white';
        whatsappBtn.style.padding = '0.8rem 1.5rem';
        whatsappBtn.style.border = 'none';
        whatsappBtn.style.borderRadius = '25px';
        whatsappBtn.style.cursor = 'pointer';
        whatsappBtn.style.transition = 'all 0.3s';
        whatsappBtn.style.display = 'inline-flex';
        whatsappBtn.style.alignItems = 'center';
        whatsappBtn.style.justifyContent = 'center';
        whatsappBtn.style.gap = '0.5rem';
        whatsappBtn.style.fontWeight = '600';
        whatsappBtn.style.textDecoration = 'none';
        whatsappBtn.style.width = '100%';
        
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.transform = 'translateY(-2px)';
            whatsappBtn.style.boxShadow = '0 5px 15px rgba(37, 211, 102, 0.3)';
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.transform = '';
            whatsappBtn.style.boxShadow = '';
        });
        
        // Insert the WhatsApp button after the Instagram button
        const orderBtn = card.querySelector('.order-btn');
        orderBtn.insertAdjacentElement('afterend', whatsappBtn);
    });
}

function initProductsPage() {
    console.log('Products page initialized');
    
    // Set up scroll to top button
    setupBackToTopButton();
    
    // Add any other global product page initializations
}

function setupUnavailableProducts() {
    // Cache DOM elements
    const unavailableProducts = document.querySelectorAll('[data-available="false"]');
    
    // Disable interaction for unavailable products
    unavailableProducts.forEach(product => {
        const button = product.querySelector('.order-btn');
        
        // Remove existing click handlers
        button.onclick = null;
        
        // Add proper disabled behavior
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showUnavailableToast();
            return false;
        });
        
        // Add ARIA attributes for accessibility
        button.setAttribute('aria-disabled', 'true');
        product.setAttribute('aria-live', 'polite');
    });
}

function setupProductAnimations() {
    // Add hover effects programmatically
    addHoverEffects();
    
    // Initialize scroll animations
    initScrollAnimations();
}

function showUnavailableToast() {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'product-toast';
    toast.textContent = 'This product is currently unavailable';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(255, 0, 204, 0.9)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '25px';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.animation = 'fadeInOut 2.5s ease-in-out';
    
    document.body.appendChild(toast);
    
    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

function addHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.dataset.available === 'true') {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 10px 25px rgba(0, 191, 255, 0.2)';
                card.style.borderColor = 'var(--secondary-accent)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = 'rgba(0, 191, 255, 0.3)';
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function initParticleBackground() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.5';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Set canvas dimensions
    resizeCanvas(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = createParticles(canvas);
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateAndDrawParticles(canvas, ctx, particles);
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas(canvas);
        repositionParticles(canvas, particles);
    });
}

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles(canvas) {
    const config = {
        particleCount: 80,
        particleColor: 'rgba(0, 191, 255, 0.5)',
        lineColor: 'rgba(0, 255, 255, 0.2)',
        lineDistance: 120,
        particleSize: 2,
        particleSpeed: 0.3
    };
    
    return Array.from({ length: config.particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.particleSpeed,
        vy: (Math.random() - 0.5) * config.particleSpeed
    }));
}

function updateAndDrawParticles(canvas, ctx, particles) {
    const config = {
        lineColor: 'rgba(0, 255, 255, 0.2)',
        lineDistance: 120,
        particleSize: 2
    };
    
    particles.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, config.particleSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 191, 255, 0.5)';
        ctx.fill();
        
        // Draw connections
        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < config.lineDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = config.lineColor;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });
}

function repositionParticles(canvas, particles) {
    particles.forEach(p => {
        p.x = Math.min(p.x, canvas.width);
        p.y = Math.min(p.y, canvas.height);
    });
}

function setupBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--button-bg);
        color: var(--primary-dark);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s;
        z-index: 999;
        border: none;
        font-size: 1.2rem;
    }
    
    .back-to-top:hover {
        background: var(--button-hover);
        transform: scale(1.1);
    }
    
    .back-to-top.visible {
        opacity: 1;
    }
`;
document.head.appendChild(style);