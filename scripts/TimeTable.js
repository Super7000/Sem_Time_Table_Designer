import { terrorbox } from "./Util.js";
import { getSchedule, getSubject, getSubjectList, getTeacherList, getTimeTableStructure, getSaveStateList } from "./ServerDataFetcher.js";
import { closeSaveStateBoxFunc } from "./Common.js";

let url = window.location.origin + "/";
console.log(url)

//stroing data get from server
let serverDataAboutSubjects = "empty";
let serverDataAboutTeachers = "empty";


//Printing Teacher Cards in Allocation Teacher Box 
function showcards() {
    getTeacherList(teacherRequestFunction);
    function teacherRequestFunction(data) {
        serverDataAboutTeachers = data;
        let s = "";
        for (let key in data) {
            s += `<div class="d_card teacher card available" id="SIR${key}">${key}</div>`;
        }
        document.querySelectorAll(".cardsCon")[0].innerHTML += s;
        clickListenerforAvailableTeacherCards();
    }

    getSubjectList(subjectRequestFunction);
    function subjectRequestFunction(data) {
        serverDataAboutSubjects = data;
        let s = "";
        for (let key in data) {
            s += `<div class="d_card subject card available" id="SUB${key}">${key}</div>`;
        }
        document.querySelectorAll(".cardsCon")[1].innerHTML += s;
        clickListenerforAvailableSubjectCards();
    }
    //     s2 += `<div class="d_card card disabled" onclick="terrorbox('Sir is Busy','255, 203, 130',5000)">SIR${35+i}</div>`;

    // document.querySelectorAll(".cardsCon")[1].innerHTML = s2;
}
showcards();


//Global variables
let sirname; //An unique ID for Sirs of String
let subname; //An unique ID for Subjects of String
let clickedPeriodTime; //array of int with the length of 2 Ex.: [1,2] means day 1 period 2
let isLab;

//Printing HTML code of Time Table for first year
createTimeTable(1);


function clickListenerforAvailableTeacherCards() {
    document.querySelectorAll(".d_card.teacher").forEach((e) => {
        e.addEventListener("click", () => {
            try {
                document.querySelector(".d_card.teacher.active").classList.remove("active");
            } catch (error) {
                console.log("%cnormal error in activating Teacher card", "color: green");
            }
            e.classList.add("active");

            //Making Allocation Teacher Box Popup's btns active according to teacher card is clicked by user
            if (e.innerHTML == sirname) {
                if (document.querySelector(".mainSirsCon .btns .btnOpts .assignSir.active") != null) {
                    document.querySelector(".mainSirsCon .btns .btnOpts .assignSir.active").classList.remove("active");
                    document.querySelector(".mainSirsCon .btns .btnOpts .dnas.active").classList.remove("active");
                    if (document.querySelector(".mainSirsCon .btns .btnOpts .removeSir.active") == null) {
                        document.querySelector(".mainSirsCon .btns .btnOpts .removeSir").classList.add("active");
                    }

                }
            } else {
                if (document.querySelector(".mainSirsCon .btns .btnOpts .assignSir.active") == null) {
                    document.querySelector(".mainSirsCon .btns .btnOpts .assignSir").classList.add("active");
                    document.querySelector(".mainSirsCon .btns .btnOpts .dnas").classList.add("active");
                    if (document.querySelector(".mainSirsCon .btns .btnOpts .removeSir.active") != null) {
                        document.querySelector(".mainSirsCon .btns .btnOpts .removeSir").classList.remove("active");
                    }
                }
            }
        })
    })
}

