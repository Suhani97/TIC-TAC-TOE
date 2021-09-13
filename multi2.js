var board;
var player1Name = localStorage.getItem("Player1");
var player2Name = localStorage.getItem("Player2");
let a=0;
let b=0;
let c=0;
document.getElementById("ply1").innerText=player1Name+":-   "+a;
document.getElementById("ply2").innerText=player2Name+":-   "+b;
document.getElementById("dr").innerText="Draw:-   "+c;
const firstplayer='X';
const secondplayer='O';
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
        gamewon.player==firstplayer?"#0073e6":"#ff1a1a";


    }
    let i;
    for(i=0;i<cells.length;i++)
    {
        cells[i].removeEventListener('click',turnclick,false)
    }
    declarewinner(gamewon.player==firstplayer?`${player1Name} win!!!`:`${player2Name} win!!!`,gamewon.player==firstplayer?1:2);
}
var p;
function startgame()
{
p=0;
    document.querySelector(".endgame").style.display="none";
    board=Array.from(Array(9).keys());
    let i;
    for(i=0;i<cells.length;i++)
    {
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick,false);

    }
}
function declarewinner(who,cc)
{
    if(cc==1)
    a++;
    else if(cc==2)
    b++;
    else
    c++;
    document.getElementById("ply1").innerText=player1Name+":-   "+a;
document.getElementById("ply2").innerText=player2Name+":-   "+b;
document.getElementById("dr").innerText="Draw:-   "+c;
document.querySelector(".endgame").style.display="block";
document.getElementById("txt").innerText=who;

document.getElementById("txt").style.fontweight=800;
document.getElementById("txt").style.color=blue;

}

function turnclick(sqr)
{

    if(p!=9)
   { if(typeof board[sqr.target.id]=='number')
    {
       
       { p=p+1;
        if(p%2!=0)
        turn(sqr.target.id,firstplayer);
        else
        turn(sqr.target.id,secondplayer);
       }
    }
}
if(p==9)
checktie();

}

function emptysquare()
{
    return board.filter(s=>typeof s=='number');
}
// function best()
// {
//     return emptysquare()[0];
// }
function checktie()
{
    if(emptysquare().length==0)
    {
        for(var i=0;i<cells.length;i++)
        {
            cells[i].style.backgroundColor="green";
            cells[i].removeEventListener('click',turnclick,false);
        }
    
    declarewinner("Tie game!!",0);
    
    }
    

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
