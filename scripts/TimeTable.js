document.querySelector(".m_t_arrow").addEventListener("click", () => {
    document.querySelector(".menubar").classList.toggle("active");
})
for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
        if (j == 0) {
            j = 1;
        }
        document.querySelector(`.week_${i} .class_${j}`).classList.add("alloc");
    }
}