function clickListenerforAvailableSubjectCards() {
    document.querySelectorAll(".d_card.subject").forEach((e) => {
        e.addEventListener("click", () => {
            try {
                document.querySelector(".d_card.subject.active").classList.remove("active");
            } catch (error) {
                console.log("%cnormal error in activating Subject card", "color: green");
            }
            e.classList.add("active");

            //Making Allocation Teacher Box Popup's btns active according to subject card is clicked by user
            if (e.innerHTML == subname) {
                if (document.querySelector(".mainSubsCon .btns .btnOpts .assignSubject.active") != null) {
                    document.querySelector(".mainSubsCon .btns .btnOpts .assignSubject.active").classList.remove("active");
                    document.querySelector(".mainSubsCon .btns .btnOpts .dnas.active").classList.remove("active");
                    if (document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject.active") == null) {
                        document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject").classList.add("active");
                    }

                }
            } else {
                if (document.querySelector(".mainSubsCon .btns .btnOpts .assignSubject.active") == null) {
                    document.querySelector(".mainSubsCon .btns .btnOpts .assignSubject").classList.add("active");
                    document.querySelector(".mainSubsCon .btns .btnOpts .dnas").classList.add("active");
                    if (document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject.active") != null) {
                        document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject").classList.remove("active");
                    }
                }
            }
        })
    })
}
clickListenerforAvailableSubjectCards();

function makeingClickTeacherCardClassActive(sirname) {
    document.querySelectorAll(".d_card.teacher").forEach((e) => {
        if (e.innerHTML == sirname) {
            e.click();
            if (document.querySelector(".mainSirsCon .btns .btnOpts .removeSir.active") == null) {
                document.querySelector(".mainSirsCon .btns .btnOpts .removeSir").classList.add("active");
            }
        }
    });
}
function makeingClickSubjectCardClassActive(subname) {
    document.querySelectorAll(".d_card.subject").forEach((e) => {
        if (e.innerHTML == subname) {
            e.click();
            if (document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject.active") == null) {
                document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject").classList.add("active");
            }
        }
    });
}


document.querySelector(".cards").addEventListener("wheel", (evt) => {
    evt.preventDefault();
    document.querySelector(".cards").scrollLeft += (evt.deltaY);
});
document.querySelector(".l_t_arrow").addEventListener("click", () => {
    document.querySelector(".cards").scrollLeft -= 190;
});
document.querySelector(".r_t_arrow").addEventListener("click", () => {
    document.querySelector(".cards").scrollLeft += 190;
});


//Function of section btns for click listener
document.querySelectorAll(".section .sec").forEach((c) => {
    c.addEventListener("click", () => {
        if (c != document.querySelector(".sec.active")) {
            document.querySelector(".sec.active").classList.remove("active");
            c.classList.add("active");

            //Updateing Heading of the Time Table
            let s = document.querySelector(".set_time_chart p").innerHTML
            s = s.slice(0, 25) + c.innerHTML;
            document.querySelector(".set_time_chart p").innerHTML = s;

            //updating time table
            createTimeTable(document.querySelector(".sem_cards_container .cards .active").innerHTML[4])

            clickListenerForClass();
        }
    })
})

//Click listener for option btns (Auto Fill, Auto Fill All Semester, Fill Manually)
document.querySelectorAll(".options .opt").forEach((o) => {
    o.addEventListener("click", () => {
        if (o != document.querySelector(".opt.active")) {
            document.querySelector(".opt.active").classList.remove("active");
            o.classList.add("active");
        }
        if (o.innerHTML == "Auto Fill All Semesters") {
            generateTimeTableRequest();
        }
    })
})

//Click Listener for Sem btns
document.querySelectorAll(".sem_cards_container .cards div").forEach((c) => {
    c.addEventListener("click", () => {
        if (c != document.querySelector(".sem_cards_container .cards div.active")) {
            document.querySelector(".sem_cards_container .cards div.active").classList.remove("active");
            c.classList.add("active");

            //Updateing Heading of the Time Table
            let s = document.querySelector(".set_time_chart p").innerHTML
            s = s.slice(0, 15) + c.innerHTML + s.slice(20, s.length);
            document.querySelector(".set_time_chart p").innerHTML = s;

            //updating Time Table
            let semNo = c.innerHTML;
            createTimeTable(semNo[4]);

            //Making click listener for class
            clickListenerForClass();
        }
    })
})

