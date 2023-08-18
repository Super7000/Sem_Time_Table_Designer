createTT();
for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
        if (j == 0) {
            j = 1;
        }
        document.querySelector(`.week_${i} .class_${j}`).classList.add("alloc");
    }
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
    let s = `<div class="times">
                <div class="day_time_l">Day/Time</div>
                <div class="class_label 1">9:30AM</div>
                <div class="class_label 2">10:20AM</div>
                <div class="class_label 3">11:10AM</div>
                <div class="class_label 4">12:00PM</div>
                <div class="class_label 5">01:40PM</div>
                <div class="class_label 6">02:30PM</div>
                <div class="class_label 7">03:20PM</div>
                <div class="class_label 8">04:10PM</div>
            </div>`;
    for(j=1; j<=5; j++){
        s = s + `<div class="week week_${j}">
                    <div class="week_names">${weeks[j-1]}</div>`;
        for(i=1;i<=8;i++){
            s = s + `   <div class="class class_${i}">
                            <div class="period">
                                <div>OOPS</div>
                                <div>SKB</div>                           
                                <div>LH-123</div>
                            </div>
                        </div>`
        }
        s = s + `</div>`
    }
    document.querySelector(".set_time_chart .att_chart").innerHTML = s;
}