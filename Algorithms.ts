import { Teacher, Subject,TeacherList,SubjectList } from "./Util.js"

export class Algorithm {
    teachers: TeacherList
    subjects: SubjectList
    private isWorking: Boolean = false

    constructor(teachers?: Array<Teacher>, subjects?: Array<Subject>) {
        this.teachers=new TeacherList(this.stopCalculation)
        this.subjects=new SubjectList(this.stopCalculation)

        if(teachers)this.teachers.addTeachers(teachers)
        if(subjects)this.subjects.addSubjects(subjects)

    }

    stopCalculation(){
        if(this.isWorking){
            this.isWorking=false
        }
    }

}