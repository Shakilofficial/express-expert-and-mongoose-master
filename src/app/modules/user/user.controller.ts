import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParseData = userValidationSchema.parse(req.body);
    const result = await userServices.createUser(zodParseData);

    res.status(201).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const result = await userServices.getSingleUser(userId);

    res.status(200).json({
      success: true,
      message: `User with ID ${userId} retrieved successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const body = req.body;
    const result = await userServices.updateUser(userId, body);

    res.status(200).json({
      success: true,
      message: `User data ID ${userId} updated successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUser(id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
