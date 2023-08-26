function showcards(){
    let s = "";
    let i = 8;
    for(i; i >= 1; i--){
        s += `<div class="d_card card">SUB${i}</div>`;
    }
    document.querySelector(".container .cards").innerHTML = document.querySelector(".container .cards").innerHTML + s;
}
showcards();