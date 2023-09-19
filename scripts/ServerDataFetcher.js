import { terrorbox } from "./Util.js";

let url = window.location.origin + "/";
export function getSubject(subName, func) {
    let status;
    fetch(`${url}io/subjects/${subName}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
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
                return;
            }
            func(JSON.parse(data), status);
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
                return;
            }
            func(JSON.parse(data));
        });
}

export function getSchedule(func) {
    let status;
    fetch(`${url}io/schedule`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                return;
            }
            func(JSON.parse(data));
        });
}

export function getTimeTableStructure(func) {
    let status;
    fetch(`${url}io/schedule/structure`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                return;
            }
            func(JSON.parse(data));
        });
}

export function saveCurrentState(name) {
    let status;
    fetch(`${url}io/saves/save?name=${name}`)
        .then((Response) => {
            status = Response.status;
            return Response.text();
        })
        .then((data) => {
            terrorbox(`Current State is Saved in ${name.toUpperCase()}`,"201, 255, 172")
        })
}

export function getCurrentSaveState(func) {
    let status;
    fetch(`${url}io/saves/currentName`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                return;
            }
            func(data);
        });
}

export function getSaveStateList(func) {
    let status;
    fetch(`${url}io/saves/list`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                return;
            }
            func(JSON.parse(data));
        });
}

export function loadSaveState(name,func) {
    let status;
    fetch(`${url}io/saves/load?name=${name}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                return;
            }
            func(data);
        });
}