import { Teacher, Subject, TeacherList, SubjectList, teachers_for_subject } from "./Util.js"
/*
Demo:
var teacher1={"skb",[2,4,6],"","",["c++","co"]}
var teacher2={"skb2",[2,4,6],"","",["c++","co"]}

var alg=new Algorithm([teacher1, teacher2]) or
var alg=new Algorithm([teacher1, teacher2], [subject1])
*/

class TimeTable{
    semester:number
    section:String
    table:Array<Array<number>>

}

const subject_alloc:Map<String,String>=new Map() //format {subject:teachers}

export class Algorithm {
    teachers: TeacherList
    subjects: SubjectList
    private isWorking: Boolean = false

    constructor(teachers?: Array<Teacher>, subjects?: Array<Subject>) {
        this.teachers = new TeacherList(this.stopCalculation)
        this.subjects = new SubjectList(this.stopCalculation)

        if (teachers) this.teachers.setTeachers(teachers)
        if (subjects) this.subjects.setSubjects(subjects)

    }

    mandatoryAllocation(){
        
        //Assign "practical" to practical subjects as all the teacher who can teach the subject will teach the subject
        for(let subject of this.subjects.getSubjectCodesIterator()){
            if(this.subjects.getSubjectByCode(subject).isPractical){
                subject_alloc.set(subject,"practical")
            }
        }

        // if only one teacher knows a subject assign that teacher to the subject
        for(const subject of teachers_for_subject.keys()){
            if(!this.subjects.has(subject)){
                teachers_for_subject.delete(subject)
                continue
            }
            if(teachers_for_subject.get(subject).size===1){
                subject_alloc.set(subject,[...(teachers_for_subject.get(subject))][0])
            }
        }

        // if a teacher only knows one subject assign that teacher to the subject
        for(const teacher of this.teachers.getTeacherNamesIterator()){
            let obj=this.teachers.getTeacherByName(teacher)
            if(obj.subjects.length===1){
                subject_alloc.set(obj.subjects[0],obj.name.toLowerCase())
            }
        }
    }

    calculateTimeTable(){
        const errMsgs:Array<String>=new Array()

        //Ensure every subject has atleast one teacher
        for(let subject of this.subjects.getSubjectCodesIterator()){
            if(!teachers_for_subject.has(subject) || teachers_for_subject.get(subject).size===0)
                errMsgs.push(`No teacher available for ${subject}`)
        }
        if(errMsgs.length!==0)return errMsgs

        this.mandatoryAllocation()
        
    }

    stopCalculation() {
        if (this.isWorking) {
            this.isWorking = false

        }
    }

}