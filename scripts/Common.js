// Toggle Menubar
document.querySelector(".m_t_arrow").addEventListener("click", () => {
    document.querySelector(".menubar").classList.toggle("active");
});

// Add click event listener funtion 
// function clickListener(s,a){
//     document.querySelectorAll(s).forEach((o)=>{
//         o.addEventListener("click",()=>{
//             if (o != document.querySelector(s+a)) {
//                 document.querySelector(s+a).classList.remove(a);
//                 o.classList.add(a);
//             }
//         })
//     })
// }