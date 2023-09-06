import { clickListenerForCardActivator, addCardClickListener, deleteBtnFunc, saveBtnClickListener, clickListenerForCards } from "./Util.js";
//Printing HTML code of Card of each Subject
function showcards(){
    let s = "";
    let i = 8;
    for(i; i >= 1; i--){
        s += `<div class="d_card card">SUB${i}</div>`;
    }
    document.querySelector(".container .cards").innerHTML = document.querySelector(".container .cards").innerHTML + s;
}
showcards();

clickListenerForCardActivator();

//Click Listener of Save btn
saveBtnClickListener();

addCardClickListener();

clickListenerForCards();

deleteBtnFunc();