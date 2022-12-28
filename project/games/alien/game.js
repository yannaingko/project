//THESE ARE ASSIGNED VALUES AND WILL NOT CHANGE.
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const playButton = document.querySelector('.playButton');

//THESE VALUES WILL BE CHANGED, REPLACED AND DELETED AS THE GAME RUNS.
let lastHole;
let timeUp = false;
let timeLimit = 30000;
let score = 0;
let countdown;

//THIS IS THE VARIABLE FOR ALIEN HIT SOUND.
var myAudio;

//THIS FUNCTION PICKS A RANDOM HOLE FOR THE ALIEN TO POP OUT FROM.
function pickRandomHole(holes)
{
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole)
        {
            return pickRandomHole(holes);
        }
    lastHole = hole;
    return hole;
}

//THIS FUNCTION CONTROLS THE RANDOM TIME FROM WHICH THE ALIEN WILL ANIMATE OUT FROM AND THEN GO BACK IN.
function popOut()
{
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function()
              {
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time);
}

//THIS FUNCTION CONTROLS THE GAMEPLAY, GAMEOVER CONDITION AND MUSIC STOP.
function startGame()
{
    playButton.style.pointerEvents = 'none';
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    myAudio = new sound("../audio/pain.mp3");
    score = 0;
    popOut();
    setTimeout(function()
              {
        timeUp = true;
    }, timeLimit);
    
    let startCountdown = setInterval(function()
                                    {
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if(countdown < 0)
            {
                countdown = 0;
                clearInterval(startCountdown);
                countdownBoard.textContent = 'NICE TRY! NOW PLAY AGAIN AND GET A BETTER SCORE.'
                myMusic.stop();
                playButton.style.pointerEvents = 'all';
            }
    }, 1000);
    
}

//THIS FUNCTION IS FOR THE BACKGROUND MUSIC.
function playSound()
{
  myMusic = new sound("../audio/stage.mp3");
  myMusic.play();
}

//THIS FUNCTION IS A CONSTRUCTOR WHICH HANDLES THE AUDIO.
function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
    {
        this.sound.play();
    }
    this.stop = function()
    {
        this.sound.pause();
    }    
}

//THESE ARE BUTTON EVENTS WHICH START THE GAME AS WELL AS THE BACKGROUND MUSIC.
playButton.addEventListener('click', startGame);
playButton.addEventListener('click', playSound);

//THIS IS WHERE THE PLAYER STARTS THE GAME AND HITS THE ALIENS TO INCREASE THE SCORE.

function hit(e)
{
    score++;
    this.style.backgroundImage = 'url("images/alien2.png")';
    myAudio.play();
    this.style.pointerEvents = 'none';
    setTimeout(() =>
              {
        this.style.backgroundImage = 'url("images/alien1.png")';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', hit));