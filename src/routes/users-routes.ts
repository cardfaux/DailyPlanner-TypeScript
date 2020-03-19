import express from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import {
	getUsers,
	signup,
	login,
	getMyData
} from '../controllers/users-controllers';
import fileUpload from '../middleware/file-upload';

const router = express.Router();

// -----------------Users Routes Starts-----------------------------
router.get('/', getUsers);

router.post(
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

router.post('/login', login);

router.get('/myData', checkAuth, getMyData);
// ----------------Users Routes Ends----------------------------------

export default router;
