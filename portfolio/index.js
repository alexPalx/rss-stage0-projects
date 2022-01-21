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

console.log(`Самопроверка

Вёрстка соответствует макету. Ширина экрана 768px +48 (возможно, стоит снять несколько баллов из-за некоторых кривых моментов)

Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15

На ширине экрана 768рх и меньше реализовано адаптивное меню +22

Итого: 85
`);