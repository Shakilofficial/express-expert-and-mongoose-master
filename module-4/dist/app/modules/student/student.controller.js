"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_joi_validation_1 = __importDefault(require("./student.joi.validation"));
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //creating a schema validation  using joi
        const { student: studentData } = req.body;
        const { error } = student_joi_validation_1.default.validate(studentData);
        const result = yield student_service_1.StudentServices.createStudentIntoDB(studentData);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Student Data',
                error: error.details,
            });
        }
        res.status(201).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Students are retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
