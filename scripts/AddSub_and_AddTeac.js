import { clickListenerForCardActivator, addCardClickListener } from "./Util.js";
import { closeSaveStateBoxFunc } from "./Common.js";

// toggle confirmation box function
export function tconfirmationbox(cmsg="",yesBtnFunc=()=>{},noBtnFunc=()=>{}) {
    document.querySelector(".cBox .cMsg").innerHTML = cmsg;
    document.querySelector(".cBox").classList.toggle("active");
    document.querySelector(".cBoxBG").classList.toggle("active");
    document.querySelector(".cBtns .cBtn").addEventListener("click",()=>{
        yesBtnFunc();
        tconfirmationbox();
    });
    document.querySelector(".cBtns .cancel_btn").addEventListener("click",()=>{
        noBtnFunc();
        tconfirmationbox();
    });
}

//Toggle Confirmation on click of delete btn and clicking outside of the confirmation box
window.onload = function () {
    document.onclick = function (e) {
        if (e.target.classList[0] == "cBoxBG") {
            tconfirmationbox();
        } else if (e.target.classList == "closeSaveStateBox" || e.target.classList[0] == "saveStateBoxBG") {
            document.querySelector(".saveStateBox.active").classList.remove("active");
            document.querySelector(".saveStateBoxBG.active").classList.remove("active");
        }
    };
};

clickListenerForCardActivator();

addCardClickListener();
//hello
