import { getSubject, getSubjectList, getTeacher, getTeacherList, getTeacherSchedule } from "./ServerDataFetcher.js";

let url = window.location.origin + "/" + "io/teachers";
console.log(url)

let subjectList;
window.onload = () => {
    getSubjectList((data) => {
        subjectList = data;
    })
    function getTechersFromServer() {
        getTeacherList((data) => {
            let s = "";
            for (var i in data) {
                let tts = [];
                for (var j = 0; j < 5; j++) {
                    tts[j] = Math.floor(Math.random() * 8) + 1;
                }
                s += `<div class="t_card" data-tts="[${tts}]" data-sems="[5,6,8]"> <!-- tts = total time spend -->
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
                        </svg>
                        <p>${i}</p>
                    </div>`;
            }
            document.querySelector(".teachers .r_cards").innerHTML = s;
            document.querySelectorAll(".teachers .r_cards .t_card")[0].classList.add("active");
            clickListenerForTeacherCard();
            document.querySelector(".r_cards .t_card.active").click();
        })
    }
    getTechersFromServer();
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

            //Updating Charts 
            chart1.data.datasets[0].data = JSON.parse(t.dataset.tts);
            chart1.update();
            document.querySelector(".set_time_chart p").innerHTML = "Time Table for " + document.querySelector(".t_card.active p").innerHTML + " Sir";


            //semesters printer
            let sems = JSON.parse(t.dataset.sems);
            let sem_str = "";
            for (let a = 0; a < sems.length; a++) {
                sem_str += `<div>${sems[a]}</div>`;
            }
            document.querySelector(".semnc").innerHTML = sem_str;

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
                    createTT(data);
                }
            })
        })
    });

}

function createTT(data) {
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
        for (var i = 1; i <= 9; i++) {
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
                        s = s + `<div class="s_for_grid class class_${i} alloc" style="grid-column: ${i+1}/span 3">
                                    <div class="period">
                                        <div>${data[j - 1][i - 1][2]}</div>
                                        <div>Sem ${data[j - 1][i - 1][0]}-${section[data[j - 1][i - 1][1]]}</div>                           
                                        <div>${subjectList[data[j - 1][i - 1][2]]["roomCode"]}</div>
                                    </div>
                                </div>`;
                                i+=2;
                    } else {
                        s = s + `<div class="s_for_grid class class_${i} alloc">
                                    <div class="period">
                                        <div>${data[j - 1][i - 1][2]}</div>
                                        <div>Sem ${data[j - 1][i - 1][0]}-${section[data[j - 1][i - 1][1]]}</div>                           
                                        <div>${subjectList[data[j - 1][i - 1][2]]["roomCode"]}</div>
                                    </div>
                                </div>`;
                    }
                }
            }
        }
        s = s + `</div>`;
    }
    document.querySelector(".set_time_chart .att_chart").innerHTML = s;
    document.querySelector(".set_time_chart .att_chart").style.cssText = "justify-content: stretch; align-content: stretch;"
}
// var b = new teach([545]);
// function fun(a)
// {
//     var text = JSON.stringify([a,b,document.querySelector(".inp").value]);
//     var file = new Blob([text], {type: "text/plain"});
//     var a = document.querySelector('.btn');
//     a.href = URL.createObjectURL(file);
//     a.download = "tempsavefile.txt";
//     URL.revokeObjectURL(file);
// }
// async function loadfun()
// {
//     var file = document.querySelector(".load").files[0];
//     var fr=new FileReader();
//     fr.onload=function(){
//         alert(JSON.parse(fr.result)[0].sems);
//         document.querySelector(".inp").value = JSON.parse(fr.result)[2];
//     }

//     fr.readAsText(file);
// }








// const weeks = ["Tue","Wed","Thu","Fri","Sat"];
//     let s = `<div class="times">
//                 <div class="day_time_l">Day/Time</div>
//                 <div class="class_label 1">9:30AM</div>
//                 <div class="class_label 2">10:20AM</div>
//                 <div class="class_label 3">11:10AM</div>
//                 <div class="class_label 4">12:00PM</div>
//                 <div class="class_label 5">01:40PM</div>
//                 <div class="class_label 6">02:30PM</div>
//                 <div class="class_label 7">03:20PM</div>
//                 <div class="class_label 8">04:10PM</div>
//             </div>`;
//     for(j=1; j<=5; j++){
//         s = s + `<div class="week week_${j}">
//                     <div class="week_names">${weeks[j-1]}</div>`;
//         for(i=1;i<=8;i++){
//             s = s + `   <div class="class class_${i}" title="OOPS, SEM 5, LH-123">
//                             <div>OOPS</div>
//                             <div>SEM 5</div>                           
//                             <div>LH-123</div>
//                         </div>`
//         }
//         s = s + `</div>`
//     }
//     document.querySelector(".set_time_chart .att_chart").innerHTML = s;










// chart data
const labels = ["tue", "wed", "thu", "fri", "sat"];
let data = {
    labels: labels,
    datasets: [{
        label: "",
        data: [6, 4, 2, 6, 8],
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

getTeacherSchedule("SC", (data) => {
    console.log(data);
})