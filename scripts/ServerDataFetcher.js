import { terrorbox } from "./Util.js";

let url = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
export function getSubject(subName, func) {
    let status;
    fetch(`${url}io/subjects/${subName}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if(status!=200){
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
            if(status!=200){
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
            if(status!=200){
                terrorbox(data);
                return;
            }
            func(JSON.parse(data));
        });
}