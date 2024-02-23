import { deleteSubject, getSubject, getSubjectListShallow, saveSubject } from "./ServerDataFetcher.js";
import { terrorbox, clickListenerForCardActivator, addCardClickListener } from "./Util.js";
import { tconfirmationbox } from "./AddSub_and_AddTeac.js";

const inputBoxes = document.querySelectorAll(".t_d .con input");

let tempCurrentSubjectData;

let url = window.location.origin + "/" + "io/subjects";
console.log(url)

function saveBtnClickListener() {
    document.querySelector(".dsb").addEventListener("click", () => {
        let val = inputBoxes[0].value.trim().toUpperCase();

        //form validating
        if (val.length > 9) {
            terrorbox("Length of the name must be less than 10");
            return;
        }
        if (val == "") {
            terrorbox("Please Enter a vaild name");
            return;
        }
        //sem validation
        let semValue = inputBoxes[1].value.trim();
        if (semValue == "") {
            terrorbox("Please Enter a Number in semester");
            return;
        }
        try {
            semValue = parseInt(semValue);
        } catch (e) {
            terrorbox("Please Enter a number in semester");
            return;
        }
        if (semValue < 1 || semValue > 8) {
            terrorbox("Value must be in 1 to 8 range in semester");
            return;
        }
        //lecture count validation
        let lecCount = inputBoxes[2].value.trim();
        if (lecCount == "") {
            lecCount = 4;
        }
        try {
            lecCount = parseInt(lecCount);
        } catch (e) {
            terrorbox("Please Enter a number in lecture count per week");
            return;
        }
        if (lecCount < 0 || lecCount > 40) {
            terrorbox("Value must be in range 0 to 40 in lecture count per week");
            return;
        }
        //room code validation
        let rCode = inputBoxes[3].value.trim().toUpperCase();
        if (rCode == "") {
            terrorbox("Please Enter a Classroom name");
            return;
        }

        try {
            rCode = rCode.split(';');
            let temp_rCode = [];
            rCode.forEach((e) => { temp_rCode.push(e.trim()) })
            rCode = temp_rCode;
        } catch (err) {
            terrorbox("Please Enter a Valid Room Code");
            return
        }


        //configuring data to send it on server
        let subjectData = {
            sem: semValue,
            lectureCount: lecCount,
            isPractical: inputBoxes[4].checked,
            roomCodes: rCode
        }
        let m = new Map();
        m[val] = subjectData;

        let found = false;
        //if same name is found then show re-write confirmation pop up
        document.querySelectorAll(".cards .d_card").forEach((e) => {
            if (e.innerHTML == val) {
                found = true;
                tconfirmationbox(`Are you want to rewrite ${val}`, () => {
                    //sending data to server
                    saveSubjectDataAndDoBasicOperations(m);
                }, () => { e.click() })
            }

        })
        //if not found then send the data to server
        if (found == false) {
            saveSubjectDataAndDoBasicOperations(m);
        }
    })
}
saveBtnClickListener();

function saveSubjectDataAndDoBasicOperations(m) {
    console.log(JSON.stringify(m));
    saveSubject(m, () => {
        //if data is updated in server then refresh cards in UI
        loadCards();
        document.querySelector(".add.card").click();
        inputBoxes.forEach((e) => {
            e.style = "";
        })
        tempCurrentSubjectData = m;
    })
}

//Printing HTML code of Card of each Subject
function loadCards() {
    getSubjectListShallow((data) => {
        let s = `<div class="add card active">
                        <svg height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
                        </svg>
                    </div>`;
        for (let key of data) {
            s += `<div class="d_card card">${key}</div>`;
        }
        document.querySelector(".add.card").insertAdjacentHTML("afterend",s);
        clickListenerForCardActivator();
        clickListenerForCards();
    })
}
loadCards();

document.querySelector(".ddb").addEventListener("click", () => {
    tconfirmationbox(`Are you really want to delete ${document.querySelector(".d_card.active").innerHTML}?`, () => {
        deleteSubject(document.querySelector(".d_card.active").innerHTML, () => {
            //if data is deleted in server then refresh cards in UI
            loadCards();
            document.querySelector(".add.card").click();
        })
    });
})


function clickListenerForCards() {
    document.querySelectorAll(".cards .d_card").forEach((e) => {
        e.addEventListener("click", () => {
            inputBoxes.forEach((e) => {
                e.style = "";
            })
            inputBoxes[0].value = e.innerHTML;
            document.querySelector(".btn_con .ddb").style.display = "block";
            if (document.querySelector(".dsb.new") != null) {
                document.querySelector(".dsb.new").classList.remove("new");
                document.querySelector(".dsb").classList.add("edit");
            }

            getSubject(e.innerHTML, (data) => {
                //if data is found in server then show it in details box
                tempCurrentSubjectData = data;
                inputBoxes[1].value = data["sem"];
                inputBoxes[2].value = data["lectureCount"];
                inputBoxes[3].value = data["roomCodes"].join('; ');
                inputBoxes[4].checked = data["isPractical"];
            })
        })
    })
}
clickListenerForCards();

//identifying changes in input box values
inputBoxes[0].addEventListener("input", () => {
    if (document.querySelector(".add.active") != null) return;
    if (inputBoxes[0].value.trim() != document.querySelector(".d_card.active").innerHTML) {
        inputBoxes[0].style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        inputBoxes[0].style.cssText = "background: rgba(0,0,0,0.1);";
    }
})
inputBoxes[1].addEventListener("input", () => {
    if (document.querySelector(".add.active") != null) return;
    if (inputBoxes[1].value.trim() != tempCurrentSubjectData["sem"]) {
        inputBoxes[1].style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        inputBoxes[1].style.cssText = "background: rgba(0,0,0,0.1);";
    }
})
inputBoxes[2].addEventListener("input", () => {
    if (document.querySelector(".add.active") != null) return;
    if (inputBoxes[2].value.trim() != tempCurrentSubjectData["lectureCount"]) {
        inputBoxes[2].style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        inputBoxes[2].style.cssText = "background: rgba(0,0,0,0.1);";
    }
})
inputBoxes[3].addEventListener("input", () => {
    if (document.querySelector(".add.active") != null) return;
    let tempData = [];
    inputBoxes[3].value.trim().toUpperCase().split(";").forEach((e) => {
        tempData.push(e.trim());
    })
    if (JSON.stringify(tempData) != JSON.stringify(tempCurrentSubjectData["roomCodes"])) {
        inputBoxes[3].style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        inputBoxes[3].style.cssText = "background: rgba(0,0,0,0.1);";
    }
})