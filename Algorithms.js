import { Teacher, Subject } from "./Util.js";
export class Algorithm {
    constructor(teachers, subjects) {
        this.teachers = new Map();
        this.subjects = new Map();
        this.isWorking = false;
        if (teachers) {
            for (let value of teachers) {
                if (value instanceof Teacher) {
                    this.teachers.set(value.name, value);
                }
                else
                    throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
            }
        }
        if (subjects) {
            for (let value of subjects) {
                if (value instanceof Subject) {
                    this.subjects.set(value.subjectCode, value);
                }
                else
                    throw new TypeError("elements of \'subjects\' must be objects of class Subject");
            }
        }
    }
    addTeachers(teachers, subjects) {
        for (let value of teachers) {
            if (value instanceof Teacher) {
                this.teachers.set(value.name, value);
            }
            else
                throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
        }
        for (let value of subjects) {
            if (value instanceof Subject) {
                this.subjects.set(value.subjectCode, value);
            }
            else
                throw new TypeError("elements of \'subjects\' must be objects of class Subject");
        }
    }
}
