
document.querySelectorAll(".card").forEach((t) => {
    t.addEventListener("click", () => {
        if (t != document.querySelector(".card.active")) {
            document.querySelector(".card.active").classList.remove("active");
            t.classList.add("active");
        }
    })
});

document.querySelector(".add.card").addEventListener("click",()=>{
    document.querySelectorAll(".t_d .con input").forEach((e)=>{
        e.value = "";
    });
    document.querySelectorAll(".t_d .con input")[0].focus();
});

document.querySelectorAll(".cards .d_card").forEach((e)=>{
    e.addEventListener("click",()=>{
        document.querySelectorAll(".t_d .con input")[0].value = e.innerHTML;
    })
})