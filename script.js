// Language switching functionality
let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-pt').classList.toggle('active', lang === 'pt');
    
    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-en][data-pt]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Store language preference
    localStorage.setItem('ecoessence-language', lang);
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('ecoessence-language') || 'en';
    switchLanguage(savedLanguage);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Product tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCategories = document.querySelectorAll('.product-category');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            productCategories.forEach(cat => {
                if (cat.id === category) {
                    cat.classList.add('active');
                } else {
                    cat.classList.remove('active');
                }
            });
        });
    });
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards and value cards
    const animatedElements = document.querySelectorAll('.product-card, .value-card, .feature-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Mobile menu toggle (for future implementation)
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.style.cursor = 'pointer';
        navBrand.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add throttled parallax effect to hero section
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero && scrolled < 500) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Product card hover effects enhancement
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid var(--secondary-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });

    // Customization process functionality
    const customizationProcess = document.getElementById('customization-process');
    const startCustomizingButtons = document.querySelectorAll('.customization-prompt .cta-button');
    const steps = customizationProcess.querySelectorAll('.step');
    const optionCards = customizationProcess.querySelectorAll('.option-card');
    const summaryText = document.getElementById('summary-text');

    let currentStep = 1;
    let userChoices = {};

    startCustomizingButtons.forEach(button => {
        button.addEventListener('click', () => {
            customizationProcess.style.display = 'block';
            showStep(1);
        });
    });

    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const choice = card.dataset.choice;
            userChoices[`step${currentStep}`] = choice;

            const currentOptions = steps[currentStep - 1].querySelectorAll('.option-card');
            currentOptions.forEach(opt => opt.classList.remove('selected'));
            card.classList.add('selected');

            if (currentStep < 3) {
                currentStep++;
                showStep(currentStep);
            } else {
                updateSummary();
            }
        });
    });

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        currentStep = stepNumber;
    }

    function updateSummary() {
        const summaryPrefix = summaryText.getAttribute(`data-${currentLanguage}`);
        summaryText.textContent = `${summaryPrefix}${userChoices.step1}, ${userChoices.step2}, ${userChoices.step3}`;
    }
    
    // Console message
    console.log('%c🌿 EcoEssence by Google Nanobanana', 'font-size: 20px; color: #2d5016; font-weight: bold;');
    console.log('%cCustom natural cosmetics with sustainable packaging', 'font-size: 14px; color: #6b8e23;');
});

// Prevent default behavior for social links (since they're placeholders)
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const message = currentLanguage === 'en' 
            ? 'Social media links coming soon!' 
            : 'Links de redes sociais em breve!';
        alert(message);
    });
});
