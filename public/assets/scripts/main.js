document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-switcher');
    
    const translations = {
        'en': translationsEN,
        'es': translationsES
    };
    
    let currentLang = localStorage.getItem('lang') || 'en';
    
    setLanguage(currentLang);

    if (languageSelector) {
        languageSelector.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'es' : 'en';
            setLanguage(newLang);
            currentLang = newLang;
            localStorage.setItem('lang', currentLang);
            updateButtonState(newLang);
        });
    }

    function setLanguage(lang) {
        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const keys = key.split('.');
            let translatedText = t;
            keys.forEach(k => {
                if (translatedText) {
                    translatedText = translatedText[k];
                }
            });

            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            const keys = key.split('.');
            let translatedText = t;
            keys.forEach(k => {
                if (translatedText) {
                    translatedText = translatedText[k];
                }
            });

            if (translatedText) {
                element.placeholder = translatedText;
            }
        });
    }

    function updateButtonState(lang) {
        const langLabel = document.getElementById('lang-label');
        if (langLabel) {
            langLabel.textContent = lang.toUpperCase();
        }
    }

    updateButtonState(currentLang);


    let menuBtn = document.querySelector('#menu-btn');
    let menuWrapper = document.querySelector('.header .menu-wrapper');
    
    if (menuBtn && menuWrapper) {
        menuBtn.onclick = () => {
            menuWrapper.classList.toggle('active');
        };
    }

    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.onscroll = () => {
        if (menuWrapper) {
            menuWrapper.classList.remove('active');
        }
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    };

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const toggleButtons = document.querySelectorAll('.plan-toggle .toggle-btn');
    const monthlyElements = document.querySelectorAll('.monthly-price, .plan-card .price .monthly-price span, .plan-card .features h4');
    const annuallyElements = document.querySelectorAll('.annually-price, .annual-save, .plan-card .price .annually-price span');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedPlan = button.dataset.plan;

            if (selectedPlan === 'monthly') {
                monthlyElements.forEach(el => el.style.display = 'block');
                annuallyElements.forEach(el => el.style.display = 'none');
            } else if (selectedPlan === 'annually') {
                monthlyElements.forEach(el => el.style.display = 'none');
                annuallyElements.forEach(el => el.style.display = 'block');
            }
        });
    });

    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-title');

        title.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });
});