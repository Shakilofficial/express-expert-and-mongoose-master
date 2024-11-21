import { z } from 'zod';

const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(20, 'First Name must not exceed 20 characters')
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last Name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact No is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().min(1, 'Mother Contact No is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  contactNo: z.string().min(1, 'Contact No is required'),
});

const studentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  name: studentNameValidationSchema.required(),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z.string(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact No is required'),
  emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    required_error: 'Blood Group is required',
  }),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: z.string().url('Invalid URL format').optional(),
  isActive: z
    .enum(['active', 'blocked'], { required_error: 'Status is required' })
    .default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
