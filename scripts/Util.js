//DO NOT INSTANTIATE THESE CLASSES DIRECTLY. use them through Algoritm class in Algorithms.js
export class Teacher {
    constructor(name, sems, free_time, subjects) {
        this.name = name.toLowerCase(); //name of the sir 
        this.sems = sems; //array of semisters that sir takes in form of integer
        this.free_time = free_time; //2D array of time and week [max val 7 for 8 preiods, max val 4 for 5 days]
        this.subjects = subjects; //array of subjects that sir takes in form of string
    }
}
export class Subject {
    constructor(subjectCode, sem, lectureCount, isPractical) {
        this.subjectCode = subjectCode.toUpperCase(); //Subject code to uniquely identify subjects
        this.sem = sem; //semester of this subject
        this.lectureCount = lectureCount; //total no. of lectures alloted to this subject
        this.isPractical = isPractical; //if false then the subject is theory otherwise practical
    }
}
export class TeacherList {
    constructor(callback) {
        this.teachers = new Map();
        this.stopCalculatonCallback = callback;
    }
    addTeachers(teachers) {
        this.stopCalculatonCallback();
        for (let value of teachers) {
            if (value instanceof Teacher) {
                this.teachers.set(value.name, value);
            }
            else
                throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
        }
    }
    removeTeacher(name) {
        this.stopCalculatonCallback();
        return this.teachers.delete(name);
    }
    getTeacherByName(name) {
        return JSON.parse(JSON.stringify(this.teachers.get(name))); //Return deep copy of the teacher object
    }
    getTeacherNamesIterator() {
        return this.teachers.keys();
    }
}
export class SubjectList {
    constructor(callback) {
        this.subjects = new Map();
        this.stopCalculatonCallback = callback;
    }
    addSubjects(subjects) {
        this.stopCalculatonCallback();
        for (let value of subjects) {
            if (value instanceof Subject) {
                this.subjects.set(value.subjectCode, value);
            }
            else
                throw new TypeError("elements of \'subjects\' must be objects of class Subject");
        }
    }
    removeSubject(subjectCode) {
        this.stopCalculatonCallback();
        return this.subjects.delete(subjectCode);
    }
    getSubjectByCode(subjectCode) {
        return JSON.parse(JSON.stringify(this.subjects.get(subjectCode))); //Return deep copy of the subject object
    }
    getSubjectCodesIterator() {
        return this.subjects.keys();
    }
}
