// ============================================
// GLOBAL VARIABLES
// ============================================
let currentImageIndex = 0;
let galleryImages = [];

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// GALLERY MANAGEMENT
// ============================================
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// GÜNCEL FOTOĞRAFLAR - GitHub'daki gerçek dosya isimleri
const photos = [
    { src: '3432b8c8-d76f-4b97-8b00-14e86b4e584a.jpg', caption: 'Anılarımız' },
    { src: '368901db-5129-40d6-a85f-a8c364dbdfb4.jpg', caption: 'Güzel Günler' },
    { src: '43c057b6-16ce-42ac-ac31-25a33460b103.jpg', caption: 'Birlikte' },
    { src: '534643bd-7bf6-4e2c-840f-3e0a7e156d4d.jpg', caption: 'Dostluk' },
    { src: '55aa105d-8991-4242-ba27-909a699d16b7.jpg', caption: 'Mutluluk' },
    { src: '55bda8bc-5601-4a98-8e99-e16f027292d.jpg', caption: 'Keyif' },
    { src: '7258c0c4-35b0-4670-bd4c-292bf1108731.jpg', caption: 'Sevgi' },
    { src: '7f635afb-86af-470d-87ee-b4441a8588c6.jpg', caption: 'Anlar' },
    { src: 'a1c37bfa-a9c6-40e8-9239-8d2328e15aad.jpg', caption: 'Paylaşım' },
    { src: 'ab5e763a-6cc6-4494-b753-20776adc2be81.jpg', caption: 'Beraber' },
    { src: 'b20e8b0d-76f1-4855-a658-29991ab5b9d2.jpg', caption: 'Kahkaha' },
    { src: 'ba229f5f-8816-447b-9e3c-2780da4ec5d7.jpg', caption: 'Eğlence' },
    { src: 'c450daaf-f3df-4d39-bd07-b449ed510ba9.jpg', caption: 'Buluşma' },
    { src: 'c8b4cade-3736-4337-8f46-45ec14fbf45a.jpg', caption: 'Hatıralar' },
    { src: 'd83a4ead-d519-442c-8664-a99cb93f0367.jpg', caption: 'Neşe' },
    { src: 'd9536d72-722a-45a0-ab21-078b76da2e8c.jpg', caption: 'Arkadaşlık' },
    { src: 'f34c439a-4ff3-4a0b-a63e-92ba54aaac22.jpg', caption: 'Gülümseme' },
];

// Load gallery images
function loadGallery() {
    galleryImages = photos;
    
    if (galleryImages.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-placeholder" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: var(--color-text-light);">
                    📸 Fotoğraflarınızı ekleyin.
                </p>
            </div>
        `;
        return;
    }
    
    galleryImages.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        galleryItem.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect width=%22400%22 height=%22400%22 fill=%22%23D4C5B9%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%238B7355%22>Fotoğraf ${index + 1}</text></svg>'">
            <div class="gallery-overlay">
                <span class="gallery-caption">${photo.caption}</span>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox image
function updateLightboxImage() {
    const photo = galleryImages[currentImageIndex];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.caption;
}

// Navigate to previous image
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

// Event listeners for lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', previousImage);
lightboxNext.addEventListener('click', nextImage);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
    });
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Lütfen adınızı girin';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Lütfen e-posta adresinizi girin';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Geçerli bir e-posta adresi girin';
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        document.getElementById('messageError').textContent = 'Lütfen mesajınızı girin';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Mesaj en az 10 karakter olmalıdır';
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        console.log('Form Data:', { name, email, subject, message });
        
        // Show success message
        formSuccess.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
function observeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load gallery
    loadGallery();
    
    // Initialize scroll animations
    observeElements();
    
    // Set initial active nav link
    updateActiveNavLink();
    
    console.log('Aile Web Sitesi yüklendi! 🎉');
    console.log('Toplam fotoğraf:', photos.length);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Get current year for footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// EASTER EGG (Optional Fun Feature)
// ============================================
let clickCount = 0;
const navBrand = document.querySelector('.nav-brand');

if (navBrand) {
    navBrand.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            alert('❤️ Bu web sitesi sevgiyle yapıldı! ❤️');
            clickCount = 0;
        }
    });
}
