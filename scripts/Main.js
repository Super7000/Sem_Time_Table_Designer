// chart data
const labels = ["tue", "wed", "thu", "fri", "sat"];
let data = {
    labels: labels,
    datasets: [{
        label: "",
        data: [6, 4, 2, 6, 8],
        backgroundColor: [
            '#1479FF',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            '#37DBE6',
            '#14A5FF'
        ],
        // borderColor: [
        // 'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)'
        // ],
        // borderWidth: 1,
        borderRadius: 5,
        barThickness: 10,

    }]
};
// left side chart 
let chart1 = new Chart(
    document.querySelectorAll('#main_chart')[0], {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 8
                }
            }
        },
    });
document.querySelector(".r_cards").addEventListener("wheel", (evt) => {
    evt.preventDefault();
    document.querySelector(".r_cards").scrollLeft += (evt.deltaY);
});
document.querySelector(".r_l_arrow").addEventListener("click", () => {
    document.querySelector(".r_cards").scrollLeft -= 130;
});
document.querySelector(".r_r_arrow").addEventListener("click", () => {
    document.querySelector(".r_cards").scrollLeft += 130;
});
document.querySelectorAll(".t_card").forEach((t) => {
    t.addEventListener("click", () => {
        if (t != document.querySelector(".t_card.active")) {
            document.querySelector(".t_card.active").classList.remove("active");
            t.classList.add("active");
        }
        chart1.data.datasets[0].data = JSON.parse(t.dataset.tts);
        chart1.update();
        document.querySelector(".set_time_chat p").innerHTML = "Time Table for " + document.querySelector(".t_card.active p").innerHTML + " Sir";
    })
});
console.log(chart1);
document.querySelector(".m_t_arrow").addEventListener("click", () => {
    document.querySelector(".menubar").classList.toggle("active");
})
for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 9; j += Math.floor(Math.random() * 4)) {
        if (j == 0) {
            j = Math.floor(Math.random() * 4) + 1;
        }
        document.querySelector(`.week_${i} .class_${j}`).classList.add("alloc");
    }
}
// var b = new teach([545]);
// function fun(a)
// {
//     var text = JSON.stringify([a,b,document.querySelector(".inp").value]);
//     var file = new Blob([text], {type: "text/plain"});
//     var a = document.querySelector('.btn');
//     a.href = URL.createObjectURL(file);
//     a.download = "tempsavefile.txt";
//     URL.revokeObjectURL(file);
// }
// async function loadfun()
// {
//     var file = document.querySelector(".load").files[0];
//     var fr=new FileReader();
//     fr.onload=function(){
//         alert(JSON.parse(fr.result)[0].sems);
//         document.querySelector(".inp").value = JSON.parse(fr.result)[2];
//     }

//     fr.readAsText(file);
// }