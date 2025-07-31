// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.classList.add('loaded');
    }, 1500);
    
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        hamburgerIcon.classList.toggle('open');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerIcon.classList.remove('open');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Set active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Sticky header
        const header = document.getElementById('header');
        if (window.pageYOffset > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        slides[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Project Slider
    const projectSlides = document.getElementById('projectSlides');
    const projectDots = document.querySelectorAll('.slider-dot');
    const projectPrev = document.getElementById('projectPrev');
    const projectNext = document.getElementById('projectNext');
    let currentProject = 0;
    
    function showProject(n) {
        projectSlides.style.transform = `translateX(-${n * 100}%)`;
        
        projectDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        projectDots[n].classList.add('active');
        currentProject = n;
    }
    
    projectDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showProject(index);
        });
    });
    
    projectPrev.addEventListener('click', () => {
        currentProject = (currentProject - 1 + projectDots.length) % projectDots.length;
        showProject(currentProject);
    });
    
    projectNext.addEventListener('click', () => {
        currentProject = (currentProject + 1) % projectDots.length;
        showProject(currentProject);
    });
    
    // Auto-advance project slides every 7 seconds
    let projectInterval = setInterval(() => {
        currentProject = (currentProject + 1) % projectDots.length;
        showProject(currentProject);
    }, 7000);
    
    // Pause interval on hover
    const projectSlider = document.querySelector('.project-slider');
    
    projectSlider.addEventListener('mouseenter', () => {
        clearInterval(projectInterval);
    });
    
    projectSlider.addEventListener('mouseleave', () => {
        projectInterval = setInterval(() => {
            currentProject = (currentProject + 1) % projectDots.length;
            showProject(currentProject);
        }, 7000);
    });
    
    // Testimonial Slider
    const testimonialSlides = document.getElementById('testimonialSlides');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    let currentTestimonial = 0;
    
    function showTestimonial(n) {
        testimonialSlides.style.transform = `translateX(-${n * 100}%)`;
        
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialDots[n].classList.add('active');
        currentTestimonial = n;
    }
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialDots.length) % testimonialDots.length;
        showTestimonial(currentTestimonial);
    });
    
    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-advance testimonial slides every 5 seconds
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause interval on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // Mission-Vision Tabs
    const missionTabs = document.querySelectorAll('.mission-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    missionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            missionTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const toggle = item.querySelector('.faq-toggle i');
                toggle.className = 'fas fa-plus';
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                faqItem.classList.add('active');
                const toggle = question.querySelector('.faq-toggle i');
                toggle.className = 'fas fa-minus';
            }
        });
    });
    
    // Counter Animation
    function animateCounter() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 30);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when elements are in viewport
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => {
                        counter.innerText = '0';
                    });
                    animateCounter();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-stats, .stat-box, .experience-badge').forEach(section => {
        observer.observe(section);
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(function() {
                // Success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                `;
                
                // Reset form after some time (for demo purposes)
                setTimeout(function() {
                    contactForm.reset();
                    contactForm.innerHTML = contactForm.innerHTML;
                }, 5000);
            }, 2000);
        });
    }
    
    // Form input animation
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});