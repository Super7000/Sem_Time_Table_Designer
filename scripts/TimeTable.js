createTT(1);

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

document.querySelectorAll(".options .opt").forEach((o)=>{
    o.addEventListener("click",()=>{
        if (o != document.querySelector(".opt.active")) {
            document.querySelector(".opt.active").classList.remove("active");
            o.classList.add("active");
        }
    })
})


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
        }
    })
})
function createTT(year){
    const weeks = ["Tue","Wed","Thu","Fri","Sat"];
    let time = ["9:30AM","10:20AM","11:10AM","12:00PM","01:40PM","02:30PM","03:20PM","04:10PM"];
    const time2 = ["9:30AM","10:20AM","11:10AM","12:00PM","02:30PM","03:20PM","04:10PM"];
    let tl=8;
    let span_len=3;
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
        let pc=(Math.random());
        if(pc<0.5){pc=5}else{if(year!=1){pc=8}else{pc=7}};
        for(i=1;i<=pc;i++){
            s = s + `   <div class="s_for_grid class class_${i} alloc">
                            <div class="period">
                                <div>OOPS</div>
                                <div>SKB</div>                           
                                <div>LH-123</div>
                            </div>
                        </div>`;
        }
        if(pc==5){
            s = s + `   <div class="s_for_grid class class_${i++} alloc" style="grid-column: 7 / span ${span_len};">
                            <div class="period">
                                <div>OS</div>
                                <div>DG</div>                           
                                <div>LAB-1/2/3</div>
                            </div>
                        </div>`;
        }
        s = s + `</div>`;
    }
    document.querySelector(".set_time_chart .att_chart").innerHTML = s;
    if(year==1){        
        document.querySelectorAll(".week").forEach((e)=>{
            e.style.cssText = "grid-template-columns: 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5%;";
        })
        document.querySelector(".times").style.cssText = "grid-template-columns: 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5% 11.5%;";
    }
}
document.querySelectorAll(".week .class").forEach((e)=>{
    e.addEventListener("click",()=>{
        if(document.querySelector(".options .opt.manual.active")!=null){            
            document.querySelector(".allocTeacherBox").classList.add("active");
            document.querySelector(".allocTeacherBoxBG").classList.add("active");
        }
    })
})
window.onload = function(){
    document.onclick = function(e){
        if(e.target.classList[0] == "allocTeacherBoxBG"){
            document.querySelector(".allocTeacherBox").classList.remove("active");
            document.querySelector(".allocTeacherBoxBG").classList.remove("active");
        }
    };
  };