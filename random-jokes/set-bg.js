const backgroundImages = [
    'assets/img/background/background-0.jpg',
    'assets/img/background/background-1.jpg',
    'assets/img/background/background-2.jpg',
    'assets/img/background/background-3.jpg',
    'assets/img/background/background-4.jpg'
];
const setRandomBackground = () => {
    const randomBgIndex = Math.floor(Math.random() * backgroundImages.length);
    document.documentElement.style.setProperty('--background', `url(${backgroundImages[randomBgIndex]})`);
};
setRandomBackground();
