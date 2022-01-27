const i18Obj = {
    'en': {
        'skills': 'Skills',
        'portfolio': 'Portfolio',
        'video': 'Video',
        'price': 'Price',
        'contacts': 'Contacts',
        'hero-title': 'Alexa Rise',
        'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
        'hire': 'Hire me',
        'skill-title-1': 'Digital photography',
        'skill-text-1': 'High-quality photos in the studio and on the nature',
        'skill-title-2': 'Video shooting',
        'skill-text-2': 'Capture your moments so that they always stay with you',
        'skill-title-3': 'Rotouch',
        'skill-text-3': 'I strive to make photography surpass reality',
        'skill-title-4': 'Audio',
        'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
        'winter': 'Winter',
        'spring': 'Spring',
        'summer': 'Summer',
        'autumn': 'Autumn',
        'price-description-1-span-1': 'One location',
        'price-description-1-span-2': '120 photos in color',
        'price-description-1-span-3': '12 photos in retouch',
        'price-description-1-span-4': 'Readiness 2-3 weeks',
        'price-description-1-span-5': 'Make up, visage',
        'price-description-2-span-1': 'One or two locations',
        'price-description-2-span-2': '200 photos in color',
        'price-description-2-span-3': '20 photos in retouch',
        'price-description-2-span-4': 'Readiness 1-2 weeks',
        'price-description-2-span-5': 'Make up, visage',
        'price-description-3-span-1': 'Three locations or more',
        'price-description-3-span-2': '300 photos in color',
        'price-description-3-span-3': '50 photos in retouch',
        'price-description-3-span-4': 'Readiness 1 week',
        'price-description-3-span-5': 'Make up, visage, hairstyle',
        'order': 'Order shooting',
        'contact-me': 'Contact me',
        'send-message': 'Send message'
    },
    'ru': {
        'skills': 'Навыки',
        'portfolio': 'Портфолио',
        'video': 'Видео',
        'price': 'Цены',
        'contacts': 'Контакты',
        'hero-title': 'Алекса Райс',
        'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
        'hire': 'Пригласить',
        'skill-title-1': 'Фотография',
        'skill-text-1': 'Высококачественные фото в студии и на природе',
        'skill-title-2': 'Видеосъемка',
        'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
        'skill-title-3': 'Ретушь',
        'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
        'skill-title-4': 'Звук',
        'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
        'winter': 'Зима',
        'spring': 'Весна',
        'summer': 'Лето',
        'autumn': 'Осень',
        'price-description-1-span-1': 'Одна локация',
        'price-description-1-span-2': '120 цветных фото',
        'price-description-1-span-3': '12 отретушированных фото',
        'price-description-1-span-4': 'Готовность через 2-3 недели',
        'price-description-1-span-5': 'Макияж, визаж',
        'price-description-2-span-1': 'Одна-две локации',
        'price-description-2-span-2': '200 цветных фото',
        'price-description-2-span-3': '20 отретушированных фото',
        'price-description-2-span-4': 'Готовность через 1-2 недели',
        'price-description-2-span-5': 'Макияж, визаж',
        'price-description-3-span-1': 'Три локации и больше',
        'price-description-3-span-2': '300 цветных фото',
        'price-description-3-span-3': '50 отретушированных фото',
        'price-description-3-span-4': 'Готовность через 1 неделю',
        'price-description-3-span-5': 'Макияж, визаж, прическа',
        'order': 'Заказать съемку',
        'contact-me': 'Свяжитесь со мной',
        'send-message': 'Отправить'
    }
}

let theme = 0;
let language = 'en';

function loadLocalData() {
    if(localStorage.getItem('language')) {
        translate(localStorage.getItem('language'));
    } else {
        localStorage.setItem('language', 'en');
    }

    if(localStorage.getItem('theme')) {
        theme = Number(localStorage.getItem('theme'));
        changeTheme();
        changeTheme();
    } else {
        localStorage.setItem('theme', theme);
    }
}
window.addEventListener('load', loadLocalData)



const objectsToTranslate = document.body.querySelectorAll('[data-i18]');
const translate = (lang) => {
    objectsToTranslate.forEach(obj => {
        obj.innerHTML = i18Obj[lang][obj.getAttribute('data-i18')];
    });
    localStorage.setItem('language', lang);
};
const changeLangButton = document.querySelector('.button-language');
const changeLangButtons = document.querySelectorAll('.button-language__lang');

if (localStorage.getItem('language') === 'en')
    changeLangButtons[0].classList.add('button-language_active')
else
    changeLangButtons[1].classList.add('button-language_active')

changeLangButton.addEventListener('click', (event) => { 
    if (event.target.className === 'button-language__lang') {
        changeLangButtons.forEach(button => button.classList.remove('button-language_active'));
        event.target.classList.add('button-language_active');
        translate(event.target.textContent);
    }
});


const themeButton = document.querySelector('.header__theme');
const themeButtonSvg = document.querySelector('.header__theme use');
const headerBackground = document.querySelector('.header .container');
const heroBackground = document.querySelector('.hero .container');
const contactsBackground = document.querySelector('.contacts .container');
const buttons = document.querySelectorAll('.button');

/*----------------------- hamburger button --------------------------*/
const hamburgerButton = document.querySelector('.hamburger-button');
const navMenu = document.querySelector('.header-nav');

const hamburgerToggle = () => {
    hamburgerButton.classList.toggle('open');
    navMenu.classList.toggle('open');
};

hamburgerButton.addEventListener('click', hamburgerToggle);
navMenu.addEventListener('click', (event) => { 
    if (event.target.className === 'header-nav__link')
        hamburgerToggle();
});
/*------------------------- theme change ----------------------------*/
const changeTheme = (event) => {
    if (theme === 0) {
        document.body.classList.add('light-theme');
        headerBackground.classList.add('light-theme');
        heroBackground.classList.add('light-theme');
        contactsBackground.classList.add('light-theme');
        document.documentElement.style.setProperty('--text-color', '#000000');
        buttons.forEach(button => { 
            button.classList.add('light-theme');
        });
        themeButtonSvg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "assets/svg/icons.svg#dark-theme");
        theme = 1;
        localStorage.setItem('theme', theme);
    } else {
        document.body.classList.remove('light-theme');
        headerBackground.classList.remove('light-theme');
        heroBackground.classList.remove('light-theme');
        contactsBackground.classList.remove('light-theme');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        buttons.forEach(button => { 
            button.classList.remove('light-theme');
        });
        themeButtonSvg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "assets/svg/icons.svg#light-theme");
        theme = 0;
        localStorage.setItem('theme', theme);
    }
};

themeButton.addEventListener('click', (event) => changeTheme(event));



/*---------------------- portfolio section --------------------------*/
const portfolioButtons = document.querySelectorAll('.portfolio__button');
const portfolioButtonsContainer = document.querySelector('.portfolio__buttons');
const portfolioImages = document.querySelectorAll('.portfolio__image');

portfolioButtonsContainer.addEventListener('click', (event) => { 
    if (event.target.classList.contains('portfolio__button')) {
        if (!event.target.classList.contains('button_active')) {
            portfolioButtons.forEach(button => button.classList.remove('button_active'));
            event.target.classList.add('button_active');
            const season = event.target.dataset.season;
            portfolioImages.forEach((image, i) => image.src = `assets/img/${season}/${i + 1}.jpg`);
        }
    }
});

const preloadImages = () => {
    ['winter', 'spring', 'summer', 'autumn'].forEach(season => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
        }
    });
};

preloadImages();
/*-------------------------------------------------------------------*/





// console.log(`Самопроверка
// `);