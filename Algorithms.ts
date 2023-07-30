import {Teacher,Subject} from "./Util"

class Algorithm {
    private teachers: Map<String, Teacher>
    private subjects: Map<String, Subject>
    private isWorking: Boolean = false

    constructor(teachers?: Array<Teacher>, subjects?: Array<Subject>) {
        if (teachers) {
            for (let value of teachers) {
                if(value instanceof Teacher){
                    this.teachers.set(value.name,value)
                } else throw new TypeError("elements of \'teachers\' must be objects of class Teacher")
            }
        }
        else this.teachers = new Map()

        if (subjects) {
            for (let value of subjects) {
                if(value instanceof Subject){
                    this.subjects.set(value.subjectCode,value)
                } else throw new TypeError("elements of \'subjects\' must be objects of class Subject")
            }
        }
        else this.subjects = new Map()
    }

    addTeachers(teachers:Array<Teacher>,subjects:Array<Subject>){
        for (let value of teachers) {
            if(value instanceof Teacher){
                this.teachers.set(value.name,value)
            } else throw new TypeError("elements of \'teachers\' must be objects of class Teacher")
        }
        for (let value of subjects) {
            if(value instanceof Subject){
                this.subjects.set(value.subjectCode,value)
            } else throw new TypeError("elements of \'subjects\' must be objects of class Subject")
        }
    }

}