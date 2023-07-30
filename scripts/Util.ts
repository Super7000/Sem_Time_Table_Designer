export class Teacher {
    name: String
    sems: Array<number>
    free_time: Array<Array<number>>
    subjects: Array<String>

    constructor(name: String, sems: Array<number>, free_time: Array<Array<number>>, subjects: Array<String>) {
        this.name = name.toLowerCase(); //name of the sir 
        this.sems = sems; //array of semisters that sir takes in form of integer
        this.free_time = free_time; //2D array of time and week [max val 7 for 8 preiods, max val 4 for 5 days]
        this.subjects = subjects; //array of subjects that sir takes in form of string
    }
}

export class Subject {
    subjectCode: String
    sem: number
    lectureCount: number
    isPractical: boolean

    constructor(subjectCode: String, sem: number, lectureCount: number, isPractical: boolean) {
        this.subjectCode = subjectCode.toUpperCase() //Subject code to uniquely identify subjects
        this.sem = sem //semester of this subject
        this.lectureCount = lectureCount //total no. of lectures alloted to this subject
        this.isPractical = isPractical //if false then the subject is theory otherwise practical
    }
}

export class TeacherList{
    private teachers: Map<String, Teacher> = new Map()
    private stopCalculatonCallback:()=>void

    constructor(callback:()=>void) {
        this.stopCalculatonCallback=callback
    }

    addTeachers(teachers: Array<Teacher>) {
        this.stopCalculatonCallback()
        for (let value of teachers) {
            if (value instanceof Teacher) {
                this.teachers.set(value.name, value)
            } else throw new TypeError("elements of \'teachers\' must be objects of class Teacher")
        }
    }

    removeTeacher(name:String):boolean{
        this.stopCalculatonCallback()
        return this.teachers.delete(name)
    }

    getTeacherByName(name:String):Teacher{
        return JSON.parse(JSON.stringify(this.teachers.get(name))) //Return deep copy of the teacher object
    }

    getTeacherNamesIterator():IterableIterator<String>{
        return this.teachers.keys()
    }
}

export class SubjectList{
    private subjects: Map<String, Subject> = new Map()
    private stopCalculatonCallback:()=>void

    constructor(callback:()=>void){
        this.stopCalculatonCallback=callback
    }

    addSubjects(subjects: Array<Subject>){
        this.stopCalculatonCallback()
        for (let value of subjects) {
            if (value instanceof Subject) {
                this.subjects.set(value.subjectCode, value)
            } else throw new TypeError("elements of \'subjects\' must be objects of class Subject")
        }
    }

    removeSubject(subjectCode:String):boolean{
        this.stopCalculatonCallback()
        return this.subjects.delete(subjectCode)
    }

    getSubjectByCode(subjectCode:String):Teacher{
        return JSON.parse(JSON.stringify(this.subjects.get(subjectCode))) //Return deep copy of the subject object
    }

    getSubjectCodesIterator():IterableIterator<String>{
        return this.subjects.keys()
    }
}