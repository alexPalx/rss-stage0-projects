const url = 'https://favqs.com/api/qotd';
const quote = document.querySelector('.quote');
const quoteText = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const buttonGenerate = document.querySelector('.button_generate');

let loadTimeHistory = [500];
let averageLoadTime = loadTimeHistory[0];

const calculateAaverageLoadTime = (loadTime) => {
    loadTimeHistory.push(loadTime);
    if (loadTimeHistory.length > 5) loadTimeHistory.shift();
    averageLoadTime = loadTimeHistory.reduce((prev, next) => prev + next, 0) / loadTimeHistory.length;
    document.documentElement.style.setProperty('--load-time', `${averageLoadTime}ms`);
}

async function getData(callback) {
    const startTime = Date.now();
    const res = await fetch(url);
    const data = await res.json();
    const loadTime = (Date.now() - startTime);
    calculateAaverageLoadTime(loadTime);
    
    if (callback)
        return callback(data);
}

const setText = (data) => {
    quote.classList.remove('hide')
    quoteText.textContent = data.quote.body;
    quoteAuthor.textContent = data.quote.author;
};

getData(setText);

buttonGenerate.addEventListener('click', () => {
    getData(setText);
    quote.classList.add('hide');
});
