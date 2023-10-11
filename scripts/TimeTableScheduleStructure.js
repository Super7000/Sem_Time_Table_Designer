import { getTimeTableStructure, saveTimeTableStructure } from "./ServerDataFetcher.js";
let semCount = document.querySelector(".semCount");
let periodCount = document.querySelector(".periodCount");
let sectionCount = document.querySelector(".sectionCountPerSem");
let breaks = document.querySelector(".breaksPerSem");

window.onload = ()=>{
    getTimeTableStructure((data)=>{
        semCount.value = data["semesterCount"];
        periodCount.value = data["periodCount"];
        sectionCount.value = JSON.stringify(data["sectionsPerSemester"]);
        breaks.value = JSON.stringify(data["breaksPerSemester"]);
    })
}
document.querySelector(".updateScheduleStructureBtn").addEventListener("click",()=>{
    //validating inputs
    if(semCount.value.trim()=="") return;
    if(periodCount.value.trim()=="") return;

    //sending data to server
    saveTimeTableStructure({
        semesterCount: parseInt(semCount.value),
        periodCount: parseInt(periodCount.value),
        sectionsPerSemester: JSON.parse(sectionCount.value),
        breaksPerSemester: JSON.parse(breaks.value)
    })
})