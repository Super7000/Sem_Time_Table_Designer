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
            if (status != 200) {
                console.log("Error in saving current state", data)
            }
            terrorbox(`Current State is Saved in ${name.toUpperCase()}`, "201, 255, 172")
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
                console.log("Error in geting current state name", data)
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
                console.log("Error in geting save sates list", data)
            }
            func(JSON.parse(data));
        });
}

export function loadSaveState(name, func) {
    let status;
    fetch(`${url}io/saves/load?name=${name}`)
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                console.log("Error in loading " + name + "state", data)
            }
            func(data);
        });
}




//=================================PUT Requests====================================



export function saveTimeTableStructure(data) {
    console.log(JSON.stringify(data))
    let status;
    fetch(`${url}io/schedule/structure`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            status = response.status;
            return response.text();
        })
        .then((data) => {
            if (status != 200) {
                return;
            }
            terrorbox(data)
        });
}

export function saveTeacher(m, func = () => { }) {
    let statusValue;
    fetch(url + "io/teachers", {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(m)
    })
        .then(Response => {
            statusValue = Response.status;
            return Response.text()
        })
        .then(data => {
            if (statusValue != 200) {
                terrorbox("Something went wrong");
                return;
            }
            func();
        })
}

export function saveSubject(m, func = () => { }) {
    let statusValue;
    fetch(url + "io/subjects", {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(m)
    })
        .then(Response => {
            statusValue = Response.status;
            return Response.text();
        })
        .then(data => {
            if (statusValue != 200) {
                terrorbox("Something went wrong");
                return;
            }
            func();
        })
}






//=======================DELETE Requests====================





export function deleteTeacher(teacherName, func = () => { }) {
    let statusValue;
    fetch(url + "/" + teacherName, {
        method: "DELETE"
    })
        .then(Response => {
            statusValue = Response.status;
            return Response.text()
        })
        .then(data => {
            if (statusValue != 200) {
                terrorbox("Something went wrong");
                return;
            }
            func();
        })
}

export function deleteSubject(subjectName, func = () => { }) {
    let statusValue;
    fetch(url + "/" + subjectName, {
        method: "DELETE"
    })
        .then(Response => {
            statusValue = Response.status;
            return Response.text()
        })
        .then(data => {
            if (statusValue != 200) {
                terrorbox("Something went wrong");
                return;
            }
            func();
        })
}