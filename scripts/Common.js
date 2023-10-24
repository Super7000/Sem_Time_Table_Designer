import { getCurrentSaveState } from "./ServerDataFetcher.js";
import { terrorbox } from "./Util.js";

//Printing menubar code because of long svg codes, it will make code navigation is easy for all html file
let filename = window.location.pathname.slice(1, window.location.pathname.length);
document.querySelector(".menubar").innerHTML = `<svg viewBox="0 0 96 96" class="m_t_arrow" xmlns="http://www.w3.org/2000/svg">
<path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
</svg>
<div class="title">
<p>Time Table <br>Designer</p>
</div>
<a class="link" href="AddSubjects.html">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M531 5104 c-191 -41 -370 -182 -456 -359 -76 -157 -69 35 -73 -2120
-2 -1313 0 -1959 8 -2022 27 -235 158 -427 362 -528 165 -81 31 -76 1926 -72
1862 3 1719 -2 1923 67 448 150 792 545 874 1005 21 118 21 332 0 450 -33 186
-125 397 -236 544 -74 99 -225 244 -314 303 -130 84 -273 148 -422 188 l-43
11 0 1274 0 1275 -1742 -1 c-1451 0 -1754 -3 -1807 -15z m389 -1988 l0 -1703
-162 -6 c-182 -6 -265 -24 -371 -80 -34 -17 -65 -33 -70 -35 -4 -2 -6 729 -5
1625 l3 1628 27 57 c32 69 98 142 153 170 76 40 116 47 273 47 l152 1 0 -1704z
m2860 589 l0 -1115 -49 0 c-68 0 -205 -25 -302 -56 -337 -106 -619 -350 -774
-668 -61 -125 -101 -251 -118 -373 l-11 -83 -653 0 -653 0 0 1705 0 1705 1280
0 1280 0 0 -1115z m168 -1420 c185 -18 401 -119 550 -260 313 -292 405 -756
227 -1141 -99 -216 -268 -385 -487 -489 -117 -55 -232 -84 -369 -92 -468 -27
-893 285 -1016 744 -23 86 -26 117 -26 253 0 127 4 169 21 232 51 186 123 316
247 446 174 183 390 290 630 312 79 7 97 7 223 -5z m-1397 -1260 c10 -44 24
-99 33 -122 l15 -43 -914 0 -915 0 0 -150 0 -150 993 0 993 0 18 -31 c10 -17
61 -75 113 -130 l96 -99 -1184 2 -1184 3 -58 23 c-76 31 -170 118 -207 193
-120 237 21 527 282 578 24 5 461 8 972 7 l929 -1 18 -80z"/>
<path d="M2017 4233 c-4 -3 -7 -71 -7 -150 l0 -143 505 0 505 0 0 150 0 150
-498 0 c-274 0 -502 -3 -505 -7z"/>
<path d="M1680 3440 l0 -150 835 0 835 0 0 150 0 150 -835 0 -835 0 0 -150z"/>
<path d="M3670 1600 l0 -150 -155 0 -155 0 0 -150 0 -150 155 0 155 0 0 -155
0 -155 150 0 150 0 0 155 0 155 150 0 150 0 0 150 0 150 -150 0 -150 0 0 150
0 150 -150 0 -150 0 0 -150z"/>
</g>
</svg>
<p>Edit <br>Subjects</p>
</a>
<a class="link" href="AddTeacher.html">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2066 5109 c-359 -52 -680 -287 -837 -614 -119 -246 -146 -508 -80
-767 98 -382 404 -691 784 -793 393 -105 799 4 1082 290 477 482 417 1265
-128 1676 -225 169 -539 249 -821 208z"/>
<path d="M1410 2439 c-375 -50 -722 -312 -870 -657 -59 -138 -81 -238 -87
-395 -7 -168 4 -233 59 -347 57 -119 177 -239 298 -299 146 -71 136 -71 951
-71 l725 0 -17 67 c-99 379 185 777 584 818 l67 7 0 43 c0 65 35 188 77 268
51 98 172 219 270 270 89 47 100 69 52 109 -45 38 -175 104 -262 134 -172 59
-135 57 -992 60 -434 1 -819 -2 -855 -7z"/>
<path d="M3694 1762 c-50 -24 -107 -89 -122 -141 -8 -24 -12 -124 -12 -275 l0
-236 -245 0 c-267 0 -292 -4 -348 -58 -117 -111 -82 -305 65 -366 30 -13 84
-16 283 -16 l245 0 0 -231 c0 -277 5 -305 70 -370 110 -110 279 -83 353 54 21
40 22 56 25 294 l4 253 244 0 c183 0 253 3 277 13 177 75 185 328 12 408 -35
16 -68 19 -287 19 l-248 0 0 233 c0 242 -5 282 -43 338 -58 86 -182 123 -273
81z"/>
</g>
</svg>
<p>Edit <br>Teachers</p>
</a>
<a class="link" href="Dashboard.html">
<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
</svg>
<p>Dashboard</p>
</a>
<a class="link" href="Time_Tables.html">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M732 5109 c-45 -13 -108 -80 -121 -126 -7 -23 -11 -158 -11 -340 l0
-303 -35 -46 c-92 -121 -82 -287 25 -394 61 -61 119 -84 210 -84 99 -1 173 33
230 106 89 112 91 260 5 372 l-34 45 -3 323 c-3 320 -3 323 -27 361 -47 76
-151 113 -239 86z"/>
<path d="M2492 5109 c-45 -13 -108 -80 -121 -126 -7 -23 -11 -158 -11 -340 l0
-303 -35 -46 c-92 -121 -82 -287 25 -394 61 -61 119 -84 210 -84 99 -1 173 33
230 106 89 112 91 260 5 372 l-34 45 -3 323 c-3 320 -3 323 -27 361 -47 76
-151 113 -239 86z"/>
<path d="M4252 5109 c-45 -13 -108 -80 -121 -126 -7 -23 -11 -158 -11 -340 l0
-303 -35 -46 c-92 -121 -82 -287 25 -394 61 -61 119 -84 210 -84 99 -1 173 33
230 106 89 112 91 260 5 372 l-34 45 -3 323 c-3 320 -3 323 -27 361 -47 76
-151 113 -239 86z"/>
<path d="M205 4702 c-65 -22 -109 -54 -146 -105 -57 -79 -59 -97 -59 -594 l0
-453 2560 0 2561 0 -3 473 -3 472 -28 57 c-32 64 -80 111 -146 142 -38 17 -71
21 -183 24 l-138 4 0 -172 c0 -157 2 -174 20 -200 12 -16 33 -55 48 -87 23
-50 27 -71 27 -153 0 -86 -3 -101 -32 -162 -78 -165 -257 -261 -425 -230 -135
25 -244 108 -301 230 -28 60 -32 77 -32 157 0 99 17 159 67 232 l28 42 0 170
0 171 -580 0 -580 0 0 -171 c0 -156 2 -173 20 -199 12 -16 33 -55 48 -87 23
-50 27 -71 27 -153 0 -86 -3 -101 -32 -162 -78 -165 -257 -261 -425 -230 -135
25 -244 108 -301 230 -28 60 -32 77 -32 157 0 99 17 159 67 232 l28 42 0 170
0 171 -580 0 -580 0 0 -171 c0 -156 2 -173 20 -199 12 -16 33 -55 48 -87 23
-50 27 -71 27 -153 0 -86 -3 -101 -32 -162 -78 -165 -257 -261 -425 -230 -135
25 -244 108 -301 230 -28 60 -32 77 -32 157 0 99 17 159 67 232 l28 42 0 170
0 171 -122 0 c-90 -1 -136 -5 -173 -18z"/>
<path d="M2 1838 l3 -1613 28 -57 c32 -64 80 -111 146 -142 l46 -21 2335 0
2335 0 46 21 c66 31 114 78 146 142 l28 57 3 1613 2 1612 -2560 0 -2560 0 2
-1612z m1256 1292 c18 -11 41 -34 52 -52 18 -31 20 -51 20 -273 0 -278 -4
-293 -81 -333 -43 -22 -51 -23 -279 -20 -259 3 -265 5 -313 72 -21 29 -22 42
-25 256 -2 141 0 238 7 261 12 38 53 86 86 100 11 4 128 8 260 8 222 1 242 -1
273 -19z m1050 0 c18 -11 41 -34 52 -52 18 -31 20 -51 20 -278 0 -228 -1 -247
-20 -278 -39 -63 -76 -72 -325 -72 -209 0 -223 1 -265 23 -81 41 -85 55 -85
334 0 229 1 243 21 270 11 15 36 38 54 51 32 21 40 22 274 22 223 0 243 -2
274 -20z m1082 -26 c48 -52 53 -83 48 -344 -4 -226 -10 -248 -88 -287 -42 -22
-56 -23 -265 -23 -249 0 -286 9 -325 72 -19 31 -20 46 -18 289 3 284 1 276 73
321 28 17 50 18 283 16 l253 -3 39 -41z m1020 27 c21 -11 44 -36 58 -62 23
-43 23 -49 20 -279 -3 -259 -5 -265 -72 -313 -30 -21 -42 -22 -266 -25 -230
-3 -236 -3 -279 20 -77 41 -81 56 -81 333 0 222 2 242 20 273 11 18 34 41 52
52 31 18 51 20 273 20 215 0 244 -2 275 -19z m-3160 -1049 c19 -9 45 -32 57
-51 22 -33 23 -41 23 -275 0 -275 -4 -293 -75 -333 -39 -23 -46 -23 -282 -21
-266 3 -266 3 -317 72 -20 26 -21 41 -21 276 0 237 1 250 21 277 11 15 36 38
54 51 32 21 41 22 269 22 205 0 241 -2 271 -18z m1058 -2 c18 -11 41 -34 52
-52 18 -31 20 -51 20 -279 0 -239 -1 -247 -22 -279 -46 -67 -64 -71 -335 -68
-228 3 -243 4 -270 24 -15 12 -37 36 -48 55 -19 31 -20 52 -20 276 0 229 1
243 21 270 11 15 36 38 54 51 32 21 40 22 274 22 223 0 243 -2 274 -20z m1547
-15 c466 -137 735 -631 594 -1091 -160 -522 -745 -772 -1234 -528 -212 107
-364 287 -440 524 -37 114 -46 305 -20 431 63 314 303 575 608 664 100 29 148
34 277 30 98 -3 144 -9 215 -30z m-2605 -1033 c19 -9 45 -32 57 -51 22 -33 23
-41 23 -281 0 -240 -1 -248 -23 -281 -44 -66 -63 -70 -334 -67 -226 3 -243 4
-269 24 -67 50 -69 55 -72 287 -4 248 0 286 36 328 45 55 65 58 317 59 200 0
235 -2 265 -18z m1050 0 c19 -9 45 -32 57 -51 22 -33 23 -41 23 -281 0 -240
-1 -248 -23 -281 -44 -66 -63 -70 -334 -67 -228 3 -243 4 -270 24 -63 47 -68
68 -71 300 -4 224 2 271 40 319 39 50 64 54 313 55 200 0 235 -2 265 -18z"/>
<path d="M3554 1892 c-42 -34 -44 -49 -44 -372 0 -330 3 -355 49 -380 12 -6
127 -10 301 -10 l281 0 24 24 c34 34 41 71 21 113 -27 56 -57 63 -281 63
l-195 0 0 261 0 261 -29 29 c-35 34 -93 39 -127 11z"/>
</g>
</svg>

<p>Time <br>Tables</p>
</a>
<a class="link" href="TimeTableScheduleStructure.html">
<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
</svg>
<p>Time Table <br>Structure</p>
</a>
<a class="link" href="Files.html">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M726 5100 c-60 -23 -119 -79 -149 -140 l-22 -45 0 -1920 0 -1920 21
-45 c25 -55 72 -103 128 -133 33 -17 64 -23 156 -27 l115 -5 5 -115 c6 -129
20 -169 78 -228 58 -57 111 -74 243 -80 l117 -5 4 -121 c3 -100 7 -128 25
-162 28 -53 74 -99 127 -127 l41 -22 1362 -3 c1356 -2 1362 -2 1417 18 63 24
136 97 158 158 10 29 13 170 13 660 l0 624 -33 29 c-44 39 -90 39 -134 0 l-33
-29 -3 -610 c-2 -603 -3 -610 -23 -628 -20 -18 -64 -19 -1323 -22 -908 -2
-1312 0 -1338 8 -31 9 -39 17 -48 48 -8 26 -10 590 -8 1895 l3 1859 24 19 c22
18 53 19 1007 19 l983 0 3 -272 3 -273 27 -47 c16 -25 45 -60 65 -77 67 -56
101 -61 375 -61 l248 0 0 -539 c0 -368 4 -548 11 -570 29 -84 164 -79 189 7 8
25 10 219 8 627 l-3 590 -27 50 c-19 37 -234 257 -805 827 -755 754 -780 777
-832 792 -48 14 -174 16 -1090 16 -998 -1 -1038 -2 -1085 -20z m2219 -290
l105 -105 -932 -5 c-925 -5 -933 -5 -979 -26 -55 -26 -115 -84 -138 -133 -15
-33 -16 -190 -21 -1751 l-5 -1715 -70 -3 c-80 -3 -107 2 -129 24 -14 14 -16
201 -16 1898 0 1781 1 1884 18 1898 9 9 24 18 32 21 8 3 468 5 1022 4 l1008
-2 105 -105z m440 -440 l120 -120 -931 0 c-1029 0 -982 3 -1060 -64 -22 -18
-50 -55 -64 -82 l-25 -49 -3 -1702 -2 -1703 -100 0 c-87 0 -103 3 -120 20 -20
20 -20 33 -20 1900 0 1867 0 1880 20 1900 20 20 33 20 1043 20 l1022 0 120
-120z m698 -848 c-82 -2 -162 0 -180 3 -57 10 -63 30 -63 220 l0 170 195 -195
195 -195 -147 -3z"/>
<path d="M2085 3106 c-51 -22 -73 -106 -40 -152 29 -43 52 -45 454 -42 l383 3
24 28 c45 52 24 145 -37 166 -49 17 -744 14 -784 -3z"/>
<path d="M2090 2679 c-37 -15 -60 -49 -60 -92 0 -49 13 -73 50 -92 43 -22
1816 -23 1859 -1 71 37 65 159 -10 185 -42 14 -1802 14 -1839 0z"/>
<path d="M2059 2201 c-39 -39 -40 -96 -3 -140 l26 -31 928 0 928 0 26 31 c37
44 36 101 -3 140 l-29 29 -922 0 -922 0 -29 -29z"/>
<path d="M4392 1905 c-39 -33 -50 -80 -28 -123 20 -39 44 -52 94 -52 70 0 115
70 88 135 -17 40 -38 56 -84 62 -31 4 -44 0 -70 -22z"/>
<path d="M2084 1780 c-75 -30 -70 -162 7 -189 45 -16 1793 -16 1838 0 61 21
82 114 37 166 l-24 28 -919 2 c-505 1 -928 -2 -939 -7z"/>
<path d="M2085 1336 c-57 -25 -74 -113 -31 -163 l24 -28 932 0 932 0 24 28
c47 55 23 148 -44 166 -60 17 -1798 14 -1837 -3z"/>
</g>
</svg>
<p>Files</p>
</a>`;
try {
    document.querySelector(`.menubar .link[href="${filename}"]`).classList.add("active");
} catch (e) {
    document.querySelector(`.menubar .link[href="Dashboard.html"]`).classList.add("active");
}

