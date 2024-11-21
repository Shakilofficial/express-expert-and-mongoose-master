import { Router } from 'express';
import { userControllers } from './user.controller';

const userRoute = Router();

userRoute.post('/', userControllers.createUser);

export default userRoute;
