export const teachers_for_subject = new Map(); //Do not write to this object. Format {subject1:{teach1,teach2}}
export class Teacher {
    constructor(name, sems, free_time, subjects) {
        this.name = name.toLowerCase(); //name of the sir 
        this.sems = sems; //array of semesters that sir takes in form of integer
        this.free_time = free_time; //2D array of time and week [max val 4 for 5 days, max val 7 for 8 preiods] format: [day,period]
        this.subjects = subjects; //array of subjects that sir takes in form of string
    }
}
export class Subject {
    constructor(subjectCode, sem, lectureCount, isPractical, classRoom) {
        this.subjectCode = subjectCode.toUpperCase(); //Subject code to uniquely identify subjects
        this.sem = sem; //semester of this subject
        this.lectureCount = lectureCount; //total no. of lectures alloted to this subject
        this.isPractical = isPractical; //if false then the subject is theory otherwise practical
        this.classRoom = classRoom; //class room of this subject
    }
}
export class TeacherList {
    constructor(callback) {
        this.data = new Map();
        this.stopCalculatonCallback = callback;
    }
    setTeachers(teachers) {
        this.stopCalculatonCallback();
        if (!(teachers instanceof Array))
            teachers = [teachers];
        for (let value of teachers) {
            if (this.data.has(value.name))
                this.removeTeacher(value.name);
            if (value instanceof Teacher) {
                for (let subject of value.subjects) {
                    subject = subject.toUpperCase();
                    if (teachers_for_subject.has(subject))
                        teachers_for_subject.get(subject).add(value.name);
                    else
                        teachers_for_subject.set(subject, new Set([value.name]));
                }
                this.data.set(value.name, value);
            }
            else
                throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
        }
    }
    removeTeacher(name) {
        this.stopCalculatonCallback();
        if (!this.data.has(name))
            return false;
        for (let subject of this.data.get(name).subjects) {
            subject = subject.toUpperCase();
            if (teachers_for_subject.has(subject))
                teachers_for_subject.get(subject).delete(name);
        }
        return true;
    }
    getTeacherByName(name) {
        if (!this.has(name))
            throw new Error(`No teacher with name ${name}`);
        return JSON.parse(JSON.stringify(this.data.get(name))); //Return deep copy of the teacher object
    }
    getTeacherNamesIterator() {
        return this.data.keys();
    }
    /*
    Demo :
    var iterObj=obj.getTeacherNamesIterator()
    for(const teacherName of iterObj) console.log(teacherName)
    */
    has(name) {
        return this.data.has(name);
    }
    size() {
        return this.data.size;
    }
}
export class SubjectList {
    constructor(callback) {
        this.data = new Map();
        this.stopCalculatonCallback = callback;
    }
    setSubjects(subjects) {
        this.stopCalculatonCallback();
        for (let value of subjects) {
            if (value instanceof Subject) {
                this.data.set(value.subjectCode, value);
            }
            else
                throw new TypeError("elements of \'subjects\' must be objects of class Subject");
        }
    }
    removeSubject(subjectCode) {
        this.stopCalculatonCallback();
        return this.data.delete(subjectCode);
    }
    getSubjectByCode(subjectCode) {
        if (!this.has(subjectCode))
            throw new Error(`No subject with code ${subjectCode}`);
        return JSON.parse(JSON.stringify(this.data.get(subjectCode))); //Return deep copy of the subject object
    }
    /*
    Demo :
    var iterObj=obj.getSubjectCodesIterator()
    for(const subjectCode of iterObj) console.log(subjectCode)
    */
    getSubjectCodesIterator() {
        return this.data.keys();
    }
    has(subjectCode) {
        return this.data.has(subjectCode);
    }
    size() {
        return this.data.size;
    }
}
export function terrorbox(errMSg, color, timeout) {
    document.querySelector(".errorBox").classList.add("active");
    document.querySelector(".errorBox .errorMsg").innerHTML = errMSg;

    if(color!=""){
        document.querySelector(".errorBox").style.cssText = `background: rgb(${color});`;
    }
    document.querySelector(".close_err_btn.cross").addEventListener("click", () => {
        document.querySelector(".errorBox").classList.remove("active");
    })
    setTimeout(() => {
        if (document.querySelector(".errorBox.active") != null) {
            document.querySelector(".errorBox").classList.remove("active");
        };
    }, timeout);
}

//Click listener for Cards
export function clickListenerForCardActivator(){
    document.querySelectorAll(".card").forEach((t) => {
        t.addEventListener("click", () => {
            if (t != document.querySelector(".card.active")) {
                if(document.querySelector(".card.active")!=null){
                    document.querySelector(".card.active").classList.remove("active");
                }
                t.classList.add("active");
            }
        })
    });
}

export function addCardClickListener(){
    document.querySelector(".add.card").addEventListener("click",()=>{
        document.querySelectorAll(".t_d .con input").forEach((e)=>{
            e.value = "";
        });
        document.querySelector(".btn_con .ddb").style.display = "none";
        document.querySelectorAll(".t_d .con input")[0].focus();
        if(document.querySelector(".dsb.edit")!=null){
            document.querySelector(".dsb.edit").classList.remove("edit");
            document.querySelector(".dsb").classList.add("new");
        }
    });
}

export function deleteBtnFunc(){
    document.querySelector(".cBtns .cBtn").addEventListener("click",()=>{
        document.querySelector(".d_card.active").remove();
        document.querySelector(".add.card").click();
    })
}

export function saveBtnClickListener(){
    document.querySelector(".dsb").addEventListener("click",()=>{
        let val = document.querySelectorAll(".con input")[0].value.toUpperCase();
        if(val.length < 9){
            if(document.querySelector(".dsb.new")!==null){        
                let s=`<div class="d_card card" id="${val}">${val}</div>`;
                document.querySelector(".add.card.active").insertAdjacentHTML("afterend", s);;
                document.querySelectorAll(".con input").forEach((e)=>{
                    e.value="";
                })
                clickListenerForCards();
                clickListenerForCardActivator();
            } 
            if(document.querySelector(".dsb.edit")!==null){
                document.querySelector(".d_card.active").innerHTML = val;
            }
        } else {
            terrorbox("Length of the name must be less than 9","",5000);
        }
    })
}

export function clickListenerForCards(){ 
    document.querySelectorAll(".cards .d_card").forEach((e)=>{
        e.addEventListener("click",()=>{
            document.querySelectorAll(".t_d .con input")[0].value = e.innerHTML;
            document.querySelector(".btn_con .ddb").style.display = "block";
            if(document.querySelector(".dsb.new")!=null){
                document.querySelector(".dsb.new").classList.remove("new");
                document.querySelector(".dsb").classList.add("edit");
            }
        })
    })
}