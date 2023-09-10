import { terrorbox } from "./Util.js"
//Printing HTML code of Time Table for first year
createTT(1);

let url = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
console.log(url)


//stroing data get from server
let serverDataAboutSubjects = "";
let serverDataAboutTeachers = "";


//Printing Teacher Cards in Allocation Teacher Box 
function showcards(){
    let urlForSirs = url + "io/teachers";
    console.log(urlForSirs)
    let teacherDataStatus;
    fetch(urlForSirs)
    .then(Response => {
        teacherDataStatus = Response.status;
        return Response.text();
    })
    .then(data => {
        if(teacherDataStatus!=200){
            return;
        }
        serverDataAboutTeachers = data;
        let s = "";
        for (let key in JSON.parse(data)) {
            s += `<div class="d_card teacher card available" id="SIR${key}">${key}</div>`;
        }
        document.querySelectorAll(".cardsCon")[0].innerHTML = s;
        clickListenerforAvailableTeacherCards();
    })
    let urlForSubj = url + "io/subjects";
    console.log(urlForSubj)
    let subjectDataStatus;
    fetch(urlForSubj)
    .then(Response => {
        subjectDataStatus = Response.status;
        return Response.text();
    })
    .then(data => {
        if(subjectDataStatus!=200){
            return;
        }
        serverDataAboutSubjects = data;
        let s = "";
        for (let key in JSON.parse(data)) {
            s += `<div class="d_card subject card available" id="SUB${key}">${key}</div>`;
        }
        document.querySelectorAll(".cardsCon")[1].innerHTML = s;
        clickListenerforAvailableSubjectCards();
    })
    //     s2 += `<div class="d_card card disabled" onclick="terrorbox('Sir is Busy','255, 203, 130',5000)">SIR${35+i}</div>`;
    
    // document.querySelectorAll(".cardsCon")[1].innerHTML = s2;
}
showcards();
    

//Global variables
let sirname; //An unique ID for Sirs of String
let subname; //An unique ID for Subjects of String
let clickedPeriodTime; //2D array of int Ex.: [1,2] means day 1 period 2
let isLab;

function clickListenerforAvailableTeacherCards(){
    document.querySelectorAll(".d_card.teacher").forEach((e)=>{
        e.addEventListener("click",()=>{         
                try {
                    document.querySelector(".d_card.teacher.active").classList.remove("active");
                } catch (error) {
                    console.log("%cnormal error in activating Teacher card","color: green");
                }
                e.classList.add("active");

                //Making Allocation Teacher Box Popup's btns active according to teacher card is clicked by user
                if(e.innerHTML == sirname){
                    if(document.querySelector(".mainSirsCon .btns .btnOpts .as.notactive")==null){
                        document.querySelector(".mainSirsCon .btns .btnOpts .as").classList.add("notactive");
                        document.querySelector(".mainSirsCon .btns .btnOpts .dnas").classList.add("notactive");
                        if(document.querySelector(".mainSirsCon .btns .btnOpts .rs.notactive")!=null){
                            document.querySelector(".mainSirsCon .btns .btnOpts .rs").classList.remove("notactive");
                        }
                        
                    }
                } else {
                    if(document.querySelector(".mainSirsCon .btns .btnOpts .as.notactive")!=null){
                        document.querySelector(".mainSirsCon .btns .btnOpts .as").classList.remove("notactive");
                        document.querySelector(".mainSirsCon .btns .btnOpts .dnas").classList.remove("notactive");
                        if(document.querySelector(".mainSirsCon .btns .btnOpts .rs.notactive")==null){
                            document.querySelector(".mainSirsCon .btns .btnOpts .rs").classList.add("notactive");
                        }
                    }
                }
        })
    })
}
clickListenerforAvailableTeacherCards();

