import { Teacher, Subject, TeacherList, SubjectList, teachers_for_subject } from "./Util.js"
/*
Demo:
var teacher1={"skb",[2,4,6],"","",["c++","co"]}
var teacher2={"skb2",[2,4,6],"","",["c++","co"]}

var alg=new Algorithm([teacher1, teacher2]) or
var alg=new Algorithm([teacher1, teacher2], [subject1])
*/

const section_count = 3
const subject_alloc: Array<Map<string, Array<string>>> = new Array(section_count) //format {subjectCode:[teacherName1,teacherName2]}
for (let i = 0; i < subject_alloc.length; i++) subject_alloc[i] = new Map()

class TeacherScheduleData {
    slotsLeft: number = 40
    allocated_subjects: Array<Set<string>>
    allocated_times: Array<Map<Array<number>, string>>
    constructor() {
        this.allocated_subjects = new Array(section_count)
        this.allocated_times=new Array(section_count)
        for (let i = 0; i < section_count; i++) {
            this.allocated_subjects[i] = new Set()
            this.allocated_times[i]=new Map()
        }
    }
}

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

    calculateTimeTable() {
        const teacher_allocations: Map<string, TeacherScheduleData> = new Map()
        for (let name of this.teachers.getTeacherNamesIterator()) {
            let tea: Teacher = this.teachers.getTeacherByName(name)
            let tsd: TeacherScheduleData = new TeacherScheduleData()
            if (tea.free_time instanceof Array)
                tsd.slotsLeft = tea.free_time.length
            teacher_allocations.set(name, tsd)
        }

        //format[semester0,[section0,[{[0,1]:"ESC-100"},timeslot2],section2],semester2]
        const class_schedules: Array<Array<Map<Array<number>, string>>> = new Array(this.getSemesterCount())
        for (let i = 0; i < this.getSemesterCount(); i++) {
            class_schedules[i] = new Array(section_count)
            for (let j = 0; j < section_count; j++) {
                class_schedules[i][j] = new Map()
            }
        }

        //Ensure every subject has atleast one teacher
        for (let subject of this.subjects.getSubjectCodesIterator()) {
            if (!teachers_for_subject.has(subject) || teachers_for_subject.get(subject).size === 0)
                return [`No teacher available for ${subject}`]
        }

        // if only one teacher knows a subject assign that teacher to the subject
        for (const subject of teachers_for_subject.keys()) {
            if (!this.subjects.has(subject)) {
                teachers_for_subject.delete(subject)
                continue
            }
            if (teachers_for_subject.get(subject).size === 1) {
                let sub: Subject = this.subjects.getSubjectByCode(subject)
                let teach: Teacher = this.teachers.getTeacherByName(teachers_for_subject.get(subject)[0])

                //if teacher dosen't have enough availability to teach the subject return error
                if (teach.free_time instanceof Array && sub.lectureCount * section_count > teach.free_time.length) {
                    return [`Only ${teach.name} can teach ${sub.subjectCode} but dosen't have enough availability`]
                }
                teacher_allocations.get(teach.name).slotsLeft -= sub.lectureCount * section_count
                for (let i = 0; i < subject_alloc.length; i++) {
                    subject_alloc[i].set(subject, [teach.name])
                    teacher_allocations.get(teach.name).allocated_subjects[i].add(sub.subjectCode)
                }
            }
        }

    }

    getSemesterCount(): number {
        let st: Set<number> = new Set()
        for (let sub of this.subjects.getSubjectCodesIterator()) {
            st.add(this.subjects.getSubjectByCode(sub).sem)
        }
        return st.size
    }

    stopCalculation() {
        if (this.isWorking) {
            this.isWorking = false

        }
    }

}