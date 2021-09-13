function getValueMultiplayer(){
    console.log("Helo");
    localStorage.clear();
    const playerName1 = document.getElementById("player1").value;
    const playerName2= document.getElementById("player2").value;
    console.log(playerName1);
    localStorage.setItem("Player1", playerName1);
    localStorage.setItem("Player2", playerName2);
    document.location='multi2.html';
    
    return;
}