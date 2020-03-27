let countdown;
let isPaused;
let secondsLeft = 0;
let seconds;
let interval;
let breakCount = 0;

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

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000; //then will equal total amount of time including timer
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval (() => {  // setInterval function runs function below at interval (in mil.seconds) provided (line 43)
        if (!isPaused) {              // if the timer is not paused
            secondsLeft = Math.round((then - Date.now()) / 1000);   //set the time to equal to difference between start and end time (each passing second)
        }
        //this will check if the timer should stop
        if (secondsLeft < 0) {             // if there is no more remaining time on the clock
            clearInterval(countdown);      // stop the setInterval function (it will be reset upon future button clicks)
            alarm.currentTime = 0;          
            alarm.play();                  // & sound alarm
            return;                        // stop errrything
        }
        //to display time left
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds /60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
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
    pauseButton.classList.remove('pause-clicked');
    isPaused = false;
    seconds = parseInt(this.dataset.time);

    const replaceText = this.textContent.replace(/\s/g, '');

    if (replaceText == 'Work') {
        title.textContent = 'Work';
        } 
    else if (replaceText == 'Break') {
        title.textContent = 'Break';
        breakCount++;
        if (breakCount > 3) {
           breakCount = 0;
           seconds = parseInt(longBreak);
       };
    };

    timer(seconds);
};

function pauseTimer(){
    if (countdown != undefined) {            // if countdown (and consequently, setInterval) is live
        if (!isPaused) {                     // and if the timer is not already paused
            isPaused = true;                 // turn pause on
            clearInterval(countdown);         // stop the timer
            pauseButton.classList.add('pause-clicked') 
        } else if (isPaused) {                // if the timer IS already paused
            isPaused = false;                 //turn pause off
            pauseButton.classList.remove('pause-clicked');
            seconds = secondsLeft;            // carry on timer according to secondsLeft (which we can access bc it's a global variable)
            timer(seconds);
        };
    };
};