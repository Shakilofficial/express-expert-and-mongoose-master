import { Request, Response } from 'express';
// import studentValidationSchema from './student.joi.validation';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    /* 
    //schema validation  using joi
    const { student: studentData } = req.body;
    console.log(req.body);
    const { error, value } = studentValidationSchema.validate(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
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
  } catch (err) {
    console.log(err);
  } 
  */
    //validation with zod
    const zodParsedData = studentValidationSchema.parse(req.body);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
