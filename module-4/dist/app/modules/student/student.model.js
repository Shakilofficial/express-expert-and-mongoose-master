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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const studentNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please enter first name'],
        maxlength: [10, 'First name must be less than 10 characters'],
        /* validate: {
          validator: function (value: string) {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            return firstNameStr === value;
          },
          message: '{VALUE} is not in Captalized format',
        }, */
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name'],
        /* validate: {
          validator: (value: string) => validator.isAlpha(value),
          message: '{VALUE} is not an alpha value',
        }, */
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, 'Please enter father name'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Please enter father occupation'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Please enter father contact no'],
    },
    motherName: {
        type: String,
        required: [true, 'Please enter mother name'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Please enter mother occupation'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Please enter mother contact no'],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter local guardian name'],
    },
    occupation: {
        type: String,
        required: [true, 'Please enter local guardian occupation'],
    },
    contactNo: {
        type: String,
        required: [true, 'Please enter local guardian contact no'],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: { type: studentNameSchema, required: true },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender',
        },
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        /* validate: {
          validator: (value: string) => validator.isEmail(value),
          message: '{VALUE} is not a valid email',
        } */
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        unique: true,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: "Blood group must be either 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-' or 'O+', 'O-'.",
        },
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: {
        type: String,
    },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
}, { timestamps: true });
//creating custom static method
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.Student.findOne({ id });
        return result;
    });
};
/* //custom instance method
studentSchema.methods.isUserExist = async function (id: string) {
  const result = await Student.findOne({ id });
  return result;
}; */
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
