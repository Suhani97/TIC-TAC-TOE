



function getValuesSingleplayer(){
    const playerName = document.getElementById("player").value;
    localStorage.setItem("Player", playerName);

    
        
     
            const btn = document.querySelector('#bn');
            // handle button click
            btn.onclick = function () {
                const rbs = document.querySelectorAll('input[name="flexRadioDefault"]');
                let selectedValue;
                for (const rb of rbs) {
                    if (rb.checked) {
                        selectedValue = rb.value;
                        break;
                    }
                }
                const playerName = document.getElementById("player").value;
                localStorage.setItem("Player", playerName);
                localStorage.setItem("StartingMove", selectedValue);
                //part2
                const rbss = document.querySelectorAll('input[name="des"]');
                let slv;
                for (const rb of rbss) {
                    if (rb.checked) {
                        slv = rb.value;
                        break;
                    }
                }
              if(slv=="YES")
              localStorage.setItem("Frstmove", 1);
              else
              localStorage.setItem("Frstmove", 2);
            };
        
    
    return;
}

