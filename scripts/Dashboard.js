import { getCurrentSaveState, getSaveStateList, getSubject, getSubjectList, getTeacher, getTeacherList, getTeacherSchedule, loadSaveState } from "./ServerDataFetcher.js";

let url = window.location.origin + "/" + "io/teachers";
console.log(url)

let subjectList;
window.onload = () => {
    getSubjectList((data) => {
        subjectList = data;
    })

    showTeacherCards();
}
function showTeacherCards() {
    getTeacherList((data) => {
        let s = "";
        for (var i in data) {
            s += `<div class="t_card"> <!-- tts = total time spend -->
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-href="${window.location.origin}/AddTeacher.html?name=SIR${i}#SIR${i}">
                        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
                    </svg>
                    <p>${i}</p>
                </div>`;
        }
        document.querySelector(".teachers .r_cards").innerHTML = s;
        document.querySelectorAll(".teachers .r_cards .t_card")[0].classList.add("active");
        clickListenerForTeacherCard();
        clickListenerForTeacherCardEditBtn();
        document.querySelector(".r_cards .t_card.active").click();
    })
}

document.querySelector(".r_cards").addEventListener("wheel", (evt) => {
    evt.preventDefault();
    document.querySelector(".r_cards").scrollLeft += (evt.deltaY);
});
document.querySelector(".r_l_arrow").addEventListener("click", () => {
    document.querySelector(".r_cards").scrollLeft -= 130;
});
document.querySelector(".r_r_arrow").addEventListener("click", () => {
    document.querySelector(".r_cards").scrollLeft += 130;
});

function clickListenerForTeacherCard() {
    document.querySelectorAll(".t_card").forEach((t) => {
        t.addEventListener("click", () => {
            if (t != document.querySelector(".t_card.active")) {
                document.querySelector(".t_card.active").classList.remove("active");
                t.classList.add("active");
            }

            //Updating Chart Heading
            document.querySelector(".set_time_chart p").innerHTML = "Time Table for " + document.querySelector(".t_card.active p").innerHTML + " Sir";


            //semesters printer
            let sems = [];
            getTeacher(t.querySelector("p").innerHTML,(data)=>{
                data["subjects"].forEach((e)=>{
                    getSubject(e,(subjectData)=>{
                        sems.push(subjectData["sem"]);
                        let sem_str = "";
                        for (let a = 0; a < sems.length; a++) {
                            sem_str += `<div>${sems[a]}</div>`;
                        }
                        document.querySelector(".semnc").innerHTML = sem_str;
                    })
                })
            })
            // let sems = JSON.parse(t.dataset.sems);
            

            //subjects updater
            getTeacher(t.querySelector("p").innerHTML, (data) => {
                let subjects = "";
                for (var i = 0; i < data["subjects"].length; i++) {
                    subjects += `<div>${data["subjects"][i]}</div>`;
                }
                document.querySelector(".right .details .subjects .snc").innerHTML = subjects;
            })

            //updating teacher's time table
            getTeacherSchedule(t.querySelector("p").innerHTML, (data, status) => {
                if (status == 200) {
                    createTimeTable(data);
                }
            })
        })
    });

}

