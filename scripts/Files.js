import { terrorbox, clickListenerForCardActivator, addCardClickListener } from "./Util.js";
import { getSaveStateList, loadSaveState, deleteState, getCurrentSaveState, saveCurrentStateInNewFile } from "./ServerDataFetcher.js"
import { tconfirmationbox } from "./AddSub_and_AddTeac.js";

function showSaveSateCards() {
    getSaveStateList((data) => {
        let s = `<div class="add card active">
                        <svg height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
                        </svg>
                    </div>`;
        for (let key of data) {
            var temp = key;
            if (key.length > 8) {
                temp = key.slice(0, 6).trim() + "..";
            }
            s += `<div class="d_card card" id="${key}" title="${key}">${temp}</div>`;
        }
        document.querySelector(".container .cards").innerHTML = s;
        addCardClickListener();
        clickListenerForCards();
        clickListenerForCardActivator();
    })
}
showSaveSateCards();

function clickListenerForCards() {
    document.querySelectorAll(".d_card").forEach((e) => {
        e.addEventListener("click", () => {
            document.querySelector(".f_d .f_name input").value = e.id;
            document.querySelector(".btn_con .openThisStateBtn").style.display = "block";
            document.querySelector(".btn_con .ddb").style.display = "block";
            if (document.querySelector(".dsb.new") != null) {
                document.querySelector(".dsb.new").classList.remove("new");
                document.querySelector(".dsb").classList.add("edit");
            }
        })
    })
}
clickListenerForCards();


function updateCurrentStateName() {
    getCurrentSaveState((data) => {
        document.querySelector(".currentStateNameContainer").innerHTML = "Current State: " + data;
    })
}

function clickListenerForOpenBtn() {
    getSaveStateList((data) => {
        document.querySelector(".f_d .openThisStateBtn").addEventListener("click", () => {
            let fileName = document.querySelector(".f_d .f_name input").value.trim().toUpperCase();
            if (fileName == "") {
                terrorbox("Please Enter a Vaild name");
                return;
            }
            if (data.indexOf(fileName) == -1) {
                terrorbox("Given file name is not present, try another name");
                return;
            }
            loadSaveState(fileName)
            updateCurrentStateName();
        })
    })
}
clickListenerForOpenBtn();

function clickListenerForSaveBtn() {
    document.querySelector(".btn_con .dsb").addEventListener("click", () => {
        let fileName = document.querySelector(".f_d .f_name input").value.trim().toUpperCase();
        if (fileName == "") {
            terrorbox("Please Enter a Vaild name");
            return;
        }
        // if(data.indexOf(fileName)!=-1){
        //     tconfirmationbox("Are You Want to Re-write "+fileName,()=>{
        //         saveCurrentStateInNewFile(fileName,()=>{
        //             updateCurrentStateName();
        //             showSaveSateCards();
        //         })
        //     })
        //     return;
        // }
        saveCurrentStateInNewFile(fileName, () => {
            updateCurrentStateName();
            showSaveSateCards();
        })
    })
}
clickListenerForSaveBtn();

function clickListenerForDeleteBtn() {
    document.querySelector(".f_d .ddb").addEventListener("click", () => {
        getSaveStateList((data) => {
            let fileName = document.querySelector(".f_d .f_name input").value.trim().toUpperCase();
            if (fileName == "") {
                terrorbox("Please Enter a Vaild name");
                return;
            }
            if (data.indexOf(fileName) == -1) {
                terrorbox("Given file name is not present, try another name");
                return;
            }
            tconfirmationbox("Are You want to Delete " + fileName + " ?", () => {
                deleteState(fileName, () => {
                    showSaveSateCards();
                    terrorbox("Deleted Successfully", "201, 255, 172");
                });
            })
        })
    })
}
clickListenerForDeleteBtn();