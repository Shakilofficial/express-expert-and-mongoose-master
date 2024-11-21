import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, IUserModel } from './user.interface';
// Sub-schema for User Name
const userNameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
});

// Sub-schema for User Address
const userAddressSchema = new Schema({
  street: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  postalCode: { type: String, trim: true },
  country: { type: String, trim: true },
});

// Main User Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age must be a positive number'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [20, 'Password must be less than 20 characters'],
    },
    phone: {
      type: String,
    },
    photo: {
      type: String,
    },
    address: {
      type: userAddressSchema,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
      required: true,
    },
  },
  { timestamps: true },
);

//password hashing using bcrypt by pre hook method
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

//post hook save password
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (
  email: string,
): Promise<IUser | null> {
  const result = await User.findOne({ email });
  return result;
};

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
