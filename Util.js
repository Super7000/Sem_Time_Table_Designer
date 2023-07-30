"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = exports.Teacher = void 0;
var Teacher = /** @class */ (function () {
    function Teacher(name, sems, free_time, subjects) {
        this.name = name.toLowerCase(); //name of the sir 
        this.sems = sems; //array of semisters that sir takes in form of integer
        this.free_time = free_time; //2D array of time and week [max val 7 for 8 preiods, max val 4 for 5 days]
        this.subjects = subjects; //array of subjects that sir takes in form of string
    }
    return Teacher;
}());
exports.Teacher = Teacher;
var Subject = /** @class */ (function () {
    function Subject(subjectCode, sem, lectureCount, isPractical) {
        this.subjectCode = subjectCode.toUpperCase(); //Subject code to uniquely identify subjects
        this.sem = sem; //semester of this subject
        this.lectureCount = lectureCount; //total no. of lectures alloted to this subject
        this.isPractical = isPractical; //if false then the subject is theory otherwise practical
    }
    return Subject;
}());
exports.Subject = Subject;
