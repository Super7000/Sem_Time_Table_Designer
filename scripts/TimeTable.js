document.querySelector(".m_t_arrow").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("active");
    document.querySelector(".menubar").classList.toggle("active");
});
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
        }
    })
})