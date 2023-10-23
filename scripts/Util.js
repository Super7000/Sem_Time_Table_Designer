export function terrorbox(errMsg, color = "255, 203, 130", timeout = 5000) {
    document.querySelector(".errorBox").classList.add("active");
    document.querySelector(".errorBox .errorMsg").innerHTML = errMsg;
    document.querySelector(".errorBox").style.cssText = `background: rgb(${color});`;
    document.querySelector(".close_err_btn.cross").addEventListener("click", () => {
        document.querySelector(".errorBox").classList.remove("active");
    })
    setTimeout(() => {
        if (document.querySelector(".errorBox.active") != null) {
            document.querySelector(".errorBox").classList.remove("active");
        };
    }, timeout);
}
export function clickListenerForCardActivator() {
    document.querySelectorAll(".card").forEach((t) => {
        t.addEventListener("click", () => {
            if (t != document.querySelector(".card.active")) {
                if (document.querySelector(".card.active") != null) {
                    document.querySelector(".card.active").classList.remove("active");
                }
                t.classList.add("active");
            }
        })
    });
}

export function addCardClickListener() {
    document.querySelector(".add.card").addEventListener("click", () => {
        document.querySelectorAll(".t_d .con input").forEach((e) => {
            e.value = "";
        });
        try {
            document.querySelectorAll(".t_d .con input")[4].checked = false;
        } catch (err) {

        }
        document.querySelector(".btn_con .ddb").style.display = "none";
        try{            
            document.querySelector(".btn_con .openThisStateBtn").style.display = "none";
        } catch(err) {

        }
        document.querySelectorAll(".t_d .con input")[0].focus();
        if (document.querySelector(".dsb.edit") != null) {
            document.querySelector(".dsb.edit").classList.remove("edit");
            document.querySelector(".dsb").classList.add("new");
        }
    });
}
