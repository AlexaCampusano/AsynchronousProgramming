/*
The user should see the following:

- [x]  An application title labeled "Stopwatch Demo"
- [x]  A section with a timer that displays the current elapsed time to the hundredth second
- [x]  A button labeled "Start/Stop"
- [x]  A button labeled "Reset"
- [x]  A button labeled "Record Time"
- [x]  A section labeled "Past Times" that keeps a record of previously recorded times

The user should be able to do the following:

- [x]  Start and stop the timer by pressing the "Start/Stop" button.
- [x]  Start and stop the timer by pressing the 's' key.
- [x]  Record the current timer count into the Past Times section by pressing the "Record Time" button
- [x]  Record the current timer count into the Past Times section by pressing the 't' key.
- [x]  Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the "Reset" button.
- [x]  Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the 'r' key.
*/

let timerInterval = null;
let timer = 0;
let started = false;

startTimer = () => {
    if (!started) {
        const element = document.getElementById('stopwatch-timer');
        timerInterval = setInterval(() => {
            element.innerHTML = getHundrethOfSecond(timer++);
        }, 10);

        started = true;
    }
}

stopTimer = () => {
    if (started) {
        clearInterval(timerInterval);
        started = false;
    }
}

startStop = () => {
    if (!started) { startTimer(); } else { stopTimer(); }
}

setUp = () => {
    const startStopTimer = document.getElementById('start-stop');
    const resetTimer = document.getElementById('reset');
    const recordTime = document.getElementById('record-time');
    const element = document.getElementById('stopwatch-timer');

    startStopTimer.addEventListener('click', () => startStop());
    resetTimer.addEventListener('click', () => reset());
    recordTime.addEventListener('click', () => record());
    element.innerHTML = getHundrethOfSecond(0);

    // Add key downs
    document.addEventListener('keydown', (ev) => {
        switch (ev.key) {
            case 's': 
                startStop();
            break;
            case 'r': 
                reset();
            break;
            case 't': 
                record();
            break;
            default: 
                return;
            
        }
    })
}

reset = () => {
    const element = document.getElementById('stopwatch-timer');
    const pastTimeContainer = document.getElementById('past-time-container');
    clearInterval(timerInterval);
    timerInterval = null;
    timer = 0;
    element.innerHTML = getHundrethOfSecond(timer);
    pastTimeContainer.innerHTML = null;
}

record = () => {
    const pastTimeContainer = document.getElementById('past-time-container');
    const newRecord = getRecordElement(timer);
    pastTimeContainer.appendChild(newRecord);
}

getRecordElement = (timeCaptured) => {
    const element = document.createElement('li');
    const captured = timeCaptured > 0 ? timeCaptured - 1 : timeCaptured;
    element.innerHTML = getHundrethOfSecond(captured);
    return element;
}

getHundrethOfSecond = (time) => (time / 100).toFixed(2);

window.onload = () => {
    setUp();
}