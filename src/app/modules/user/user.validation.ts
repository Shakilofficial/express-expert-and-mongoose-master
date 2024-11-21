import { z } from 'zod';

// Sub-schema for User Name
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First Name must be at least 2 characters long')
    .max(20, 'First Name must not exceed 20 characters')
    .trim(),
  lastName: z
    .string()
    .min(2, 'Last Name must be at least 2 characters long')
    .max(20, 'Last Name must not exceed 20 characters')
    .trim(),
});

// Sub-schema for User Address
const userAddressValidationSchema = z.object({
  street: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  country: z.string().trim().optional(),
});

// Main User Validation Schema
const userValidationSchema = z.object({
  name: userNameValidationSchema.required(),
  age: z
    .number()
    .min(0, 'Age must be a positive number')
    .max(100, 'Age must not exceed 100 years'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits')
    .optional(),
  photo: z.string().url('Photo must be a valid URL').optional(),
  address: userAddressValidationSchema.optional(),
  role: z
    .enum(['user', 'admin'], {
      required_error: 'Role is required',
    })
    .default('user'),
  status: z
    .enum(['active', 'inactive', 'suspended'], {
      required_error: 'Status is required',
    })
    .default('active'),
});

export default userValidationSchema;
