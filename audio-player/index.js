const playButton = document.querySelector('.play');
const nextButton = document.querySelector('.button.rewind.forward');
const prevButton = document.querySelector('.button.rewind');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const songCover = document.querySelector('.cover');
const progressBar = document.querySelector('#progress-bar');

const songCurrentTime = document.querySelector('.song-current-time');
const songDuration = document.querySelector('.song-duration');

const audio = document.querySelector('audio');
audio.volume = 0.1;

let isPlay = false;
let isSetProgress = false;
let time = 0;
let playNum = 0;
let mouseDownCheckInterval;

const songArray = [
    'assets/audio/HyperSpoiler.mp3',
    'assets/audio/CpJohnnySilverhandsTheme.mp3',
    'assets/audio/CpMainTheme.mp3'
];
const songTitleArray = [
    ['Hyper', "Spoiler"],
    ['Cyberpunk 2077', "Johnny Silverhand Theme"],
    ['Cyberpunk 2077', "Main Theme"]
];
const songCovers = [
    'assets/img/HyperSpoiler.jpg',
    'assets/img/CpJohnnySilverhandsTheme.jpg',
    'assets/img/CpMainTheme.jpg'
];



const selectAudio = (songIndex) => {
    audio.autoplay = true;
    playButton.classList.add('paused');
    audio.src = songArray[songIndex];
    setSongTitleArtist(songIndex);
    document.documentElement.style.setProperty('--cover', `url(${songCovers[songIndex]})`);
    time = 0;
    progressBar['value'] = time;
    isPlay = true;
};

const playAudio = () => {
    if (isPlay) {
        time = audio.currentTime;
        audio.pause();
        isPlay = false;
        playButton.classList.remove('paused');
    } else {
        audio.currentTime = time;
        audio.play();
        isPlay = true;
        playButton.classList.add('paused');
    }
}

const playNext = () => {
    playNum++;
    if (playNum > songArray.length - 1) playNum = 0;
    selectAudio(playNum);
};

const playPrev = () => {
    playNum--;
    if (playNum < 0) playNum = songArray.length - 1;
    selectAudio(playNum);
};

const initAudio = () => {
    audio.addEventListener('loadedmetadata', () =>
        songDuration.textContent = getTimeString(audio.duration));
    audio.addEventListener('timeupdate', (event) => {
        songCurrentTime.textContent = getTimeString(audio.currentTime);
        if (isPlay && !isSetProgress) {
            const value = Math.ceil(audio.currentTime / audio.duration * 100) || 0;
            progressBar['value'] = value;
            document.documentElement.style.setProperty('--progress', `${value}%`);
        }
    });
    audio.addEventListener('ended', () => {
        playNext();
    });

    progressBar.addEventListener('mousedown', () => {
        isSetProgress = true;
        mouseDownCheckInterval = setInterval(() => {
            document.documentElement.style.setProperty('--progress', `${progressBar['value']}%`);
            songCurrentTime.textContent = getTimeString((progressBar['value']*audio.duration)/100);
        }, 5);
    });
    progressBar.addEventListener('mouseup', () => {
        clearInterval(mouseDownCheckInterval);
        document.documentElement.style.setProperty('--progress', `${progressBar['value']}%`);
        isSetProgress = false;
    });
    progressBar.addEventListener('change', setProgress);
    
    audio.currentTime = 0;
    audio.src = songArray[0];
    setSongTitleArtist(playNum);
    document.documentElement.style.setProperty('--cover', `url(${songCovers[playNum]})`);
}

const setSongTitleArtist = (index) => {
    songArtist.textContent = songTitleArray[index][0];
    songTitle.textContent = songTitleArray[index][1];
    // songArtist.classList.remove('overflow');
    // songTitle.classList.remove('overflow');
    // if (songArtist.textContent.length > 30)
    //     songArtist.classList.add('overflow');
    // if (songTitle.textContent.length > 30)
    //     songTitle.classList.add('overflow');
};

const setProgress = () => {
    time = Math.ceil((progressBar['value'] / 100) * audio.duration);
    audio.currentTime = time;
};

const getTimeString = (time) => {
    return String(Math.floor(time / 60)).padStart(2, '0') + ':' +
        String(Math.floor(time % 60)).padStart(2, '0');
};

playButton.addEventListener('click', playAudio);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);

window.addEventListener('load', initAudio);

console.log(`Самопроверка:
Все требования выполнены.
Как хорошо, что за ужасный код пока что не снижают оценку :)
`);
