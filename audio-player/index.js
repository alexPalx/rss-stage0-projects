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

let isPlay = false;
let isSetProgress = false;
let time = 0;
let playNum = 0;

const songArray = ['assets/audio/beyonce.mp3', 'assets/audio/dontstartnow.mp3'];
const songTitleArray = [['Beyonce', "Don't Hurt Yourself"], ['Dua Lipa', "Don't Start Now"]];
const songCovers = ['assets/img/lemonade.png', 'assets/img/dontstartnow.png'];



const selectAudio = (songIndex) => {
    audio.src = songArray[songIndex];
    songArtist.textContent = songTitleArray[songIndex][0];
    songTitle.textContent = songTitleArray[songIndex][1];
    document.documentElement.style.setProperty('--cover', `url(${songCovers[songIndex]})`);
    time = 0;
    progressBar['value'] = time;
    isPlay = false;
    playButton.classList.remove('paused');
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
        if(isPlay && !isSetProgress) progressBar['value'] = Math.ceil(audio.currentTime / audio.duration * 100);
    });
    progressBar.addEventListener('mousedown', () => isSetProgress = true);
    progressBar.addEventListener('mouseup', () => isSetProgress = false);
    progressBar.addEventListener('change', setProgress);
    
    audio.currentTime = 0;
    audio.src = songArray[0];
}



const setProgress = () => {
    time = Math.ceil((progressBar['value'] / 100) * audio.duration);
    console.log(`current time: ${getTimeString(time)}`);
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


