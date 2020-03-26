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
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

pauseButton.addEventListener('click', button => {
    pauseTimer();
});

workBreakBtns.forEach(button => button.addEventListener('click', commenceTimer));
//workBreakBtns.forEach(button => {
  //  button.addEventListener('click', () => {
    //    commenceTimer(25);
    //});
//});
    

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
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title  = display;
    timeDisplay.textContent = display;
};

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Stop At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function commenceTimer() {
    pauseButton.classList.remove('pause-clicked')
    isPaused = false;
    seconds = parseInt(this.dataset.time);

    const replaceText = this.textContent.replace(/\s/g, '');
    if (replaceText == 'Work') {
        title.textContent = 'WORK';
    } else if (replaceText == 'Break') {
        title.textContent = 'BREAK';
    }
    
    breakCount++;
       if (breakCount > 4) {
           breakCount = 0;
           seconds = parseInt(longBreak)
       }

    timer(seconds);

};


function pauseTimer(){
    if (countdown != undefined) {
        if (!isPaused) {
            isPaused = true;
            isPaused = true;
            clearInterval(countdown);
            pauseButton.classList.add('pause-clicked')
        } else if (isPaused) {
            isPaused = false;
            pauseButton.classList.remove('pause-clicked')
            pauseButton.classList.remove('pause-clicked')
            seconds = secondsLeft;
            timer(seconds)
        }
    }
};