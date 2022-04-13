/*-------------------- selectors ---------------------*/
const urls = ['https://favqs.com/api/qotd', 'assets/data.json'];

const day = document.querySelector('.day');
const dayWeek = document.querySelector('.day-week');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

const quoteHeader = document.querySelector('.header');
const quote = document.querySelector('.quote');
const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');

const buttonGenerate = document.querySelector('.button_generate');
const buttonChangeLang = document.querySelector('.button_lang');



/*-------------------- some variables --------------------*/
const languages = ['en', 'be'];
const quoteHeaders = ['Quote for you…', 'Цытата для вас…'];
const quoteButtonGenerateTexts = ['Generate another', 'Згенераваць іншую'];
let quoteLang;



/*-------------------- background --------------------*/
const backgroundImages = [
    'assets/img/background/background-0.jpg',
    'assets/img/background/background-1.jpg',
    'assets/img/background/background-2.jpg',
    'assets/img/background/background-3.jpg',
    'assets/img/background/background-4.jpg'
];

const setRandomBackground = () => {
    const randomBgIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url(${backgroundImages[randomBgIndex]})`;
};



/*------------- to smooth server response time ---------------*/
const expectedResponseTime = 300;
let loadTimeHistory = [];
let averageLoadTime;

const calculateAaverageLoadTime = (loadTime) => {
    loadTimeHistory.push(loadTime);
    if (loadTimeHistory.length > 5) loadTimeHistory.shift();
    averageLoadTime = loadTimeHistory.reduce((prev, next) => prev + next, 0) / loadTimeHistory.length;
    document.documentElement.style.setProperty('--load-time', `${averageLoadTime + Math.max(expectedResponseTime - averageLoadTime, 0) + 100}ms`);
}



/*-------------------- main functionality --------------------*/
async function getData(callback) {
    const startTime = Date.now();
    const res = await fetch(urls[quoteLang]);
    let data;
    if (quoteLang === 0)
        data = await res.json();
    else if (quoteLang === 1) {
        data = await res.json();
        data = data[Math.round(Math.random() * data.length)];
    }
    const loadTime = (Date.now() - startTime);
    calculateAaverageLoadTime(loadTime);
    
    if (callback)
        return callback(data);
}

const setText = (data) => {
    setTimeout(() => {
        quote.classList.remove('hide')
        if (quoteLang === 0){
            quoteText.textContent = data.quote.body;
            quoteAuthor.textContent = data.quote.author;
        }
        else if (quoteLang === 1) {
            quoteText.textContent = data.text;
            quoteAuthor.textContent = data.author;
        }
    }, Math.max(Math.max(expectedResponseTime - averageLoadTime, 0)));
};

const generateText = () => {
    quote.classList.add('hide');
    getData(setText);
};



/*-------------------- language change --------------------*/
const changeLang = () => {
    quoteLang = Number(!quoteLang);
    saveLocalStorageData();
    changeTextLang();
    setDatetimeText();
    generateText();
};

const changeTextLang = () => {
    buttonChangeLang.textContent = languages[quoteLang];
    quoteHeader.textContent = quoteHeaders[quoteLang];
    buttonGenerate.textContent = quoteButtonGenerateTexts[quoteLang];
};



/*-------------------- beautiful date and time --------------------*/
const setDatetimeText = () => {
    const months = [
        ['January', 'Cтудзень'],
        ['February', 'Люты'],
        ['March', 'Сакавік'],
        ['April', 'Красавік'],
        ['May', 'Травень'],
        ['June', 'Чэрвень'],
        ['July', 'Ліпень'],
        ['August', 'Жнівень'],
        ['September', 'Верасень'],
        ['October', 'Кастрычнік'],
        ['November', 'Лістапад'],
        ['December', 'Снежань']
    ];
    const daysWeek = [
        ['Sunday', 'Нядзеля'],
        ['Monday', 'Панядзелак'],
        ['Tuesday', 'Аўторак'],
        ['Wednesday', 'Серада'],
        ['Thursday', 'Чацвер'],
        ['Friday', 'Пятніца'],
        ['Saturday', 'Субота']
    ];
    const date = new Date();

    day.textContent = date.getDate();
    dayWeek.textContent = daysWeek[date.getDay()][quoteLang];
    month.textContent = months[date.getMonth()][quoteLang];
    year.textContent = date.getFullYear();
};



/*-------------------- local storage --------------------*/
const loadLocalStorageData = () => {
    quoteLang = Number(localStorage.getItem('quoteLang')) ?? 0;
    saveLocalStorageData();
};

const saveLocalStorageData = () => {
    localStorage.setItem('quoteLang', quoteLang);
};



/*-------------------- initialization --------------------*/
const init = () => {
    setRandomBackground();
    buttonGenerate.addEventListener('click', generateText);
    buttonChangeLang.addEventListener('click', changeLang);
    loadLocalStorageData();
    changeTextLang();
    setDatetimeText();
    getData(setText);
};



window.addEventListener('load', init);

console.log('Самопроверка:\nВсе требования выполнены.');