// Toggle Menubar
function tmenubar() {
    document.querySelector(".m_t_arrow").addEventListener("click", () => {
        document.querySelector("body").classList.toggle("active");
        document.querySelector(".menubar").classList.toggle("active");
    });
}
tmenubar();

let active = true;
function to_m_mb_res() {
    let w = window.outerWidth;
    if (active == true && w < 1355) {
        active = false;
        document.querySelector("body").classList.toggle("active");
        document.querySelector(".menubar").classList.toggle("active");
    } else if (active == false && w > 1355) {
        active = true;
        document.querySelector("body").classList.toggle("active");
        document.querySelector(".menubar").classList.toggle("active");
    }
}
to_m_mb_res();

window.addEventListener("resize", to_m_mb_res)

// let filenames = [];
// getSaveStateList((data)=>{
//     filenames = data;
// })
// function clickListenerForNewSaveStateInputBtn(){
//     document.querySelector(".saveStateInputBtn").addEventListener("click",()=>{
//         let filename = document.querySelector(`.saveStateBox input[type="text"]`).value.trim();
//         if(filename==""){
//             terrorbox("Please enter a vaild file name");
//             return;
//         }
//         for(var i = 0; i < filenames.length; i++){
//             if(filename.toUpperCase()==filenames[i]){
//                 terrorbox("file already exists with this name");
//                 return;
//             }
//         }
//         saveCurrentState(filename);
//         window.location.reload();
//         document.querySelector(".saveStateBox.active").classList.remove("active");
//         document.querySelector(".saveStateBoxBG.active").classList.remove("active");
//     })
// }
// clickListenerForNewSaveStateInputBtn();

