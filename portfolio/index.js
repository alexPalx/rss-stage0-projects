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