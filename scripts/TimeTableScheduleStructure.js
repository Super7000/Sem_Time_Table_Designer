import { getTimeTableStructure, saveTimeTableStructure } from "./ServerDataFetcher.js";
import { terrorbox } from "./Util.js";


let semCount = document.querySelector(".semCount");
let periodCount = document.querySelector(".periodCount");
let sectionCount = document.querySelector(".sectionCountPerSem");
let breaks = document.querySelector(".breaksPerSem");

window.onload = ()=>{
    getTimeTableStructure((data)=>{
        semCount.value = data["semesterCount"];
        periodCount.value = data["periodCount"];
        sectionCount.value = JSON.stringify(data["sectionsPerSemester"]).slice(1,JSON.stringify(data["sectionsPerSemester"]).length-1);
        breaks.value = JSON.stringify(data["breaksPerSemester"]).slice(1,JSON.stringify(data["breaksPerSemester"]).length-1);
    })
}
document.querySelector(".updateScheduleStructureBtn").addEventListener("click",()=>{
    //validating inputs
    if(semCount.value.trim()==""){
        terrorbox("Please Provide Number of Semester Field");
        return;
    }
    //Period Per day input vaildation
    if(periodCount.value.trim()==""){
        terrorbox("Please Period Per Semester Field");
        return;
    }
    //Section Per semester input vaildation
    if(sectionCount.value.trim()==""){
        terrorbox("Please Provide Section Per Semester Field");
        return;
    }
    try{
        JSON.parse(`[${sectionCount.value.trim()}]`);
    } catch(err){
        terrorbox("Please Provide a Vaild Input in Section Per Semester Field");
        return;
    }
    if(JSON.parse(`[${sectionCount.value.trim()}]`).length != semCount.value.trim()){
        terrorbox("Please Provide a Vaild Input in Section Per Semester Field");
        return;
    }
    //Break Time Per Semester input vaildation
    if(breaks.value.trim()==""){
        terrorbox("Please Provide a vaild input in break time per semester field")
        return;
    }
    try{
        JSON.parse(`[${breaks.value.trim()}]`);
    } catch(err) {
        terrorbox("Please Provide a vaild input in break time per semester field")
        return;
    }
    if(JSON.parse(`[${breaks.value.trim()}]`).length != semCount.value.trim()){
        terrorbox("Please Provide a vaild input in break time per semester field")
        return;
    }
    
    //sending data to server
    saveTimeTableStructure({
        semesterCount: parseInt(semCount.value.trim()),
        periodCount: parseInt(periodCount.value.trim()),
        sectionsPerSemester: JSON.parse(`[${sectionCount.value.trim()}]`),
        breaksPerSemester: JSON.parse(`[${breaks.value.trim()}]`)
    })
})