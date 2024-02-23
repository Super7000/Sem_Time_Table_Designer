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

function match(l, key) {
    var res = []
    console.log("Search params: ",l,key)
    
    for (let i = 0; i < l.length; i++) {
        
        if (l[i].toLowerCase().indexOf(key.toLowerCase()) != -1) {
            res.push(i)
        }
    }
    console.log("Search result is", res)
    return res
}

document.querySelector(".search-input").addEventListener("change",()=>{
    console.log("worikg")
    let list = [];
    document.querySelectorAll(".d_card").forEach((e)=>{
        list.push(e.innerHTML);
        e.style.cssText = "display: none;";
    })
    let result = match(list,document.querySelector(".search-input").value.trim());
    console.log(document.querySelector(".search-input").value.trim())
    result.forEach((e)=>{
        document.querySelectorAll(".d_card")[e].style.cssText = "display: grid;";
    })
})
//hello
