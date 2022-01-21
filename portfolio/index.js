const hamburgerButton = document.querySelector('.hamburger-button');
const navMenu = document.querySelector('.header-nav');

const handler = () => {
    hamburgerButton.classList.toggle('open');
    navMenu.classList.toggle('open');
};

hamburgerButton.addEventListener('click', handler);
navMenu.addEventListener('click', (event) => { 
    if (event.target.className === 'header-nav__link')
        handler();
});