function clickListenerforAvailableSubjectCards(){
    document.querySelectorAll(".d_card.subject").forEach((e)=>{
        e.addEventListener("click",()=>{         
                try {
                    document.querySelector(".d_card.subject.active").classList.remove("active");
                } catch (error) {
                    console.log("%cnormal error in activating Subject card","color: green");
                }
                e.classList.add("active");

                //Making Allocation Teacher Box Popup's btns active according to subject card is clicked by user
                if(e.innerHTML == subname){
                    if(document.querySelector(".mainSubsCon .btns .btnOpts .as.notactive")==null){
                        document.querySelector(".mainSubsCon .btns .btnOpts .as").classList.add("notactive");
                        document.querySelector(".mainSubsCon .btns .btnOpts .dnas").classList.add("notactive");
                        if(document.querySelector(".mainSubsCon .btns .btnOpts .rs.notactive")!=null){
                            document.querySelector(".mainSubsCon .btns .btnOpts .rs").classList.remove("notactive");
                        }
                        
                    }
                } else {
                    if(document.querySelector(".mainSubsCon .btns .btnOpts .as.notactive")!=null){
                        document.querySelector(".mainSubsCon .btns .btnOpts .as").classList.remove("notactive");
                        document.querySelector(".mainSubsCon .btns .btnOpts .dnas").classList.remove("notactive");
                        if(document.querySelector(".mainSubsCon .btns .btnOpts .rs.notactive")==null){
                            document.querySelector(".mainSubsCon .btns .btnOpts .rs").classList.add("notactive");
                        }
                    }
                }
        })
    })
}
clickListenerforAvailableSubjectCards();