function createTimeTable(data,numberOfPeriodsPerDay=9) {
    let totalTimeSpend = [];
    const weeks = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    const time = ["9:30AM", "10:20AM", "11:10AM", "12:00PM", "12:50PM", "01:40PM", "02:30PM", "03:20PM", "04:10PM"];
    const lunch = "LUNCH";
    let section = ["A", "B", "C"];
    let s = `<div class="times">
                <div class="day_time_l">Day/Time</div>`;
    for (var k = 1; k <= time.length; k++) {
        s += `<div class="class_label ${k}">${time[k - 1]}</div>`;
    }
    s += `</div>`;
    for (var j = 1; j <= 5; j++) {
        s = s + `<div class="week week_${j}">
                    <div class="s_for_grid week_names">${weeks[j - 1]}</div>`;
        let totalTimeSpendPerDay = 0;
        for (var i = 1; i <= numberOfPeriodsPerDay; i++) {
            if (i == 5) {
                s = s + `<div class="s_for_grid">
                                <div>${lunch[j - 1]}</div>  
                        </div>`;
            } else {
                if (data[j - 1][i - 1] == null) {
                    s = s + `<div class="s_for_grid class class_${i}">
                                <div class="period">
                                    <div>&nbsp</div>
                                    <div>&nbsp</div>                           
                                    <div>&nbsp</div>
                                </div>
                            </div>`;
                } else {
                    if (subjectList[data[j - 1][i - 1][2]]["isPractical"] == true) {
                        s = s + `<div class="s_for_grid class class_${i} alloc" style="grid-column: ${i + 1}/span 3">
                                    <div class="period">
                                        <div>${data[j - 1][i - 1][2]}</div>
                                        <div>Sem ${data[j - 1][i - 1][0]}-${section[data[j - 1][i - 1][1]]}</div>                           
                                        <div>${data[j - 1][i - 1][3]}</div>
                                    </div>
                                </div>`;
                        i += 2;
                        totalTimeSpendPerDay += 3;
                    } else {
                        s = s + `<div class="s_for_grid class class_${i} alloc">
                                    <div class="period">
                                        <div>${data[j - 1][i - 1][2]}</div>
                                        <div>Sem ${data[j - 1][i - 1][0]}-${section[data[j - 1][i - 1][1]]}</div>                           
                                        <div>${data[j - 1][i - 1][3]}</div>
                                    </div>
                                </div>`;
                        totalTimeSpendPerDay += 1;
                    }
                }
            }
        }
        totalTimeSpend.push(totalTimeSpendPerDay);
        s = s + `</div>`;
    }
    chart1.data.datasets[0].data = totalTimeSpend;
    chart1.update();
    document.querySelector(".set_time_chart .att_chart").innerHTML = s;
    document.querySelector(".set_time_chart .att_chart").style.cssText = "justify-content: stretch; align-content: stretch;"
}




// chart data
const labels = ["tue", "wed", "thu", "fri", "sat"];
let data = {
    labels: labels,
    datasets: [{
        label: "",
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
            '#1479FF',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            '#37DBE6',
            '#14A5FF'
        ],
        // borderColor: [
        // 'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)'
        // ],
        // borderWidth: 1,
        borderRadius: 5,
        barThickness: 10,

    }]
};
// left side chart 
let chart1 = new Chart(
    document.querySelectorAll('#main_chart')[0], {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 8
            }
        }
    },
});

// console.log(chart1);


getSaveStateList(showSavedStates)

function showSavedStates(data) {
    getCurrentSaveState((currentStateName) => {
        let s = "";
        for (var i = 0; i < data.length; i++) {
            if (data[i] == currentStateName) {
                s += `<div class="active">${data[i]}</div>`;
            } else {
                s += `<div>${data[i]}</div>`;
            }
        }
        document.querySelector(".scedules .scedule_container").innerHTML = s;
        clickListenerForSaveStateActivating();
    })
}

function clickListenerForSaveStateActivating() {
    document.querySelectorAll(".scedules .scedule_container div").forEach((e) => {
        e.addEventListener("click", () => {
            if (document.querySelector(".scedules .scedule_container div.active") != e) {
                document.querySelector(".scedules .scedule_container div.active").classList.remove("active");
                e.classList.add("active");
                loadSaveState(document.querySelector(".scedules .scedule_container div.active").innerHTML, (data) => {
                    console.log(data)
                    showTeacherCards();
                })
                getCurrentSaveState((data)=>{
                    document.querySelector(".currentStateNameContainer").innerHTML = "Current State: "+data;
                })
            }
        })
    })
}

function clickListenerForTeacherCardEditBtn() {
    document.querySelectorAll(".t_card svg").forEach((e) => {
        e.addEventListener("click", () => {
            window.location.href = e.dataset.href;
        })
    })
}