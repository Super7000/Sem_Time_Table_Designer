export const teachers_for_subject:Map<string,Set<string>>=new Map() //Do not write to this object. Format {subject1:{teach1,teach2}}

export class Teacher { //Do not write to this class's objects directly, access trough TeacherList
    name: string
    sems: Array<number>
    free_time: Array<Array<number>>
    subjects: Array<string>

    constructor(name: string, sems: Array<number>, free_time: Array<Array<number>>, subjects: Array<string>) {
        this.name = name.toLowerCase(); //name of the sir 
        this.sems = sems; //array of semesters that sir takes in form of integer
        this.free_time = free_time; //2D array of time and week [max val 4 for 5 days, max val 7 for 8 preiods] format: [day,period]
        this.subjects = subjects; //array of subjects that sir takes in form of string
    }
}

export class Subject { //Do not write to this class's objects directly, access trough SubjectList
    subjectCode: string
    sem: number
    lectureCount: number
    isPractical: boolean
    classRoom:string

    constructor(subjectCode: string, sem: number, lectureCount: number, isPractical: boolean, classRoom: string) {
        this.subjectCode = subjectCode.toUpperCase() //Subject code to uniquely identify subjects
        this.sem = sem //semester of this subject
        this.lectureCount = lectureCount //total no. of lectures alloted to this subject
        this.isPractical = isPractical //if false then the subject is theory otherwise practical
        this.classRoom=classRoom //class room of this subject
    }
}

export class TeacherList{
    private data: Map<string, Teacher> = new Map()
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

    removeTeacher(name:string):boolean{
        this.stopCalculatonCallback()
        if(!this.data.has(name)) return false

        for(let subject of this.data.get(name).subjects){
            subject=subject.toUpperCase()
            if(teachers_for_subject.has(subject))teachers_for_subject.get(subject).delete(name)
        }
        return true
    }

    getTeacherByName(name:string):Teacher{
        if(!this.has(name)) throw new Error(`No teacher with name ${name}`)
        return JSON.parse(JSON.stringify(this.data.get(name))) //Return deep copy of the teacher object
    }

    getTeacherNamesIterator():IterableIterator<string>{
        return this.data.keys()
    }
    /*
    Demo :
    var iterObj=obj.getTeacherNamesIterator()
    for(const teacherName of iterObj) console.log(teacherName)
    */

    
    has(name:string):boolean{
        return this.data.has(name)
    }

    size():number{
        return this.data.size
    }
}

export class SubjectList{
    private data: Map<string, Subject> = new Map()
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

    removeSubject(subjectCode:string):boolean{
        this.stopCalculatonCallback()
        return this.data.delete(subjectCode)
    }

    getSubjectByCode(subjectCode:string):Subject{
        if(!this.has(subjectCode)) throw new Error(`No subject with code ${subjectCode}`)
        return JSON.parse(JSON.stringify(this.data.get(subjectCode))) //Return deep copy of the subject object
    }

    /*
    Demo :
    var iterObj=obj.getSubjectCodesIterator()
    for(const subjectCode of iterObj) console.log(subjectCode)
    */

    getSubjectCodesIterator():IterableIterator<string>{
        return this.data.keys()
    }
    
    has(subjectCode:string):boolean{
        return this.data.has(subjectCode)
    }

    size():number{
        return this.data.size
    }
}