import { TeacherList, SubjectList } from "./Util.js";
export class Algorithm {
    constructor(teachers, subjects) {
        this.isWorking = false;
        this.teachers = new TeacherList(this.stopCalculation);
        this.subjects = new SubjectList(this.stopCalculation);
        if (teachers)
            this.teachers.addTeachers(teachers);
        if (subjects)
            this.subjects.addSubjects(subjects);
    }
    stopCalculation() {
        if (this.isWorking) {
            this.isWorking = false;
        }
    }
}
