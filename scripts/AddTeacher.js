
document.querySelectorAll(".card").forEach((t) => {
    t.addEventListener("click", () => {
        if (t != document.querySelector(".card.active")) {
            document.querySelector(".card.active").classList.remove("active");
            t.classList.add("active");
        }
    })
});