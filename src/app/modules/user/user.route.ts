import { Router } from 'express';
import { userControllers } from './user.controller';

const userRoute = Router();

userRoute.post('/', userControllers.createUser);
userRoute.get('/:id', userControllers.getSingleUser);
userRoute.put('/:id', userControllers.updateUser);
userRoute.delete('/:id', userControllers.deleteUser);
userRoute.get('/', userControllers.getAllUser);

export default userRoute;
