export const teachers_for_subject:Map<String,Set<String>>=new Map() //Do not write to this object. Format {subject1:{teach1,teach2}}

export class Teacher { //Do not write to this class's objects directly, access trough TeacherList
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

export class Subject { //Do not write to this class's objects directly, access trough SubjectList
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
    private data: Map<String, Teacher> = new Map()
    private stopCalculatonCallback:()=>void

    constructor(callback:()=>void) {
        this.stopCalculatonCallback=callback
    }

    setTeachers(teachers: Array<Teacher>|Teacher) { //add the teacher if dosen't exist else update the teacher
        this.stopCalculatonCallback()
        if(!(teachers instanceof Array)) teachers=[teachers]
        for (let value of teachers) {
            if(this.data.has(value.name)) this.removeTeacher(value.name)

            if (value instanceof Teacher) {
                for(let subject of value.subjects){
                    subject=subject.toUpperCase()
                    if(teachers_for_subject.has(subject)) teachers_for_subject.get(subject).add(value.name)
                    else teachers_for_subject.set(subject,new Set([value.name]))
                }

                this.data.set(value.name, value)
            } else throw new TypeError("elements of \'teachers\' must be objects of class Teacher")
        }
    }

    removeTeacher(name:String):boolean{
        this.stopCalculatonCallback()
        if(!this.data.has(name)) return false

        for(let subject of this.data.get(name).subjects){
            subject=subject.toUpperCase()
            if(teachers_for_subject.has(subject))teachers_for_subject.get(subject).delete(name)
        }
        return true
    }

    getTeacherByName(name:String):Teacher{
        return JSON.parse(JSON.stringify(this.data.get(name))) //Return deep copy of the teacher object
    }

    getTeacherNamesIterator():IterableIterator<String>{
        return this.data.keys()
    }
    /*
    Demo :
    var iterObj=obj.getTeacherNamesIterator()
    for(const teacherName of iterObj) console.log(teacherName)
    */
}

export class SubjectList{
    private data: Map<String, Subject> = new Map()
    private stopCalculatonCallback:()=>void

    constructor(callback:()=>void){
        this.stopCalculatonCallback=callback
    }

    setSubjects(subjects: Array<Subject>){  //add the subject if dosen't exist else update the subject
        this.stopCalculatonCallback()
        for (let value of subjects) {
            if (value instanceof Subject) {
                this.data.set(value.subjectCode, value)
            } else throw new TypeError("elements of \'subjects\' must be objects of class Subject")
        }
    }

    removeSubject(subjectCode:String):boolean{
        this.stopCalculatonCallback()
        return this.data.delete(subjectCode)
    }

    getSubjectByCode(subjectCode:String):Teacher{
        return JSON.parse(JSON.stringify(this.data.get(subjectCode))) //Return deep copy of the subject object
    }

    getSubjectCodesIterator():IterableIterator<String>{
        return this.data.keys()
    }
}