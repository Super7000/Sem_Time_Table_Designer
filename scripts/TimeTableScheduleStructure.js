import { getTimeTableStructure, saveTimeTableStructure } from "./ServerDataFetcher.js";
import { terrorbox } from "./Util.js";


let semCount = document.querySelector(".semCount");
let periodCount = document.querySelector(".periodCount");
let sectionCount = document.querySelector(".sectionCountPerSem");
let breaks = document.querySelector(".breaksPerSem");

let tempTimeTableStructureData;

window.onload = () => {
    getTimeTableStructure((data) => {
        tempTimeTableStructureData = data;
        semCount.value = data["semesterCount"];
        periodCount.value = data["periodCount"];
        sectionCount.value = JSON.stringify(data["sectionsPerSemester"]).slice(1, JSON.stringify(data["sectionsPerSemester"]).length - 1);
        breaks.value = JSON.stringify(data["breaksPerSemester"]).slice(1, JSON.stringify(data["breaksPerSemester"]).length - 1);
    })
}
document.querySelector(".updateScheduleStructureBtn").addEventListener("click", () => {
    let semCountValue = semCount.value.trim();
    let periodCountValue = periodCount.value.trim();
    let sectionCountValue = sectionCount.value.trim();
    let breaksValue = breaks.value.trim();
    //validating inputs
    if (semCountValue == "") {
        terrorbox("Please Provide Number of Semester Field");
        return;
    }
    //Period Per day input vaildation
    if (periodCountValue == "") {
        terrorbox("Please Period Per Semester Field");
        return;
    }
    //Section Per semester input vaildation
    if (sectionCountValue == "") {
        terrorbox("Please Provide Section Per Semester Field");
        return;
    }
    try {
        sectionCountValue = JSON.parse(`[${sectionCountValue}]`);
    } catch (err) {
        terrorbox("Please Provide a Vaild Input in Section Per Semester Field");
        return;
    }
    if (sectionCountValue.length != semCountValue) {
        terrorbox("Please Provide a Vaild Input in Section Per Semester Field");
        return;
    }
    //Break Time Per Semester input vaildation
    if (breaksValue == "") {
        terrorbox("Please Provide a vaild input in break time per semester field")
        return;
    }
    try {
        breaksValue = JSON.parse(`[${breaksValue}]`);
    } catch (err) {
        terrorbox("Please Provide a vaild input in break time per semester field")
        return;
    }
    if (breaksValue.length != semCountValue) {
        terrorbox("Please Provide a vaild input in break time per semester field")
        return;
    }

    //sending data to server
    let timeTableStructureData = {
        semesterCount: parseInt(semCountValue),
        periodCount: parseInt(periodCountValue),
        sectionsPerSemester: sectionCountValue,
        breaksPerSemester: breaksValue
    };
    saveTimeTableStructure(timeTableStructureData)

    document.querySelectorAll("input").forEach((e) => {
        e.style = "";
    })
    tempTimeTableStructureData = timeTableStructureData;
})


//identifying changes in input box values
semCount.addEventListener("input", () => {
    if (semCount.value.trim() != tempTimeTableStructureData["semesterCount"]) {
        semCount.style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        semCount.style.cssText = "background: rgba(0,0,0,0.1);";
    }
})
periodCount.addEventListener("input", () => {
    if (periodCount.value.trim() != tempTimeTableStructureData["periodCount"]) {
        periodCount.style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        periodCount.style.cssText = "background: rgba(0,0,0,0.1);";
    }
})
sectionCount.addEventListener("input", () => {
    if (sectionCount.value.trim() != tempTimeTableStructureData["sectionsPerSemester"].join(",")) {
        sectionCount.style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        sectionCount.style.cssText = "background: rgba(0,0,0,0.1);";
    }
})
breaks.addEventListener("input", () => {
    if (`[${breaks.value.trim()}]` != JSON.stringify(tempTimeTableStructureData["breaksPerSemester"])) {
        breaks.style.cssText = "background: rgba(255, 165, 0, 0.3);";
    } else {
        breaks.style.cssText = "background: rgba(0,0,0,0.1);";
    }
})