//Printing HTML code for Time Table when value of year is equal to 1 then it prints 7 periods per day outherwise 8 period per day
function createTimeTable(semester) {
    const weeks = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let time = ["9:30AM", "10:20AM", "11:10AM", "12:00PM", "12:50PM", "01:40PM", "02:30PM", "03:20PM", "04:10PM"];
    const time2 = ["9:30AM", "10:20AM", "11:10AM", "12:00PM", "1:40PM", "02:30PM", "03:20PM", "04:10PM"];
    let tl = 9;
    let span_len = 3;
    let lunchTime = [5];
    const lunchString = "LUNCH";
    let section = document.querySelector(".filters .section .sec.active").innerHTML;
    if (section == "A") {
        section = 0;
    } else if (section == "B") {
        section = 1;
    } else if (section == "C") {
        section = 2;
    } else {
        terrorbox("An error occured in showing scedule");
    }
    //checking value of year parameter and changing period counts according to it 
    if (semester == 1 || semester == 2) {
        // time = time2;
        // tl = 8;
        // span_len = 2;
        lunchTime = [4,5];
    }

    let s = `<div class="times">
                <div class="day_time_l">Day/Time</div>`;
    for (var k = 1; k <= tl; k++) {
        s += `<div class="class_label ${k}">${time[k - 1]}</div>`;
    }
    s += `</div>`;
    for (var j = 1; j <= 5; j++) {
        s = s + `<div class="week week_${j}">
                    <div class="s_for_grid week_names">${weeks[j - 1]}</div>`;
        for (var i = 1; i <= tl; i++) {
            if (lunchTime.indexOf(i)!=-1) {
                s = s + `<div class="s_for_grid">
                            ${lunchString[j - 1]}
                        </div>`;
            } else {
                s = s + `   <div class="s_for_grid class class_${i} alloc" data-pt="[${j},${i}]">
                            <div class="period">
                                <div>No Subject</div>
                                <div>No Sir</div>                           
                                <div>Room no.</div>
                            </div>
                        </div>`;
            }

        }
        // if(pc==5){
        //     i++;
        //     s = s + `   <div class="s_for_grid class class_${i} alloc" data-pt="[${j},${i}]" style="grid-column: 7 / span ${span_len};">
        //                     <div class="period">
        //                         <div>Subject</div>
        //                         <div>Sir</div>                           
        //                         <div>Room no.</div>
        //                     </div>
        //                 </div>`;
        // }
        s = s + `</div>`;
    }
    document.querySelector(".set_time_chart .att_chart").innerHTML = s;

    //Updating CSS of week class according to year parameter value
    // if (semester == 1 || semester == 2) {
    //     document.querySelectorAll(".week").forEach((e) => {
    //         e.style.cssText = "grid-template-columns: repeat(9,10.5%);";
    //     })
    //     document.querySelector(".times").style.cssText = "grid-template-columns: repeat(9,10.5%);";
    // }

    //fetching subjectlist for roomCode and isPractical Checking
    getSubjectList(updateTTData);

    //Assigning values to periods function
    function updateTTData(data) {
        for (let j = 1; j <= 5; j++) {
            for (let i = 1; i <= timeTableData[semester - 1][section][j - 1].length; i++) {
                if (lunchTime.indexOf(i)!=-1) {
                    continue;
                }
                //console.log(j+","+i+","+classIterator)
                //checking if array value is null then print only a empty box in time table 
                if (timeTableData[semester - 1][section][j - 1][i - 1][1] == null) {
                    var outOfSyllabusSubject = "&nbsp";
                    i < lunchTime[0] ? outOfSyllabusSubject = "LIB" : outOfSyllabusSubject = "EduSkill";
                    document.querySelector(`.week_${j} .class_${i} .period div:nth-child(1)`).innerHTML = `&nbsp`; //Subject Code Div
                    document.querySelector(`.week_${j} .class_${i} .period div:nth-child(2)`).innerHTML = `${outOfSyllabusSubject}`; //Teacher Name Div
                    document.querySelector(`.week_${j} .class_${i} .period div:nth-child(3)`).innerHTML = `&nbsp`; //Room Code Div
                } else {
                    document.querySelector(`.week_${j} .class_${i} .period div:nth-child(1)`).innerHTML = `${timeTableData[semester - 1][section][j - 1][i - 1][1]}`; //Subject Code Div
                    document.querySelector(`.week_${j} .class_${i} .period div:nth-child(2)`).innerHTML = `${timeTableData[semester - 1][section][j - 1][i - 1][0]}`; //Teacher Name Div

                    //fetching data of the subject for room code
                    if (document.querySelector(`.week_${j} .class_${i} .period div:nth-child(1)`).innerHTML != "Subject") {
                        try {
                            if (data[timeTableData[semester - 1][section][j - 1][i - 1][1]]["isPractical"] == true) {

                                let returnValue = false;
                                try {
                                    let periodSelector = i;
                                    let weekSelector = j;
                                    for (var k = 0; k < 2; k++) {
                                        periodSelector++;
                                        document.querySelector(`.week_${weekSelector} .class_${periodSelector}`).dataset.pt;
                                    }
                                } catch (err) {
                                    returnValue = true;
                                    console.log("merging not possible")
                                }
                                if (returnValue == false) {
                                    document.querySelector(`.week_${j} .class_${i}`).style.cssText = `grid-column: auto / span ${span_len};`;
                                    var periodSelector = i;
                                    for (var k = 1; k < 3; k++) {
                                        periodSelector += 1;
                                        document.querySelector(`.week_${j} .class_${periodSelector}`).remove();
                                    }
                                    document.querySelector(`.week_${j} .class_${i} .period div:nth-child(3)`).innerHTML = data[timeTableData[semester - 1][section][j - 1][i - 1][1]]["roomCode"];
                                    i += 2;
                                }
                            } else {

                                document.querySelector(`.week_${j} .class_${i} .period div:nth-child(3)`).innerHTML = data[timeTableData[semester - 1][section][j - 1][i - 1][1]]["roomCode"];
                            }
                        } catch (err) {
                            console.log("error in showing room code")
                        }
                    }
                }

            }
        }
    }
}


