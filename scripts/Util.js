export const teachers_for_subject = new Map(); //Do not write to this object. Format {subject1:{teach1,teach2}}
export class Teacher {
    constructor(name, sems, free_time, subjects) {
        this.name = name.toLowerCase(); //name of the sir 
        this.sems = sems; //array of semisters that sir takes in form of integer
        this.free_time = free_time; //2D array of time and week [max val 7 for 8 preiods, max val 4 for 5 days]
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
