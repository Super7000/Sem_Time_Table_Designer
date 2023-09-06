// toggle confirmation box function
function tconfirmationbox(cmsg){
    document.querySelector(".cBox .cMsg").innerHTML = cmsg;
    document.querySelector(".cBox").classList.toggle("active");
    document.querySelector(".cBoxBG").classList.toggle("active");
}

//Toggle Confirmation on click of delete btn and clicking outside of the confirmation box
window.onload = function(){
    document.onclick = function(e){
        if(e.target.classList == "ddb"){
            tconfirmationbox(`Are you really want to delete ${document.querySelector(".d_card.active").innerHTML}?`);
        } else if(e.target.classList[0]=="cBoxBG" || e.target.classList[1] == "btn"){
            tconfirmationbox(" ");
        }
    };
  };

//Click listener for Cards
function clickListenerForCardActivator(){
    document.querySelectorAll(".card").forEach((t) => {
        t.addEventListener("click", () => {
            if (t != document.querySelector(".card.active")) {
                if(document.querySelector(".card.active")!=null){
                    document.querySelector(".card.active").classList.remove("active");
                }
                t.classList.add("active");
            }
        })
    });
}
clickListenerForCardActivator();

function addCardClickListener(){
    document.querySelector(".add.card").addEventListener("click",()=>{
        document.querySelectorAll(".t_d .con input").forEach((e)=>{
            e.value = "";
        });
        document.querySelector(".btn_con .ddb").style.display = "none";
        document.querySelectorAll(".t_d .con input")[0].focus();
        if(document.querySelector(".dsb.edit")!=null){
            document.querySelector(".dsb.edit").classList.remove("edit");
            document.querySelector(".dsb").classList.add("new");
        }
    });
}
addCardClickListener();

function deleteBtnFunc(){
    document.querySelector(".cBtns .cBtn").addEventListener("click",()=>{
        document.querySelector(".d_card.active").remove();
        document.querySelector(".add.card").click();
    })
}
deleteBtnFunc();

function saveBtnClickListener(){
    document.querySelector(".dsb").addEventListener("click",()=>{
        let val = document.querySelectorAll(".con input")[0].value.toUpperCase();
        if(val.length < 9){
            if(document.querySelector(".dsb.new")!==null){        
                let s=`<div class="d_card card" id="${val}">${val}</div>`;
                document.querySelector(".add.card.active").insertAdjacentHTML("afterend", s);;
                document.querySelectorAll(".con input").forEach((e)=>{
                    e.value="";
                })
                clickListenerForCards();
                clickListenerForCardActivator();
            } 
            if(document.querySelector(".dsb.edit")!==null){
                document.querySelector(".d_card.active").innerHTML = val;
            }
        } else {
            terrorbox("Length of the name must be less than 9","",5000);
        }
    })
}
saveBtnClickListener();

function clickListenerForCards(){ 
    document.querySelectorAll(".cards .d_card").forEach((e)=>{
        e.addEventListener("click",()=>{
            document.querySelectorAll(".t_d .con input")[0].value = e.innerHTML;
            document.querySelector(".btn_con .ddb").style.display = "block";
            if(document.querySelector(".dsb.new")!=null){
                document.querySelector(".dsb.new").classList.remove("new");
                document.querySelector(".dsb").classList.add("edit");
            }
        })
    })
}
clickListenerForCards();