function clickListenerForClass() {
    document.querySelectorAll(".week .class").forEach((e) => {
        e.addEventListener("click", () => {
            if (document.querySelector(".options .opt.manual.active") != null) {
                document.querySelector(".allocTeacherBox").classList.add("active");
                document.querySelector(".allocTeacherBoxBG").classList.add("active");

                if (e.querySelectorAll(".period div")[0].innerHTML != "No Subject" || e.querySelectorAll(".period div")[0].innerHTML != "&nbsp") subname = e.querySelectorAll(".period div")[0].innerHTML;
                if (e.querySelectorAll(".period div")[1].innerHTML != "No Sir") sirname = e.querySelectorAll(".period div")[1].innerHTML;
                makeingClickTeacherCardClassActive(sirname);
                makeingClickSubjectCardClassActive(subname);


                //Making Automatically Scrolled to Allocated teacher in Allocation Teacher Box Popup
                async function scrolledToTeacher() {
                    if (window.location.hash != null) {
                        window.location.href = window.location.href.split("#")[0] + "#SIR" + sirname;
                    } else {
                        window.location.href += "#" + sirname;
                    }
                }

                //Making Automatically Scrolled to Allocated subject in Allocation Teacher Box Popup
                scrolledToTeacher().then(
                    function scrolledToSubject() {
                        if (window.location.hash != null) {
                            window.location.href = window.location.href.split("#")[0] + "#SUB" + subname;
                        } else {
                            window.location.href += "#" + subname;
                        }
                    })


                clickedPeriodTime = JSON.parse(e.dataset.pt);
                try{
                    if (e.querySelectorAll(".period div")[0].innerHTML == "Subject" || e.querySelectorAll(".period div")[0].innerHTML == "&nbsp")
                    {
                        // isLab = serverDataAboutSubjects[e.querySelectorAll(".period div")[0].innerHTML]["isPractical"]
                    } else {
                        isLab = serverDataAboutSubjects[e.querySelectorAll(".period div")[0].innerHTML]["isPractical"]
                    }
                } catch (err){
                    console.log(e.querySelectorAll(".period div")[0].innerHTML != "Subject" || e.querySelectorAll(".period div")[0].innerHTML != "&nbsp")
                }
            }
        })
    })
}
clickListenerForClass();

