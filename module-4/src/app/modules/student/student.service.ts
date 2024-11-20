import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  // const result = await StudentModel.create(student);//built in static method
  /*   const student = new Student(studentData);

  //check if student with same id already exists
  if( await student.isUserExist(studentData.id)){
    throw new Error('Student with same id already exists');
  }

  const result = await student.save();  //built in instance method */
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Student with same id already exists');
  }
  const result = await Student.create(studentData);

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
