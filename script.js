'use strict';

//very imp. inf for u math.trunc(math.random() * 6) it generates numbers from 0 t0 so we must add 1 to generate from 1 to 6

//player number 1 is player 0 and player number 2 is player 1

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

function init() {
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  document.querySelector('#name--0').textContent = `player ${activePlayer + 1}`;
  document.querySelector('#name--1').textContent = `player ${activePlayer + 2}`;
}

init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //what toggle do is it look at player 0 if the class 'player active' is in it so it will remove it
  // and if the class isn't at the player 0 it will dd it to it
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Rooling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1- Generating Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2- Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3- check if dice is 1 then switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1- add currentscore to active player

    scores[activePlayer] += currentScore; // scores[1] = score[1] + current score

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2- check if score >=100

    if (scores[activePlayer] >= 40) {
      playing = false;

      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.querySelector(`#name--${activePlayer}`).textContent = `player ${
        activePlayer + 1
      } Wins 🥳`;
    } else {
      //3- switch the player

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
