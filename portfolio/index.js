let theme = (document.body.classList.contains('light-theme')) ? 1 : 0;
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