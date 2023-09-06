import { clickListenerForCardActivator, addCardClickListener, deleteBtnFunc, saveBtnClickListener, clickListenerForCards } from "./Util.js";
//Printing HTML code of Card of each sir
function showcards(){
    let s = "";
    let i = 35;
    for(i; i >= 1; i--){
        s += `<div class="d_card card" id="SIR${i}">SIR${i}</div>`;
    }
    document.querySelector(".container .cards").innerHTML += s;
}
showcards();

clickListenerForCardActivator();

//Click Listener of Save btn
saveBtnClickListener();

addCardClickListener();

clickListenerForCards();

deleteBtnFunc();