// catch query //
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton =document.querySelector('.startButton');

// set value //
let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;


introsound = new sound("../audio/bg.mp3")
myMusic = new sound("../audio/stage.mp3");
myAudio = new sound("../audio/pain.mp3")
myAud = new sound("../audio/stage.mp3")

function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random()* holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
// image paw lar
function popOut()
{
    const time= Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');

//image pyan win
    setTimeout(function() 
                {
        hole.classList.remove('up');
        // time up = false
        // if not time up = (true)/ popout again until time (20000 milli seconds)
        if(!timeUp) popOut();
    }, time);
}
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
        this.sound.currentTime = 0 ;
    }    
}
// background and effect sounds
function intro(){
    introsound.play();
}   
function brakeIntro(){
    introsound.stop();
}
function playSound()
{
  myMusic.play();
}

startButton.addEventListener('click', startgame);
startButton.addEventListener('click', playSound);
startButton.addEventListener('click', brakeIntro);

function startgame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    startButton.style.display = 'none';
    timeUp = false;
    score = 0 ;
    popOut();

    // set timer for how long pop out function will run
    setTimeout(() => {
        timeUp = true
    }, timeLimit)

    //setting reverse countdown for timer

    let startCountdown = setInterval(() => {
        countdown -= 1;
        countdownBoard.textContent = countdown;

    // ************************************************
    // ****count down function will stop after reach 0s in timer
    // ************************************************

        if(countdown <0){
            countdown = 0 ;
            clearInterval(startCountdown);
            countdownBoard.textContent = 'Time Up !!! Thank for Playing' ;
            myMusic.stop();
            startButton.style.display = 'block';
            intro();
        }
    }, 1000);
}

function whack(e){
    score++;
    this.style.backgroundImage = 'url("yoda2.png")';
    myAudio.play();
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.onclick = whack);