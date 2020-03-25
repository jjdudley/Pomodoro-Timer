let countdown;
let isPaused;
let secondsLeft = 0;
let seconds;
let interval;
let breakCount = 0;


//let timeLeft = 1500; //25 minutes- we have this from html
const longBreak = 900; //15 minutes
const title = document.querySelector('.title');
const timeDisplay = document.querySelector('.time');
const endTime = document.querySelector('.endTime');
const pauseButton = document.querySelector('.pause');
const workBreakBtns = document.querySelectorAll('[data-time]');
const alarm = document.createElement('audio');

pauseButton.addEventListener('click', pauseTimer);
workBreakBtns.forEach(button => button.addEventListener('click', commenceTimer(25)));

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000; //then will equal total amount of time including timer
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval (() => {
        if (!isPaused) {
            secondsLeft = Math.round((then - Date.now()) / 1000);
        }

        //this will check if the timer should stop
        if (secondsLeft < 0) {
            clearInterval(countdown);
            alarm.currentTime = 0;
            alarm.play()
            return;
        }

        //to display time left
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds /60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds}`;
    document.title = display;
    timeDisplay.textContent = display;
};

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Stop At ${adjustedHour}:${minutes}`;
};

function commenceTimer(mins) {
    seconds = mins*60 || 0;
    interval = setInterval(function() {
        seconds--;

        if(!seconds){
            clearInterval(interval);
            alert("time for a break!");
        }
    }, 1000)
};


function pauseTimer(){
if (isPaused) {
    clearInterval(countdown);
    pauseButton.classList.add('pause-clicked');
}

if (!isPaused) {
    pauseButton.classList.remove("pause-clicked");

    seconds = secondsLeft;
    timer(seconds);
}
};
