const STORAGE_KEY = 'ecommerce_products';
// يمكنك استبدال المصفوفة التالية بكود المنتجات الذي تنسخه من صفحة الإدارة
const defaultProducts = [
  {
    "id": "1774699829050",
    "name": "الخطة 1",
    "description": "برمجه بسيطه لي مشروع  لا يحتاج قاعدة بيانات ",
    "price": "50",
    "image": "product.png"
  },
  {
    "id": "1774699862089",
    "name": "الخطة 2",
    "description": "برمجه بي قاعدة بيانات و افضل بي مراحل و مناسبه لي متجر الاكتروني",
    "price": "300",
    "image": "product.png"
  }
];

function getProducts() {
    const list = localStorage.getItem(STORAGE_KEY);
    const localProds = list ? JSON.parse(list) : [];
    
    // لدمج المنتجات الثابتة مع منتجات المتصفح (مع منع التكرار بناء على المعرف)
    const all = [...defaultProducts, ...localProds];
    const uniqueIds = new Set();
    return all.filter(p => {
        if (!uniqueIds.has(p.id)) {
            uniqueIds.add(p.id);
            return true;
        }
        return false;
    });
}

// دالة لعرض المنتجات في الصفحة الرئيسية (index.html)
function renderProducts() {
    const container = document.getElementById('products-container');
    const emptyMsg = document.getElementById('no-products-msg');
    
    if (!container) return; 

    container.innerHTML = '';
    const products = getProducts();

    // التحقق من وجود منتجات لعرضها
    if (products.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        
        products.forEach((product, index) => {
            const card = document.createElement('div');
            // Adding fade-in class and a slight delay stagger based on index
            card.className = 'product-card fade-in';
            card.style.transitionDelay = `${index * 0.1}s`;
            
            
            // إضافة البيانات لكل منتج
            const displayImg = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop';
            
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${displayImg}" alt="${product.name}" class="product-image">
                    <div class="product-image-text">${product.name}</div>
                </div>
                <div class="product-info">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-desc" style="color: var(--text-secondary); margin-bottom: 15px; font-size: 0.95rem; line-height: 1.5;">${product.description || ''}</p>
                    <div class="product-price" style="margin-bottom: 15px;">$${Number(product.price).toFixed(2)}</div>
                    <a href="https://www.instagram.com/x.9.x.1" target="_blank" class="btn-primary buy-btn" style="display: block; text-align: center; border-radius: 8px;">وكيل الشراء</a>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
}

// تشغيل العرض عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تفعيل قائمة الهمبرجر
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    if(menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    renderProducts();

    // تشغيل الأنيميشن عند النزول (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // لتشغيلها مرة واحدة فقط
            }
        });
    }, {
        threshold: 0.1
    });

    // مراقبة كل العناصر التي تمتلك كلاس fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- إعداد وضع الألوان (الليلي/النهاري) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // فحص الوضع المحفوظ مسبقاً
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }

        // عند الضغط لتغيير الوضع
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '🌙';
            }
        });
    }

    // --- إعداد خلفية الجزيئات التفاعلية (Particles.js) ---
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#6c5ce7" }, /* يتناسب مع الليلي والنهاري */
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c5ce7",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // --- آراء العملاء ---
    const REVIEWS_KEY = 'ecommerce_reviews';
    const defaultReviews = [];

    function getReviews() {
        const list = localStorage.getItem(REVIEWS_KEY);
        return list ? JSON.parse(list) : [];
    }

    function renderReviews() {
        const wrapper = document.getElementById('marquee-wrapper');
        if (!wrapper) return;
        
        const allReviews = [...defaultReviews, ...getReviews()];
        if (allReviews.length === 0) {
            wrapper.innerHTML = '<p style="text-align: center; color: var(--text-secondary); width: 100%;">لا توجد تقييمات حتى الآن. كن أول من يضيف تقييمه!</p>';
            let formTitle = document.querySelector('.review-form-container h3');
            if(formTitle && document.documentElement.lang === 'en') {
                wrapper.innerHTML = '<p style="text-align: center; color: var(--text-secondary); width: 100%;">No reviews yet. Be the first to add a review!</p>';
            }
            return;
        }

        let cardsHTML = '';
        allReviews.forEach(r => {
            const initial = r.name.charAt(0).toUpperCase();
            const starsHTML = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            cardsHTML += `
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-avatar">${initial}</div>
                        <div class="reviewer-info">
                            <h4>${r.name}</h4>
                            <div class="stars">${starsHTML}</div>
                        </div>
                    </div>
                    <p>"${r.msg}"</p>
                </div>
            `;
        });
        
        wrapper.innerHTML = `
            <div class="marquee-content" dir="rtl">${cardsHTML}</div>
            <div class="marquee-content" dir="rtl">${cardsHTML}</div>
        `;
    }

    renderReviews();

    // منطق تقييم النجوم
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('reviewer-rating');
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const val = this.getAttribute('data-value');
                ratingInput.value = val;
                stars.forEach(s => {
                    if (parseInt(s.getAttribute('data-value')) <= parseInt(val)) {
                        s.style.color = '#f1c40f'; // مفعل
                    } else {
                        s.style.color = 'var(--text-secondary)'; // غير مفعل
                    }
                });
            });
        });
    }

    // إرسال نموذج التقييم
    const reviewForm = document.getElementById('add-review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewer-name').value;
            const msg = document.getElementById('reviewer-msg').value;
            const rating = parseInt(document.getElementById('reviewer-rating').value);
            
            const reviews = getReviews();
            reviews.push({ name, rating, msg });
            localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
            
            reviewForm.reset();
            // Reset stars to 5 visually
            stars.forEach(s => s.style.color = '#f1c40f');
            ratingInput.value = 5;
            
            renderReviews();
            alert('شكراً لك على تقييمك وثقتك بنا!');
        });
    }

    // --- دعم اللغتين (عربي / إنجليزي) ---
    const langToggle = document.getElementById('lang-toggle');
    const translations = {
        ar: {
            "logo": "برمج موقعك",
            "nav_home": "الرئيسية",
            "nav_agents": "وكلاء الشراء",
            "nav_testi": "آراء العملاء",
            "nav_support": "الدعم الفني",
            "hero_h1": "أهلاً بك في منصة برمج موقعك",
            "hero_p": "اكتشف أفضل الخدمات والبرمجيات الخاصة بتطوير مواقع الويب",
            "title_services": "أحدث الخدمات",
            "title_reviews": "ماذا يقول عملاؤنا؟",
            "no_services": "لا توجد خدمات متاحة حالياً.",
            "buy_btn": "وكيل الشراء",
            "form_title": "أضف تقييمك",
            "lbl_name": "اسمك الكريم",
            "input_name": "أدخل اسمك",
            "lbl_rating": "تقييمك",
            "lbl_msg": "رسالتك / تقييمك",
            "input_msg": "اكتب ما في خاطرك...",
            "btn_submit": "إرسال التقييم",
            "footer_rights": "جميع الحقوق محفوظة من متجر البرمجة © 2026",
            "lbl_trust1": "أمان وموثوقية 100%",
            "lbl_trust2": "سرعة في التنفيذ",
            "lbl_trust3": "جودة متفوقة",
            "support_title": "الدعم الفني المباشر",
            "support_p": "نحن هنا لخدمتك والإجابة على كافة استفساراتك وحل أي مشكلة فنية قد تواجهك، تواصل معنا بأي وقت.",
            "btn_whatsapp": "تواصل عبر واتساب",
            "agents_title": "طريقة الشراء والوكلاء",
            "agents_p": "يمكنك إتمام عملية الشراء بكل سهولة وموثوقية عبر التواصل مع وكلائنا المعتمدين على الانستقرام. نحن نضمن لك عملية شراء آمنة وسريعة!",
            "btn_instagram": "تواصل مع وكيل الشراء",
            "reviews_title": "آراء العملاء",
            "reviews_p": "تعرف على تجارب عملائنا السابقين وشاركنا تجربتك الخاصة."
        },
        en: {
            "logo": "Program Your Site",
            "nav_home": "Home",
            "nav_agents": "Agents",
            "nav_testi": "Reviews",
            "nav_support": "Support",
            "hero_h1": "Welcome to Program Your Site Platform",
            "hero_p": "Discover the best web development services and software",
            "title_services": "Latest Services",
            "title_reviews": "What Our Clients Say?",
            "no_services": "No services available currently.",
            "buy_btn": "Purchase Agent",
            "form_title": "Add Your Review",
            "lbl_name": "Your Name",
            "input_name": "Enter your name",
            "lbl_rating": "Your Rating",
            "lbl_msg": "Your Message / Review",
            "input_msg": "Write what's on your mind...",
            "btn_submit": "Submit Review",
            "footer_rights": "All rights reserved to Programming Store © 2026",
            "lbl_trust1": "100% Security & Reliability",
            "lbl_trust2": "Fast Execution",
            "lbl_trust3": "Superior Quality",
            "support_title": "Live Technical Support",
            "support_p": "We are here to serve you, answer all your inquiries, and solve any technical problems you may face.",
            "btn_whatsapp": "Contact via WhatsApp",
            "agents_title": "Purchasing Method & Agents",
            "agents_p": "You can complete the purchase easily and reliably by contacting our certified Instagram agents. Safe and fast!",
            "btn_instagram": "Contact Purchasing Agent",
            "reviews_title": "Customer Reviews",
            "reviews_p": "Discover the experiences of our past customers and share your own experience."
        }
    };

    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        document.body.style.direction = lang === 'en' ? 'ltr' : 'rtl';
        
        const t = translations[lang];
        
        // Helper to safely set innerHTML/text
        const setTxt = (selector, txt) => {
            const els = document.querySelectorAll(selector);
            els.forEach(el => el.innerHTML = txt); // Not the most efficient but works nicely
        };
        const setPlaceholder = (selector, txt) => {
            const els = document.querySelectorAll(selector);
            els.forEach(el => el.placeholder = txt);
        };
        
        // Navigation Options
        setTxt('.logo', t.logo);
        const navLinks = document.querySelectorAll('.nav-links a');
        if(navLinks.length > 0) navLinks[0].innerText = t.nav_home;
        if(navLinks.length > 1) navLinks[1].innerText = t.nav_agents;
        if(navLinks.length > 2) navLinks[2].innerText = t.nav_testi;
        if(navLinks.length > 3) navLinks[3].innerText = t.nav_support;
        
        // Index Content
        setTxt('.hero-content h1', t.hero_h1);
        setTxt('.hero-content p', t.hero_p);
        const sectionTitles = document.querySelectorAll('.page-title');
        if(sectionTitles.length > 0 && sectionTitles[0].innerText.includes('الخدمات') || sectionTitles.length > 0 && sectionTitles[0].innerText.includes('Services')) sectionTitles[0].innerText = t.title_services;
        
        setTxt('#no-products-msg', t.no_services);
        setTxt('.buy-btn', t.buy_btn);
        
        // Trust Badges
        const trustItems = document.querySelectorAll('.trust-item');
        if(trustItems.length >= 3) {
            trustItems[0].innerHTML = `<div class="trust-icon">🔒</div> ${t.lbl_trust1}`;
            trustItems[1].innerHTML = `<div class="trust-icon">⚡</div> ${t.lbl_trust2}`;
            trustItems[2].innerHTML = `<div class="trust-icon">💎</div> ${t.lbl_trust3}`;
        }
        
        // Reviews Section
        const testTitle = document.querySelector('.testimonials-section h2');
        if(testTitle) testTitle.innerText = t.title_reviews;
        
        // Form
        const formTitle = document.querySelector('.review-form-container h3');
        if(formTitle) formTitle.innerText = t.form_title;
        const labels = document.querySelectorAll('.input-group label');
        if(labels.length >= 3) {
            labels[0].innerText = t.lbl_name;
            labels[1].innerText = t.lbl_rating;
            labels[2].innerText = t.lbl_msg;
        }
        setPlaceholder('#reviewer-name', t.input_name);
        setPlaceholder('#reviewer-msg', t.input_msg);
        const btnSubmit = document.querySelector('#add-review-form .btn-primary');
        if(btnSubmit) btnSubmit.innerText = t.btn_submit;
        
        // Footer
        const footerRights = document.querySelector('.footer-bottom p');
        if(footerRights) footerRights.innerText = t.footer_rights;

        // Support, Agents & Reviews specific
        const pageTitles = document.querySelectorAll('.container .page-title');
        pageTitles.forEach(title => {
            if(title.innerText.includes('الدعم') || title.innerText.includes('Support')) title.innerText = t.support_title;
            if(title.innerText.includes('الشراء') || title.innerText.includes('Purchasing')) title.innerText = t.agents_title;
            if(title.innerText.includes('آراء') || title.innerText.includes('Reviews')) title.innerText = t.reviews_title;
        });
        const containerPs = document.querySelectorAll('.container > p');
        containerPs.forEach(p => {
            if(p.innerText.includes('نحن هنا') || p.innerText.includes('We are here')) p.innerText = t.support_p;
            if(p.innerText.includes('عملية الشراء') || p.innerText.includes('completing the purchase')) p.innerText = t.agents_p;
            if(p.innerText.includes('تجارب') || p.innerText.includes('experiences')) p.innerText = t.reviews_p;
        });
        
        const waBtn = document.querySelector('.btn-whatsapp');
        if(waBtn) waBtn.innerHTML = waBtn.innerHTML.replace(/(تواصل عبر واتساب|Contact via WhatsApp)/g, t.btn_whatsapp);
        const instaBtn = document.querySelector('.btn-instagram');
        if(instaBtn) instaBtn.innerHTML = instaBtn.innerHTML.replace(/(تواصل مع وكيل الشراء|Contact Purchasing Agent)/g, t.btn_instagram);
        
        langToggle.innerText = lang === 'en' ? '🇱🇾' : '🇺🇸';
    }

    if (langToggle) {
        const savedLang = localStorage.getItem('lang') || 'ar';
        applyLanguage(savedLang);
        
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('lang', newLang);
            applyLanguage(newLang);
        });
    }

    // --- تأثير تتبع الماوس المميز ---
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let followerX = mouseX, followerY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });

    function animateFollower() {
        // حركة انسيابية مرنة
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

});