//Sending generate request to server on "Auto fill all semester" btn click
function generateTimeTableRequest() {
    document.querySelector(".loader_container").style.cssText = "display: block;";
    console.log(`${url}io/schedule?generateNew=True`);
    console.log("%cGenerate Request Send", "color: blue");
    let status;
    fetch(`${url}io/schedule?generateNew=True`)
        .then(Response => {
            status = Response.status;
            return Response.text();
        })
        .then(data => {
            if (status != 200) {
                terrorbox("Failed to generate beacause:<br>" + data);
                document.querySelector(".loader_container").style.cssText = "display: none;";
                return
            }
            console.log(JSON.parse(data));
            storeScheduleData(JSON.parse(data))
            document.querySelector(".loader_container").style.cssText = "display: none;";
        })
}




//Fill Manually Scipts




//Yes btn click listener of allocated teacher box popup
document.querySelector(".mainSirsCon .btns .btnOpts .assignSir").addEventListener("click", () => {
    if (document.querySelector(".mainSirsCon .btns .btnOpts .assignSir.active") != null) {
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = document.querySelector(".d_card.teacher.active").innerHTML;
    }
})
document.querySelector(".mainSubsCon .btns .btnOpts .assignSubject").addEventListener("click", () => {
    if (document.querySelector(".mainSubsCon .btns .btnOpts .assignSubject.active") != null) {
        // if(document.querySelector(".d_card.subject.active").innerHTML == "LIB" || document.querySelector(".d_card.subject.active").innerHTML == "NPTEL"){
        //     document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = "&nbsp";
        //     document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = document.querySelector(".d_card.subject.active").innerHTML;
        //     document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = "&nbsp";
        //     return
        // }
        let subjectName = document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML;
        let roomNo = document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML;
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = document.querySelector(".d_card.subject.active").innerHTML;
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = serverDataAboutSubjects[document.querySelector(".d_card.subject.active").innerHTML]["roomCode"];

        //checking if practical then marge 3 classes
        let subjectsData = serverDataAboutSubjects[document.querySelector(".d_card.subject.active").innerHTML];
        let returnValue = false;
        if (subjectsData["isPractical"] == true) {

            //checking if margeing is possible
            try {
                let periodSelector = clickedPeriodTime[1];
                let weekSelector = clickedPeriodTime[0];
                for (var i = 0; i < 2; i++) {
                    periodSelector++;
                    document.querySelector(`.week_${weekSelector} .class_${periodSelector}`).dataset.pt;
                }
            } catch (err) {
                returnValue = true;
                if (isLab != true) {

                    terrorbox("you can't set a lab subject at this time");
                    document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = subjectName;
                    try {
                        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = serverDataAboutSubjects[subjectName]["roomCode"];
                    } catch (error) {
                        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = roomNo;
                    }

                } else {
                    document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = document.querySelector(".d_card.subject.active").innerHTML;
                    document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = subjectsData["roomCode"];
                }
            }

            //mergeing classes code here
            if (returnValue == false) {
                // document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = serverDataAboutSubjects[document.querySelector(".d_card.subject.active").innerHTML]["roomCode"];
                isLab = true;
                let span_len = 3;
                let grid_start = JSON.parse(document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).dataset.pt)[1] + 1;
                document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).style.cssText = `grid-column: span ${span_len};`;
                var periodSelector = clickedPeriodTime[1];
                for (var i = 1; i < 3; i++) {
                    periodSelector += 1;
                    document.querySelector(`.week_${clickedPeriodTime[0]} .class_${periodSelector}`).remove();
                }
            }
        } else {
            // document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(3)`).innerHTML = serverDataAboutSubjects[document.querySelector(".d_card.subject.active").innerHTML]["roomCode"];
            removeLabClassAndPlaceTwoClass();
        }
    }
})

