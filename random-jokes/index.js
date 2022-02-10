const urls = ['https://favqs.com/api/qotd', 'assets/data.json'];
const quote = document.querySelector('.quote');
const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const buttonGenerate = document.querySelector('.button_generate');
const buttonChangeLang = document.querySelector('.button_lang');

let loadTimeHistory = [];
let averageLoadTime;

const languages = ['en', 'be'];
let quoteLang = 0;

const calculateAaverageLoadTime = (loadTime) => {
    loadTimeHistory.push(loadTime);
    if (loadTimeHistory.length > 5) loadTimeHistory.shift();
    averageLoadTime = loadTimeHistory.reduce((prev, next) => prev + next, 0) / loadTimeHistory.length;
    document.documentElement.style.setProperty('--load-time', `${averageLoadTime + Math.max(300 - averageLoadTime, 0)}ms`);
}

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
    }, Math.max(Math.max(300 - averageLoadTime, 0)));
};

const generateText = () => {
    quote.classList.add('hide');
    getData(setText);
};

const changeLang = () => {
    quoteLang = Number(!quoteLang);
    buttonChangeLang.textContent = languages[quoteLang];
    generateText();
};

buttonGenerate.addEventListener('click', generateText);
buttonChangeLang.addEventListener('click', changeLang);
window.addEventListener('load', () => getData(setText));