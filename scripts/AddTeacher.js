function showcards(){
    let s = "";
    let i = 18;
    for(i; i >= 1; i--){
        s += `<div class="d_card card">SIR${i}</div>`;
    }
    document.querySelector(".container .cards").innerHTML = document.querySelector(".container .cards").innerHTML + s;
}
showcards();
