import { deleteTeacher, getTeacher, getTeacherList, saveTeacher, getSubjectListShallow } from "./ServerDataFetcher.js";
import { terrorbox, clickListenerForCardActivator, addCardClickListener } from "./Util.js";
import { tconfirmationbox } from "./AddSub_and_AddTeac.js";
//Printing HTML code of Card of each sir
// function showcards() {
//     let s = "";
//     let i = 35;
//     for (i; i >= 1; i--) {
//         s += `<div class="d_card card">SIR${i}</div>`;
//     }
//     document.querySelector(".container .cards").innerHTML += s;
// }
// showcards();

let url = window.location.origin + "/" + "io/teachers";
console.log(url)

//fetching subject list for subject verification
let subjectList = null;
getSubjectListShallow((data)=>{
    subjectList = new Set(data);

}, ()=>{
    subjectList = "unavailable";
});

function saveBtnClickListener() {
    document.querySelector(".dsb").addEventListener("click", () => {
        let val = document.querySelectorAll(".con input")[0].value.trim().toUpperCase();

        //verifying teacher name
        if (val.length > 9) {
            terrorbox("Length of the name must be less than 10");
            return;
        }
        if (val == "") {
            terrorbox("Please Enter a vaild name");
            return;
        }

        //verifying subject
        let subjectInput = document.querySelectorAll(".con input")[1].value.trim().toUpperCase();
        if (subjectInput == "" && subjectInput == null) {
            terrorbox("Please enter at least one subject name");
            return;
        }

        let subjectArray = subjectInput.split(",");

        //Waiting for getSubjectList to succeed or fail
        while (subjectList === null);

        for (let subjectStr of subjectArray) {
            if (subjectList !== "unavailable" && !subjectList.has(subjectStr)) {
                terrorbox("Couldn't find subject - " + subjectStr);
                return;
            }
        }

        // verifying available time
        let freeTimeInput = "[" + document.querySelectorAll(".con input")[2].value.trim() + "]";
        try {
            let jsonInput;
            try {
                jsonInput = JSON.parse(freeTimeInput);
            } catch (err) {
                terrorbox("please enter a vaild time");
                return;
            }
            if (!jsonInput instanceof Array) {
                terrorbox("Please enter a vaild time");
                return;
            }
            for (let slot of jsonInput) {
                if (!slot instanceof Array && !slot.length == 2) {
                    terrorbox("Value must contain integers and length must be 2");
                    return;
                }
                if (isNaN(slot[0]) || isNaN(slot[1])) {
                    terrorbox("Value can't be non-numeric or empty");
                    return;
                }
            }
        } catch (err) {
            console.log("Error in verifying time")
        }


        //configuring data to send it on server
        let teacherData = {
            freeTime: JSON.parse(freeTimeInput),
            subjects: JSON.parse(JSON.stringify(subjectArray))
        }
        let m = new Map();
        m[val] = teacherData;

        let found = false;
        //if same name is found then show re-write confirmation pop up
        document.querySelectorAll(".cards .d_card").forEach((e) => {
            if(e.innerHTML==val){
                found = true;
                tconfirmationbox(`Are you want to rewrite ${val}`,()=>{
                        //sending data to server
                        console.log(JSON.stringify(m));
                        saveTeacher(m, () => {
                        //if data is updated in server then refresh cards in UI
                        loadCards();
                        document.querySelector(".add.card").click();
                    }
                )},()=>{e.click()})
            }

        })
        //if not found then send the data to server
        if(found==false){
            console.log(JSON.stringify(m));
            saveTeacher(m, () => {
                //if data is updated in server then refresh cards in UI
                loadCards();
                document.querySelector(".add.card").click();
            })
        }
    })
}
saveBtnClickListener();

function loadCards() {
    getTeacherList((data) => {
        let s = `<div class="add card active">
                        <svg height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
                        </svg>
                    </div>`;
        for (let key in data) {
            s += `<div class="d_card card" id="SIR${key}">${key}</div>`;
        }
        document.querySelector(".container .cards").innerHTML = s;
        clickListenerForCardActivator();
        clickListenerForCards();
        addCardClickListener();
        try {
            let paramString = window.location.href.split('?')[1];
            let queryString = new URLSearchParams(paramString);
            let urlData;
            for (let pair of queryString.entries()) {
                urlData = [pair[0], pair[1].split("#")[0]];
                break;
            }
            if (urlData[0] == "name") {
                document.getElementById(urlData[1]).click();
            }
        } catch (err) {
            console.log("%cNo Query Found", "color: green");
        }
    })
}
loadCards();

document.querySelector(".ddb").addEventListener("click",()=>{
    tconfirmationbox(`Are you really want to delete ${document.querySelector(".d_card.active").innerHTML}?`,()=>{
        deleteTeacher(document.querySelector(".d_card.active").innerHTML, () => {
            //if data is deleted in server then refresh cards in UI
            loadCards();
            document.querySelector(".add.card").click();
        })
    });
})

function clickListenerForCards() {
    document.querySelectorAll(".cards .d_card").forEach((e) => {
        e.addEventListener("click", () => {
            document.querySelectorAll(".t_d .con input")[0].value = e.innerHTML;
            document.querySelector(".btn_con .ddb").style.display = "block";
            if (document.querySelector(".dsb.new") != null) {
                document.querySelector(".dsb.new").classList.remove("new");
                document.querySelector(".dsb").classList.add("edit");
            }
            getTeacher(e.innerHTML, (data) => {
                //if data is found in server then show it in details box
                let details = data;
                let time = JSON.stringify(details["freeTime"]);
                document.querySelectorAll(".t_d .con input")[1].value = details["subjects"];
                document.querySelectorAll(".t_d .con input")[2].value = time.slice(1, time.length - 1);
            })
        })
    })
}
clickListenerForCards();