var scores,activePlayer,roundScore,gamePlaying;
var img = document.querySelector('.dice');
img.style.display = 'none'
currentPlayer=0;
scores=[0,0];
roundScore = 0;
gamePlaying= true;

$button =document.querySelector('.btn-roll');

$button.onclick = animation;

function animation(e){
    img.style.display = 'block';
    var dice = Math.floor(Math.random()*6)+1;
    var dicepic = document.querySelector('.dice');
    dicepic.src = "dice-"+ dice +'.png';
    roundScore += dice;
    if(dice>1){
        document.querySelector('#current-'+currentPlayer).textContent = roundScore;
    }else{
        nextPlayer();
    }
}
function nextPlayer(){
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    currentPlayer == 0 ? currentPlayer=1 : currentPlayer =0 ;
    roundScore = 0 ;
    document.querySelector('#current-0').textContent = 0 ;
    document.querySelector('#current-1').textContent = 0 ;
}
$hold =document.querySelector('.btn-hold');
$hold.onclick = hold;
function hold(){
    
    scores[currentPlayer] += roundScore;
    document.querySelector('#score-'+currentPlayer).textContent = scores[currentPlayer];
    if(scores[currentPlayer]>=30){
        document.querySelector('#name-'+currentPlayer).textContent = "Winner";
        document.querySelector('.player-' + currentPlayer+ '-panel').classList.remove('active');
        document.querySelector('.player-' + currentPlayer+ '-panel').classList.add('winner');
        $button.style.display = 'none';      
        $hold.style.display = 'none';      
    }else{
        nextPlayer();
    }   
}
document.querySelector('.btn-new').onclick = restart;
function restart(){
    currentPlayer=0;
    scores=[0,0];
    roundScore=0;
    gamePlaying = true;

    $button.style.display = 'block';
    $hold.style.display = 'block';
    document.querySelector('#current-0').textContent = 0 ;
    document.querySelector('#current-1').textContent = 0 ;
    document.querySelector('#score-0').textContent = 0 ;
    document.querySelector('#score-1').textContent = 0 ;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';


}

