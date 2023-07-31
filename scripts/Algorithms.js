import { TeacherList, SubjectList } from "./Util.js";
/*
Demo:
var teacher1={"skb",[2,4,6],"","",["c++","co"]}
var teacher2={"skb2",[2,4,6],"","",["c++","co"]}

var alg=new Algorithm([teacher1, teacher2]) or
var alg=new Algorithm([teacher1, teacher2], [subject1])
*/
export class Algorithm {
    constructor(teachers, subjects) {
        this.isWorking = false;
        this.teachers = new TeacherList(this.stopCalculation);
        this.subjects = new SubjectList(this.stopCalculation);
        if (teachers)
            this.teachers.setTeachers(teachers);
        if (subjects)
            this.subjects.setSubjects(subjects);
    }
    stopCalculation() {
        if (this.isWorking) {
            this.isWorking = false;
        }
    }
}
