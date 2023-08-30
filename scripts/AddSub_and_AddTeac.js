
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
    document.querySelector(".btn_con .ddb").style.display = "none";
    document.querySelectorAll(".t_d .con input")[0].focus();
});

document.querySelectorAll(".cards .d_card").forEach((e)=>{
    e.addEventListener("click",()=>{
        document.querySelectorAll(".t_d .con input")[0].value = e.innerHTML;
        document.querySelector(".btn_con .ddb").style.display = "block";
    })
})

// toggle confirmation box function
function tconfirmationbox(cmsg){
    document.querySelector(".cBox .cMsg").innerHTML = cmsg;
    document.querySelector(".cBox").classList.toggle("active");
    document.querySelector(".cBoxBG").classList.toggle("active");
}
window.onload = function(){
    document.onclick = function(e){
        if(e.target.classList[0]=="cBoxBG" || e.target.classList[1] == "btn" || e.target.classList == "ddb"){
            tconfirmationbox(`Are you really want to delete ${document.querySelector(".con:nth-child(2) input").value}?`);
        }
    };
  };