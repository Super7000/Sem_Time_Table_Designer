import { getTimeTableStructure, saveTimeTableStructure } from "./ServerDataFetcher.js";
let globalTimetableStructureData;
window.onload = ()=>{
    getTimeTableStructure((data)=>{
        globalTimetableStructureData = data;
        document.querySelector(".semCount").value = data["semesterCount"];
        document.querySelector(".periodCount").value = data["periodCount"];
        document.querySelector(".sectionCountPerSem").value = JSON.stringify(data["sectionsPerSemester"]);
        document.querySelector(".breaksPerSem").value = JSON.stringify(data["breaksPerSemester"]);
    })
}
document.querySelector(".updateScheduleStructureBtn").addEventListener("click",()=>{
    saveTimeTableStructure(globalTimetableStructureData)
})