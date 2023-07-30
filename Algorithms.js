"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algorithm = void 0;
const Util_1 = require("./Util");
class Algorithm {
    constructor(teachers, subjects) {
        this.teachers = new Map();
        this.subjects = new Map();
        this.isWorking = false;
        if (teachers) {
            for (let value of teachers) {
                if (value instanceof Util_1.Teacher) {
                    this.teachers.set(value.name, value);
                }
                else
                    throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
            }
        }
        if (subjects) {
            for (let value of subjects) {
                if (value instanceof Util_1.Subject) {
                    this.subjects.set(value.subjectCode, value);
                }
                else
                    throw new TypeError("elements of \'subjects\' must be objects of class Subject");
            }
        }
    }
    addTeachers(teachers, subjects) {
        for (let value of teachers) {
            if (value instanceof Util_1.Teacher) {
                this.teachers.set(value.name, value);
            }
            else
                throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
        }
        for (let value of subjects) {
            if (value instanceof Util_1.Subject) {
                this.subjects.set(value.subjectCode, value);
            }
            else
                throw new TypeError("elements of \'subjects\' must be objects of class Subject");
        }
    }
}
exports.Algorithm = Algorithm;
