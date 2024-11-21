import { Router } from 'express';
import userRoute from '../app/modules/user/user.route';

const router = Router();

router.use('/users', userRoute);

export const routes = router;
