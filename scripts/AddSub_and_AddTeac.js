// toggle confirmation box function
function tconfirmationbox(cmsg){
    document.querySelector(".cBox .cMsg").innerHTML = cmsg;
    document.querySelector(".cBox").classList.toggle("active");
    document.querySelector(".cBoxBG").classList.toggle("active");
}

//Toggle Confirmation on click of delete btn and clicking outside of the confirmation box
window.onload = function(){
    document.onclick = function(e){
        if(e.target.classList[0]=="cBoxBG" || e.target.classList[1] == "btn" || e.target.classList == "ddb"){
            tconfirmationbox(`Are you really want to delete ${document.querySelector(".d_card.active").innerHTML}?`);
        }
    };
  };