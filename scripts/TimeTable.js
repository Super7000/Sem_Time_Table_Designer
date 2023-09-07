//Printing HTML code of Time Table for first year
createTT(1);

let url = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
console.log(url)

//Printing Teacher Cards in Allocation Teacher Box 
function showcards(){
    let urlForSirs = url + "io/teachers";
    console.log(urlForSirs)
    fetch(urlForSirs)
    .then(Response => Response.text())
    .then(data => {
        let s = "";
        for (let key in JSON.parse(data)) {
            s += `<div class="d_card teacher card available" id="SIR${key}">${key}</div>`;
        }
        document.querySelectorAll(".cardsCon")[0].innerHTML = s;
        clickListenerforAvailableTeacherCards();
    })
    let urlForSubj = url + "io/subjects";
    console.log(urlForSubj)
    fetch(urlForSubj)
    .then(Response => Response.text())
    .then(data => {
        let s = "";
        for (let key in JSON.parse(data)) {
            s += `<div class="d_card subject card available" id="SUB${key}">${key}</div>`;
        }
        document.querySelectorAll(".cardsCon")[1].innerHTML = s;
        clickListenerforAvailableTeacherCards();
    })
    //     s2 += `<div class="d_card card disabled" onclick="terrorbox('Sir is Busy','255, 203, 130',5000)">SIR${35+i}</div>`;
    
    // document.querySelectorAll(".cardsCon")[1].innerHTML = s2;
}
function fun(){
    let s= "";
    let s2="";
    for(var i = 1; i < 20; i++){
        s+=`<div class="d_card teacher card available" id="SIR${i}">SIR${i}</div>`;
        s2+=`<div class="d_card subject card available" id="SUB${i}">SUB${i}</div>`;
    }
    document.querySelectorAll(".cardsCon")[0].innerHTML = s;
    document.querySelectorAll(".cardsCon")[1].innerHTML = s2;

}fun();
    

//Global variables
let sirname; //An unique ID for Sirs of String
let subname; //An unique ID for Subjects of String
let clickedPeriodTime; //2D array of int Ex.: [1,2] means day 1 period 2

function clickListenerforAvailableTeacherCards(){
    document.querySelectorAll(".d_card.teacher").forEach((e)=>{
        e.addEventListener("click",()=>{
            if(e!=document.querySelector(".d_card.teacher.active")){            
                try {
                    document.querySelector(".d_card.teacher.active").classList.remove("active");
                } catch (error) {
                    console.log(error);
                }
                e.classList.add("active");

                //Making Allocation Teacher Box Popup's btns active according to teacher card is clicked by user
                if(e.innerHTML != sirname){
                    if(document.querySelector(".btns .btnOpts .as.notactive")!=null){
                        document.querySelector(".btns .btnOpts .as.notactive").classList.remove("notactive");
                        document.querySelector(".btns .btnOpts .dnas.notactive").classList.remove("notactive");
                        document.querySelector(".btns .btnOpts .rs").classList.add("notactive");
                    }
                } else {
                    if(document.querySelector(".btns .btnOpts .as.notactive")==null){
                        document.querySelector(".btns .btnOpts .as").classList.add("notactive");
                        document.querySelector(".btns .btnOpts .dnas").classList.add("notactive");
                        document.querySelector(".btns .btnOpts .rs.notactive").classList.remove("notactive");
                    }
                }
            }
        })
    })
}
clickListenerforAvailableTeacherCards();

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
    let time = ["9:30AM","10:20AM","11:10AM","12:00PM","01:40PM","02:30PM","03:20PM","04:10PM"];
    const time2 = ["9:30AM","10:20AM","11:10AM","12:00PM","02:30PM","03:20PM","04:10PM"];
    let tl=8;
    let span_len=3;

    //checking value of year parameter and changing period counts accrding to it 
    if(year==1){
        time = time2;
        tl = 7;
        span_len = 2;
    }

    let s = `<div class="times">
                <div class="day_time_l">Day/Time</div>`;
    for(k=1;k<=tl;k++){
        s += `<div class="class_label ${k}">${time[k-1]}</div>`;
    }
    s += `</div>`;
    for(j=1; j<=5; j++){
        s = s + `<div class="week week_${j}">
                    <div class="s_for_grid week_names">${weeks[j-1]}</div>`;
        for(i=1;i<=tl;i++){
            s = s + `   <div class="s_for_grid class class_${i} alloc" data-pt="[${j},${i}]">
                            <div class="period">
                                <div>Subject</div>
                                <div>Sir</div>                           
                                <div>Room no.</div>
                            </div>
                        </div>`;
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
            e.style.cssText = "grid-template-columns: 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5%;";
        })
        document.querySelector(".times").style.cssText = "grid-template-columns: 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5%;";
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
                    window.location.href = window.location.href.split("#")[0] + "#"+sirname;
                } else {
                    window.location.href += "#"+sirname;
                }

                clickedPeriodTime = JSON.parse(e.dataset.pt);
            }
        })
    })
}
clickListenerForClass();


//Yes btn click listener of allocated teacher box popup
document.querySelector(".btns .btnOpts .as").addEventListener("click",()=>{
    if(document.querySelector(".btns .btnOpts .as.notactive")==null){
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = document.querySelector(".d_card.active").innerHTML;
    }
})

//Remove btn click listener of allocated teacher box popup
document.querySelector(".btns .btnOpts .rs").addEventListener("click",()=>{
    if(document.querySelector(".btns .btnOpts .rs.notactive")==null){
        document.querySelector(`.week_${clickedPeriodTime[0]} .class_${clickedPeriodTime[1]} .period div:nth-child(2)`).innerHTML = "No Sir";
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