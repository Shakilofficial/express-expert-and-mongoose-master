"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const studentNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, 'First Name is required')
        .max(20, 'First Name must not exceed 20 characters')
        .regex(/^[A-Z][a-z]*$/, {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z.string().min(1, 'Last Name is required'),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, 'Father Name is required'),
    fatherOccupation: zod_1.z.string().min(1, 'Father Occupation is required'),
    fatherContactNo: zod_1.z.string().min(1, 'Father Contact No is required'),
    motherName: zod_1.z.string().min(1, 'Mother Name is required'),
    motherOccupation: zod_1.z.string().min(1, 'Mother Occupation is required'),
    motherContactNo: zod_1.z.string().min(1, 'Mother Contact No is required'),
});
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Local Guardian Name is required'),
    occupation: zod_1.z.string().min(1, 'Occupation is required'),
    contactNo: zod_1.z.string().min(1, 'Contact No is required'),
});
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'ID is required'),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters'),
    name: studentNameValidationSchema.required(),
    gender: zod_1.z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
    }),
    dateOfBirth: zod_1.z.string(),
    email: zod_1.z.string().email('Invalid email format').min(1, 'Email is required'),
    contactNo: zod_1.z.string().min(1, 'Contact No is required'),
    emergencyContactNo: zod_1.z.string().min(1, 'Emergency Contact No is required'),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'Blood Group is required',
    }),
    presentAddress: zod_1.z.string().min(1, 'Present Address is required'),
    permanentAddress: zod_1.z.string().min(1, 'Permanent Address is required'),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImage: zod_1.z.string().url('Invalid URL format').optional(),
    isActive: zod_1.z
        .enum(['active', 'blocked'], { required_error: 'Status is required' })
        .default('active'),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.default = studentValidationSchema;
