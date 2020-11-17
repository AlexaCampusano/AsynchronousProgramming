// - [x]  Build a 3 by 3 grid of blue tiles
// - [x]  Each tile has a hidden number behind the tile.
// - [x]  Clicking the tile will turn it red temporarily and reveal the hidden number.
// - [x]  If a second tile is clicked and the numbers do not match, they will turn blue again and hide the number.
// - [x]  If the tiles do match, they will turn purple and remain face up.
// - [x]  Once the player finds all matching pairs, the game ends.
// - [x]  display below the grid a timer
// - [x]  add a restart button


const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
let timerInterval = null;
let timer = 0;
let started = false;
let clicked = [];
let completed = [];
let canPlay = true;


const getOptions = () => {
    // generate 4 random numbers
    const firstOption = getRandomNumber(1, 10);
    const secondOption = getRandomNumber(11, 20);
    const thirdOption = getRandomNumber(21, 30);
    const fourthOption = getRandomNumber(31, 40);
    const fifthOption = getRandomNumber(41, 50);

    //since we need 2 occurrences of the same number, place the numbers twice on the array of options so they can be randomly placed into the grid.
    return [firstOption, firstOption, secondOption, secondOption, thirdOption, thirdOption, fourthOption, fourthOption, fifthOption, fifthOption];
}

const fillUpGrid = () => {
    clearGrid();
    let options = getOptions();
    const grid = document.getElementsByTagName('td');
    const timeElapsed = document.getElementById('timeElapsed');
    timeElapsed.innerHTML = 0;

    if (grid && grid.length) {
        for (let cell = 0; cell < grid.length; cell++) {
            const random = getRandomNumber(0, options.length);
            let element = grid[cell];

            element.childNodes[0].innerHTML = options[random];
            element.addEventListener('mouseenter', () => element.classList.add('hover'));
            element.addEventListener('mouseleave', () => element.classList.remove('hover'));
            options.splice(random, 1);
        }
    }
}

const revealNumber = (element) => {
    startGame();
    show(element);
    
    if (clicked && clicked.length == 2) {
        const firstCell = clicked[0];
        const secondCell = clicked[1];

        if (getValue(firstCell) === getValue(secondCell)) {
            success(firstCell);
            success(secondCell);
            completed.push(firstCell);
            completed.push(secondCell);

            if (completed && completed.length === 8) {
                endGame();
            }
        } else {
            canPlay = false;
            setTimeout(() => {
                hide(firstCell);
                hide(secondCell);
                canPlay = true;
            }, 300);
        }

        clicked = [];
    }
}

const startGame = () => {
    const timeElapsed = document.getElementById('timeElapsed');

    if (!started && !completed.length) {
        timer = 0;

        timerInterval = setInterval(() => {
            timeElapsed.innerHTML = timer++;
        }, 1000);

        started = true;
        completed = [];
    }
}

const endGame = () => {
    started = false;
    clearInterval(timerInterval);
    alert(`You have won! Time Elapsed: ${timer}`);
}

const clearGrid = () => {
    const revealed = document.getElementsByClassName('reveal');
    const success =  document.getElementsByClassName('success');
    const successCells = [...success];
    const revealedCells = [...revealed]

    for (let i = 0; i < [...revealedCells].length; i++) {
        hide(revealedCells[i]);
    }

    for (let i = 0; i < successCells.length; i++) {
        removeSuccess(successCells[i]);
    }

    clearInterval(timerInterval);
}

const getValue = (element) => element.childNodes[0].innerHTML;
const show = (element) => {
    element.classList.add('reveal');
    if (!element.clicked) {
        element.clicked = true;
        clicked.push(element);
    }
}
const hide = (element) => {
    element.classList.remove('reveal');
    element.clicked = false;
}
const success = (element) => element.classList.add('success');
const removeSuccess = (element) => element.classList.remove('success');

window.onload = () => {
    fillUpGrid();
}

