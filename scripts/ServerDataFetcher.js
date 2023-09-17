import { terrorbox } from "./Util.js";

let url = window.location.origin+"/";
export function getSubject(subName, func) {
    let status;
    fetch(`${url}io/subjects/${subName}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                terrorbox(data);
                return;
            }
            func(JSON.parse(data));
        });
}

export function getTeacher(sirName, func) {
    let status;
    fetch(`${url}io/teachers/${sirName}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                terrorbox(data);
                return;
            }
            func(JSON.parse(data));
        });
}

export function getTeacherSchedule(sirName, func) {
    let status;
    fetch(`${url}io/schedule/teacher/${sirName}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                terrorbox(data);
                return;
            }
            func(JSON.parse(data));
        });
}

export function getSubjectList(func) {
    let status;
    fetch(`${url}io/subjects`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                terrorbox(data);
                return;
            }
            func(JSON.parse(data));
        });
}

export function getTeacherList(func) {
    let status;
    fetch(`${url}io/teachers`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                terrorbox(data);
                return;
            }
            func(JSON.parse(data));
        });
}