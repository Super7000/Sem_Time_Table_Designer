import { clickListenerForCardActivator, addCardClickListener } from "./Util.js";

// toggle confirmation box function
export function tconfirmationbox(messege = "", yesBtnFunc = () => { }, noBtnFunc = () => { }) {
    document.querySelector(".cBox .cMsg").innerHTML = messege;
    document.querySelector(".cBox").classList.toggle("active");
    document.querySelector(".cBoxBG").classList.toggle("active");
    document.querySelector(".cBtns .cBtn").addEventListener("click", () => {
        yesBtnFunc();
        tconfirmationbox();
    });
    document.querySelector(".cBtns .cancel_btn").addEventListener("click", () => {
        noBtnFunc();
        tconfirmationbox();
    });
}

//Toggle Confirmation on click of delete btn and clicking outside of the confirmation box
window.onload = function () {
    document.onclick = function (e) {
        if (e.target.classList[0] == "cBoxBG") {
            tconfirmationbox();
        }
    };
};

clickListenerForCardActivator();

addCardClickListener();

document.querySelector(".search-input").addEventListener("change",()=>{
    let list = [];
    document.querySelectorAll(".d_card").forEach((e)=>{
        list.push(e.innerHTML);
        e.style.cssText = "display: none;";
    })
    let result = match(list,document.querySelector(".search-input").innerHTML.trim());
    result.forEach((e)=>{
        document.querySelectorAll(".d_card")[e].style.cssText = "display: block;";
    })
})
//hello
