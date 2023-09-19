import { clickListenerForCardActivator, addCardClickListener } from "./Util.js";
import { closeSaveStateBoxFunc } from "./Common.js";

// toggle confirmation box function
function tconfirmationbox(cmsg) {
    document.querySelector(".cBox .cMsg").innerHTML = cmsg;
    document.querySelector(".cBox").classList.toggle("active");
    document.querySelector(".cBoxBG").classList.toggle("active");
}

//Toggle Confirmation on click of delete btn and clicking outside of the confirmation box
window.onload = function () {
    document.onclick = function (e) {
        if (e.target.classList == "ddb") {
            tconfirmationbox(`Are you really want to delete ${document.querySelector(".d_card.active").innerHTML}?`);
        } else if (e.target.classList[0] == "cBoxBG" || e.target.classList[1] == "btn") {
            tconfirmationbox(" ");
        } else if (e.target.classList == "closeSaveStateBox" || e.target.classList[0] == "saveStateBoxBG") {
            document.querySelector(".saveStateBox.active").classList.remove("active");
            document.querySelector(".saveStateBoxBG.active").classList.remove("active");
        }
    };
};

clickListenerForCardActivator();

addCardClickListener();
//hello
