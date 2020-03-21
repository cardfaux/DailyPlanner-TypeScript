import { Router } from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import {
	getUsers,
	signup,
	login,
	getMyData
} from '../controllers/users-controllers';
import fileUpload from '../middleware/file-upload';

export const usersRouter = Router();

// -----------------Users Routes Starts-----------------------------
usersRouter.get('/', getUsers);

usersRouter.post(
	'/signup',
	fileUpload.single('image'),
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.normalizeEmail()
			.isEmail(),
		check('password').isLength({ min: 6 })
	],
	signup
);

usersRouter.post('/login', login);

usersRouter.get('/myData', checkAuth, getMyData);
// ----------------Users Routes Ends----------------------------------