function removeLabClassAndPlaceTwoClass() {
    if (isLab != true) {
        return;
    }
    if (isLab == true) {
        let periodNumber = clickedPeriodTime[1] + 3;
        let weekNumber = clickedPeriodTime[0];
        for (var i = 1; i < 3; i++) {
            periodNumber = periodNumber - 1;
            let position = document.querySelector(`.week_${clickedPeriodTime[0]}`).children[clickedPeriodTime[1] + 1];

            //creating a class HTML element
            let newNode = document.createElement("div");
            let period = document.createElement("div")
            period.classList.add("period");
            let subjectdiv = document.createElement("div");
            subjectdiv.innerHTML = "Subject";
            let sirdiv = document.createElement("div");
            sirdiv.innerHTML = "Sir";
            let roomdiv = document.createElement("div");
            roomdiv.innerHTML = "Room no.";
            period.appendChild(subjectdiv);
            period.appendChild(sirdiv);
            period.appendChild(roomdiv);
            newNode.appendChild(period);
            newNode.classList.add(`s_for_grid`,`class`,`class_${periodNumber}`,`alloc`);
            newNode.setAttribute("data-pt", `[${weekNumber},${periodNumber}]`)
            // let newElement = `<div class="s_for_grid class class_${i} alloc" data-pt="[${j},${i}]">
            //                     <div class="period">
            //                         <div>Subject</div>
            //                         <div>Sir</div>                           
            //                         <div>Room no.</div>
            //                     </div>
            //                 </div>`;


            //adding the HTML element after current Time
            document.querySelector(`.week_${clickedPeriodTime[0]}`).insertBefore(newNode, position);
        }
        clickListenerForClass();
        isLab = false;
    }
    let span_len = 1;
    let grid_start = JSON.parse(document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).dataset.pt)[1] + 1;
    document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).style.cssText = `grid-column: ${grid_start} / span ${span_len};`;
}

//Remove btn click listener of allocated teacher box popup
document.querySelector(".mainSirsCon .btns .btnOpts .removeSir").addEventListener("click", () => {
    if (document.querySelector(".mainSirsCon .btns .btnOpts .removeSir.active") != null) {
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = "No Sir";
        try {
            document.querySelector(".d_card.teacher.active").classList.remove("active");
            document.querySelector(".mainSirsCon .btns .btnOpts .removeSir.active").classList.remove("active");
            document.querySelector(".allocTeacherBoxBG").click();
        } catch (error) {
            console.log("%cerror in remove teacher", "color: red")
        }
        sirname = "No Sir";
    }
})
document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject").addEventListener("click", () => {
    if (document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject.active") != null) {
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = "No Subject";
        try {
            document.querySelector(".d_card.subject.active").classList.remove("active");
            document.querySelector(".mainSubsCon .btns .btnOpts .removeSubject.active").classList.remove("active");
            document.querySelector(".allocTeacherBoxBG").click();
            removeLabClassAndPlaceTwoClass();
        } catch (error) {
            console.log("%cerror in remove subject", "color: red")
        }
        subname = "No Subject";
    }
})

//Hiding Allocation Teacher Box Popup when clicking outside of the box and btns
window.onload = () => {
    document.onclick = function (e) {
        if (e.target.classList[0] == "allocTeacherBoxBG" || e.target.classList[0] == "assignSir" || e.target.classList[0] == "assignSubject" || e.target.classList[0] == "dnas") {
            document.querySelector(".allocTeacherBox").classList.remove("active");
            document.querySelector(".allocTeacherBoxBG").classList.remove("active");
        } else if (e.target.classList == "closeSaveStateBox" || e.target.classList[0] == "saveStateBoxBG") {
            document.querySelector(".saveStateBox.active").classList.remove("active");
            document.querySelector(".saveStateBoxBG.active").classList.remove("active");
        }
    };

    //trying to fetch Time table data If it already generated
    try {
        getSchedule((data) => {
            console.log(data);
            storeScheduleData(data);
        })
    } catch (err) {
        console.log("err in scedule fetching")
    }
};
function storeScheduleData(data){
    for (let sem = 0; sem < data.length; sem++) {
        for (let sec = 0; sec <data[sem].length; sec++) {
            timeTableData[sem * 2][sec] = data[sem][sec];
            timeTableData[sem * 2 + 1][sec] = data[sem][sec];
        }
    }
    createTimeTable(document.querySelector(".sem_cards_container .cards div.active").innerHTML[4]);
    clickListenerForClass();
}




function main(){



}