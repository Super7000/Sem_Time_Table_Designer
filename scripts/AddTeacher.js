document.querySelector(".m_t_arrow").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("active");
    document.querySelector(".menubar").classList.toggle("active");
});
document.querySelectorAll(".card").forEach((t) => {
    t.addEventListener("click", () => {
        if (t != document.querySelector(".card.active")) {
            document.querySelector(".card.active").classList.remove("active");
            t.classList.add("active");
        }
    })
});