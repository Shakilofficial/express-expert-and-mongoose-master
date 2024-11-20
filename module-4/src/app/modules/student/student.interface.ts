import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
};

export interface IStudent {
  id: string;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
}


//for creating static method of student

export interface StudentModel extends Model<IStudent>{
  isUserExists(id:string):Promise<IStudent | null>
}



//for creating instance of student
/* export type StudentMethdos = {
  isUserExist(id: string): Promise<IStudent | null>;
};

export type StudentModel = Model<
  IStudent,
  Record<string, never>,
  StudentMethdos
>;
 */