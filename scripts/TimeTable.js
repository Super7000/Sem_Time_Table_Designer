createTT();

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
        }
    })
})
function createTT(){
    const weeks = ["Tue","Wed","Thu","Fri","Sat"];
    const time = ["9:30AM","10:20AM","11:10AM","12:00PM","01:40PM","02:30PM","03:20PM","04:10PM"];
    const time2 = ["9:30AM","10:20AM","11:10AM","12:00PM","01:40PM","02:30PM","03:20PM"];
    let s = `<div class="times">
                <div class="day_time_l">Day/Time</div>`;
    for(k=1;k<=8;k++){
        s += `<div class="class_label ${k}">${time[k-1]}</div>`;
    }
    s += `</div>`;
    for(j=1; j<=5; j++){
        s = s + `<div class="week week_${j}">
                    <div class="s_for_grid week_names">${weeks[j-1]}</div>`;
        let pc=(Math.random());
        if(pc<0.5){pc=5}else{pc=8};
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
            s = s + `   <div class="s_for_grid class class_${i++} alloc" style="grid-column: 7 / span 3;">
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
}