'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const newBtn = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

diceImg.classList.add('hide');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let status = true;

// switch player 

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// roll the dice 
roll.addEventListener('click', () => {
    if (status) {
        let dice = Number(Math.trunc((Math.random() * 6)) + 1);
        diceImg.classList.remove('hide');
        diceImg.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }

})


// hold point 

hold.addEventListener('click', () => {
    if (status) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            status = false;
            diceImg.classList.add('hide');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');


        } else {
            switchPlayer();
        }
    }
})


// restart game 

newBtn.addEventListener('click', () => {
    status = true;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.getElementById(`score--0`).textContent = '0';
    document.getElementById(`score--1`).textContent = '0';
    document.getElementById(`current--0`).textContent = '0';
    document.getElementById(`current--1`).textContent = '0';

    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
})

