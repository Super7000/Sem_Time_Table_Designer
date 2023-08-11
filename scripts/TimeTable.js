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