function makeingClickTeacherCardClassActive(sirname){
    document.querySelectorAll(".d_card.teacher").forEach((e)=>{
        if(e.innerHTML==sirname){
            e.click();
        }
    });
}
function makeingClickSubjectCardClassActive(subname){
    document.querySelectorAll(".d_card.subject").forEach((e)=>{
        if(e.innerHTML==subname){
            e.click();
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
document.querySelectorAll(".section .sec").forEach((c)=>{
    c.addEventListener("click",()=>{
        if (c != document.querySelector(".sec.active")) {
            document.querySelector(".sec.active").classList.remove("active");
            c.classList.add("active");

            //Updateing Heading of the Time Table
            let s = document.querySelector(".set_time_chart p").innerHTML
            s = s.slice(0,25) + c.innerHTML;
            document.querySelector(".set_time_chart p").innerHTML = s;
        }
    })
})

//Click listener for option btns (Auto Fill, Auto Fill All Semester, Fill Manually)
document.querySelectorAll(".options .opt").forEach((o)=>{
    o.addEventListener("click",()=>{
        if (o != document.querySelector(".opt.active")) {
            document.querySelector(".opt.active").classList.remove("active");
            o.classList.add("active");
        }
    })
})

//Click Listener for Sem btns
document.querySelectorAll(".sem_cards_container .cards div").forEach((c)=>{
    c.addEventListener("click",()=>{
        if (c != document.querySelector(".sem_cards_container .cards div.active")) {
            document.querySelector(".sem_cards_container .cards div.active").classList.remove("active");
            c.classList.add("active");

            //Updateing Heading of the Time Table
            let s = document.querySelector(".set_time_chart p").innerHTML
            s = s.slice(0,15) + c.innerHTML + s.slice(20,s.length);
            document.querySelector(".set_time_chart p").innerHTML = s;

            //updating Time Table
            if(c.innerHTML == "Sem 1" || c.innerHTML =="Sem 2"){
                createTT(1);
            } else {
                createTT();
            }

            //Making click listener for class
            clickListenerForClass();
        }
    })
})

//Printing HTML code for Time Table when value of year is equal to 1 then it prints 7 periods per day outherwise 8 period per day
function createTT(year){
    const weeks = ["Tue","Wed","Thu","Fri","Sat"];
    let time = ["9:30AM","10:20AM","11:10AM","12:00PM","12:50PM","01:40PM","02:30PM","03:20PM","04:10PM"];
    const time2 = ["9:30AM","10:20AM","11:10AM","12:00PM","1:40PM","02:30PM","03:20PM","04:10PM"];
    let tl=9;
    let span_len=3;
    let lunchTime = 5;
    const lunchString = "LUNCH";
    //checking value of year parameter and changing period counts accrding to it 
    if(year==1){
        time = time2;
        tl = 8;
        span_len = 2;
        lunchTime = 4;
    }

    let s = `<div class="times">
                <div class="day_time_l">Day/Time</div>`;
    for(var k=1;k<=tl;k++){
        s += `<div class="class_label ${k}">${time[k-1]}</div>`;
    }
    s += `</div>`;
    for(var j=1; j<=5; j++){
        s = s + `<div class="week week_${j}">
                    <div class="s_for_grid week_names">${weeks[j-1]}</div>`;
        for(var i=1;i<=tl;i++){
            if(i==lunchTime){
                s = s + `<div class="s_for_grid">
                            ${lunchString[j-1]}
                        </div>`;
            } else {
                s = s + `   <div class="s_for_grid class class_${i} alloc" data-pt="[${j},${i}]">
                            <div class="period">
                                <div>Subject</div>
                                <div>Sir</div>                           
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
    if(year==1){        
        document.querySelectorAll(".week").forEach((e)=>{
            e.style.cssText = "grid-template-columns: 10.5% 10.5% 10.5% 10.5% 10.5% 10.5% 10.5% 10.5% 10.5%;";
        })
        document.querySelector(".times").style.cssText = "grid-template-columns: 10.5% 10.5% 10.5% 10.5% 10.5% 10.5% 10.5% 10.5% 10.5%;";
    }
}


function clickListenerForClass(){
    document.querySelectorAll(".week .class").forEach((e)=>{
        e.addEventListener("click",()=>{
            if(document.querySelector(".options .opt.manual.active")!=null){            
                document.querySelector(".allocTeacherBox").classList.add("active");
                document.querySelector(".allocTeacherBoxBG").classList.add("active");

                subname = e.querySelectorAll(".period div")[0].innerHTML;
                sirname = e.querySelectorAll(".period div")[1].innerHTML;
                makeingClickTeacherCardClassActive(sirname);
                makeingClickSubjectCardClassActive(subname);


                //Making Automatically Scrolled to Allocated teacher in Allocation Teacher Box Popup
                if(window.location.hash != null)
                {
                    window.location.href = window.location.href.split("#")[0] + "#SIR"+sirname;
                } else {
                    window.location.href += "#"+sirname;
                }
                
                //Making Automatically Scrolled to Allocated subject in Allocation Teacher Box Popup
                setTimeout(()=>{
                    if(window.location.hash != null)
                    {
                        window.location.href = window.location.href.split("#")[0] + "#SUB"+subname;
                    } else {
                        window.location.href += "#"+subname;
                    }
                },300);                    
                    
                
                clickedPeriodTime = JSON.parse(e.dataset.pt);
            }
        })
    })
}
clickListenerForClass();


//Yes btn click listener of allocated teacher box popup
document.querySelector(".mainSirsCon .btns .btnOpts .as").addEventListener("click",()=>{
    if(document.querySelector(".mainSirsCon .btns .btnOpts .as.notactive")==null){
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = document.querySelector(".d_card.teacher.active").innerHTML;
        let teachersData = JSON.parse(serverDataAboutTeachers);
    }
})
document.querySelector(".mainSubsCon .btns .btnOpts .as").addEventListener("click",()=>{
    if(document.querySelector(".mainSubsCon .btns .btnOpts .as.notactive")==null){
        let subjectName = document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML;
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = document.querySelector(".d_card.subject.active").innerHTML;
        
        //checking if practical then marge 3 classes
        let subjectsData = JSON.parse(serverDataAboutSubjects);
        let returnValue = false;
        if(subjectsData[document.querySelector(".d_card.subject.active").innerHTML]["isPractical"]==true){
            try{
                let periodSelector = clickedPeriodTime[1];
                let weekSelector = clickedPeriodTime[0];
                for(var i = 0; i < 2; i++){
                    periodSelector++;
                    document.querySelector(`.week_${weekSelector} .class_${periodSelector}`).dataset.pt;
                }
            } catch(err){
                terrorbox("you can't set a lab subject at this time","",5000);
                returnValue = true;
                document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = subjectName;
                
            }
            if(returnValue==false){
                isLab = true;
                let span_len = 3;
                let grid_start = JSON.parse(document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).dataset.pt)[1]+1;
                document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).style.cssText = `grid-column: ${grid_start} / span ${span_len};`;
                var periodSelector  = clickedPeriodTime[1];
                for(var i=1;i<3;i++){
                    periodSelector+=1;
                    document.querySelector(`.week_${clickedPeriodTime[0]} .class_${periodSelector}`).remove();
                }
            }
        } else {
            if(isLab!=true){
                return;
            }
            if(isLab==true){
                let periodNumber = clickedPeriodTime[1]+3;
                let weekNumber = clickedPeriodTime[0];
                for(var i=1;i<3;i++){
                    periodNumber = periodNumber - 1;
                    let position = document.querySelector(`.week_${clickedPeriodTime[0]}`).children[clickedPeriodTime[1]+1];

                    //creating class a HTML element
                    let newNode = document.createElement("div");
                    let period = document.createElement("div")
                    period.classList.add("period");
                    let subjectdiv = document.createElement("div");
                    subjectdiv.innerHTML = "Subject";
                    let sirdiv = document.createElement("div");
                    sirdiv.innerHTML="Sir";
                    let roomdiv = document.createElement("div");
                    roomdiv.innerHTML = "Room no.";
                    period.appendChild(subjectdiv);
                    period.appendChild(sirdiv);
                    period.appendChild(roomdiv);
                    newNode.appendChild(period);
                    newNode.classList.add(`s_for_grid`)
                    newNode.classList.add(`class`)
                    newNode.classList.add(`class_${periodNumber}`)
                    newNode.classList.add(`alloc`);
                    newNode.setAttribute("data-pt",`[${weekNumber},${periodNumber}]`)
                    // let newElement = `<div class="s_for_grid class class_${i} alloc" data-pt="[${j},${i}]">
                    //                     <div class="period">
                    //                         <div>Subject</div>
                    //                         <div>Sir</div>                           
                    //                         <div>Room no.</div>
                    //                     </div>
                    //                 </div>`;
                    
                    
                    //adding the HTML element after current Time
                    document.querySelector(`.week_${clickedPeriodTime[0]}`).insertBefore(newNode,position);
                }
                clickListenerForClass();
                isLab = false;
            }
            let span_len = 1;
            let grid_start = JSON.parse(document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).dataset.pt)[1]+1;
            document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]}`).style.cssText = `grid-column: ${grid_start} / span ${span_len};`;
        }   
    }
})

//Remove btn click listener of allocated teacher box popup
document.querySelector(".mainSirsCon .btns .btnOpts .rs").addEventListener("click",()=>{
    if(document.querySelector(".mainSirsCon .btns .btnOpts .rs.notactive")==null){
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = "No Sir";
        try {
            document.querySelector(".d_card.teacher.active").classList.remove("active");            
            document.querySelector(".mainSirsCon .btns .btnOpts .rs").classList.add("notactive");
            document.querySelector(".allocTeacherBoxBG").click();
        } catch (error) {
            console.log("%cerror in remove teacher","color: red")
        }
        sirname =  "No Sir";
    }
})
document.querySelector(".mainSubsCon .btns .btnOpts .rs").addEventListener("click",()=>{
    if(document.querySelector(".mainSubsCon .btns .btnOpts .rs.notactive")==null){
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(1)`).innerHTML = "No Subject";
        try {
            document.querySelector(".d_card.subject.active").classList.remove("active");            
            document.querySelector(".mainSubsCon .btns .btnOpts .rs").classList.add("notactive");
            document.querySelector(".allocTeacherBoxBG").click();
        } catch (error) {
            console.log("%cerror in remove subject","color: red")
        }
        subname = "No Subject";
    }
})

//Hiding Allocation Teacher Box Popup when clicking outside of the box and btns
window.onload = function(){
    document.onclick = function(e){
        if(e.target.classList[0] == "allocTeacherBoxBG" || e.target.classList == "as" || e.target.classList == "dnas" || e.target.classList == "rs"){
            document.querySelector(".allocTeacherBox").classList.remove("active");
            document.querySelector(".allocTeacherBoxBG").classList.remove("active");
        }
    };
  };


//Sending generate request to server on "Auto fill all semester" btn click
function generateTTRequest(){
    console.log(`${url}io/schedule?generateNew=True`);
    console.log("%cGenerate Request Send","color: blue");
    fetch(`${url}io/schedule?generateNew=True`)
    .then(Response=>Response.text())
    .then(data=>console.log(JSON.parse(data)))
}