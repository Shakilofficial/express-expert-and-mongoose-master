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
exports.Student = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
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
        required: [true, 'Please enter student id'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [20, 'Password must be less than 20 characters'],
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
        required: true,
    },
    emergencyContactNo: {
        type: String,
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { toJSON: { virtuals: true }, timestamps: true });
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
//pre-save hook/middleware
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //hash password
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
//post-save hook/middleware
studentSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = '';
        next();
    });
});
//Query middleware the database
studentSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
studentSchema.pre('findOne', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
studentSchema.pre('aggregate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
        next();
    });
});
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
