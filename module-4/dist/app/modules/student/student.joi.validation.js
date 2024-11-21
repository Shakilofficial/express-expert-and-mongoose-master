"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const studentNameValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .trim()
        .max(20)
        .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
        .message('First Name must start with a capital letter'),
    middleName: joi_1.default.string().trim(),
    lastName: joi_1.default.string().required(),
});
const guardianValidationSchema = joi_1.default.object({
    fatherName: joi_1.default.string().required(),
    fatherOccupation: joi_1.default.string().required(),
    fatherContactNo: joi_1.default.string().required(),
    motherName: joi_1.default.string().required(),
    motherOccupation: joi_1.default.string().required(),
    motherContactNo: joi_1.default.string().required(),
});
const localGuardianValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    occupation: joi_1.default.string().required(),
    contactNo: joi_1.default.string().required(),
});
const studentValidationSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: studentNameValidationSchema.required(),
    gender: joi_1.default.string().required().valid('male', 'female', 'other'),
    dateOfBirth: joi_1.default.string(),
    email: joi_1.default.string().email().required(),
    contactNo: joi_1.default.string().required(),
    emergencyContactNo: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string()
        .required()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: joi_1.default.string().required(),
    permanentAddress: joi_1.default.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImage: joi_1.default.string(),
    isActive: joi_1.default.string().valid('active', 'blocked').required(),
    isDeleted: joi_1.default.boolean().default(false),
});
exports.default = studentValidationSchema;
