"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Algorithm = /** @class */ (function () {
    function Algorithm(teachers, subjects) {
        this.teachers = new Map();
        this.subjects = new Map();
        this.isWorking = false;
        if (teachers) {
            for (var _i = 0, teachers_1 = teachers; _i < teachers_1.length; _i++) {
                var value = teachers_1[_i];
                if (value instanceof Util_1.Teacher) {
                    this.teachers.set(value.name, value);
                }
                else
                    throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
            }
        }
        if (subjects) {
            for (var _a = 0, subjects_1 = subjects; _a < subjects_1.length; _a++) {
                var value = subjects_1[_a];
                if (value instanceof Util_1.Subject) {
                    this.subjects.set(value.subjectCode, value);
                }
                else
                    throw new TypeError("elements of \'subjects\' must be objects of class Subject");
            }
        }
    }
    Algorithm.prototype.addTeachers = function (teachers, subjects) {
        for (var _i = 0, teachers_2 = teachers; _i < teachers_2.length; _i++) {
            var value = teachers_2[_i];
            if (value instanceof Util_1.Teacher) {
                this.teachers.set(value.name, value);
            }
            else
                throw new TypeError("elements of \'teachers\' must be objects of class Teacher");
        }
        for (var _a = 0, subjects_2 = subjects; _a < subjects_2.length; _a++) {
            var value = subjects_2[_a];
            if (value instanceof Util_1.Subject) {
                this.subjects.set(value.subjectCode, value);
            }
            else
                throw new TypeError("elements of \'subjects\' must be objects of class Subject");
        }
    };
    return Algorithm;
}());