// function clickListenerForSaveBtn(){
//     document.querySelector(".link.save").addEventListener("click",()=>{
//         getCurrentSaveState((data)=>{
//             if(data=="null"){
//                 document.querySelector(".link.newSave").click();
//                 return
//             }
//             saveCurrentState(data);
//         })
//     })
// }
// clickListenerForSaveBtn();

function showCurrentStateName(){
    getCurrentSaveState((data)=>{
        document.querySelector(".currentStateNameContainer").innerHTML = "Current State: "+data;
    })
}
showCurrentStateName();
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

//toggle error box

// function terrorbox(errMSg, color, timeout) {
//     document.querySelector(".errorBox").classList.add("active");
//     document.querySelector(".errorBox .errorMsg").innerHTML = errMSg;

//     document.querySelector(".errorBox").style.cssText = `background: rgb(${color});`;
//     document.querySelector(".close_err_btn.cross").addEventListener("click", () => {
//         document.querySelector(".errorBox").classList.remove("active");
//     })
//     setTimeout(() => {
//         if (document.querySelector(".errorBox.active") != null) {
//             document.querySelector(".errorBox").classList.remove("active");
//         };
//     }, timeout);
// }
// terrorbox(`201, 255, 172`, `5000`);
export function changeColor(){
    document.documentElement.style.setProperty("--background","#3b3b3b")
    document.documentElement.style.setProperty("--textColor","#fff")
    document.documentElement.style.setProperty("--containerColor","rgba(107, 107, 107, 1)")
}