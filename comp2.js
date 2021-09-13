var board;
var playerName = localStorage.getItem("Player");
var startingMove = localStorage.getItem("StartingMove");
var fm=localStorage.getItem("Frstmove");
console.log(fm);
let a=0;
let b=0;
let c=0;
document.getElementById("ply1").innerText=playerName+":-   "+a;
document.getElementById("ply2").innerText="Computer:-   "+b;
document.getElementById("dr").innerText="Draw:-   "+c;
let player = startingMove == 'X' ? 'X' : 'O';
let secondplayer = player == 'X' ? 'O' : 'X';     //maximizing player
let firstplayer = startingMove;   
const wincom=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cells=document.querySelectorAll('.cell');
startgame();
function gameover(gamewon)
{
    for(let index of wincom[gamewon.index])
    {
        document.getElementById(index).style.backgroundColor=
        gamewon.player==firstplayer?"#00bfff":"#ff1a1a";


    }
    let i;
    for(i=0;i<cells.length;i++)
    {
        cells[i].removeEventListener('click',turnclick,false)
    }
    declarewinner(gamewon.player==firstplayer?`${playerName} Win!!!`:"Computer Win!!!",gamewon.player==firstplayer?1:2);
}
function startgame()
{
    document.querySelector(".endgame").style.display="none";
    board=Array.from(Array(9).keys());
    
    let i;
    for(i=0;i<cells.length;i++)
    {
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick,false);

    }
    if(fm==2)
    setTimeout(() => {turn(best(),secondplayer);},1000);
}
function declarewinner(who,cc)
{
    if(cc==1)
    a++;
    else if(cc==2)
    b++;
    else
    c++;
    document.getElementById("ply1").innerText=playerName+":-   "+a;
document.getElementById("ply2").innerText="Computer:-   "+b;
document.getElementById("dr").innerText="Draw:-   "+c;
document.querySelector(".endgame").style.display="block";
document.getElementById("txt").innerText=who;
}

function turnclick(sqr)
{
    if(typeof board[sqr.target.id]=='number')
    {
	    setTimeout(() => {turn(best(),secondplayer);},1000);
	    turn(sqr.target.id,firstplayer);
        if(!checktie())
       setTimeout(() => {turn(best(),secondplayer);},1000);
    }

}

function emptysquare()
{
    return board.filter(s=>typeof s=='number');
}
function best()
{
    return minimax(board,secondplayer).index;
}
function checktie()
{
    if(emptysquare().length==0)
    {
        for(var i=0;i<cells.length;i++)
        {
            // cells[i].style.backgroundColor="#cc9900";
            cells[i].style.backgroundColor="#009933"
            cells[i].removeEventListener('click',turnclick,false);
        }
    
    declarewinner("Tie game!!",0);
    return true;
    }
    return false;

}
function turn(sqrid,ply)
{
    board[sqrid]=ply;
    document.getElementById(sqrid).innerText=ply;
    let gamewon=checkWin(board,ply);
    if(gamewon)
    gameover(gamewon);
}
function checkWin(brd,ply)
{
    let plays=brd.reduce((a,e,i)=>
   (e===ply)?a.concat(i):a,[]);
   let gamewon=null;
   for(let[index,win] of wincom.entries())
   {
       if(win.every(elem=>plays.indexOf(elem)>-1)){
           gamewon={index:index,player:ply};
           break;

       }

   }
   return gamewon;
}
function minimax(newBoard, player) {
	var availSpots = emptysquare();

	if (checkWin(newBoard, firstplayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, secondplayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == secondplayer) {
			var result = minimax(newBoard, firstplayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, secondplayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === secondplayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
