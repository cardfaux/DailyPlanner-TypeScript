import express from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import {
	getMyContacts,
	getContacts,
	createMyContacts,
	updateContactById,
	deleteContactById
} from '../controllers/contacts-controllers';

const router = express.Router();

router.get('/', getContacts);

router.use(checkAuth);

router.get('/me', getMyContacts);

router.post(
	'/',
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.normalizeEmail()
			.isEmail()
	],
	createMyContacts
);

router.patch(
	'/:cid',
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.normalizeEmail()
			.isEmail()
	],
	updateContactById
);

router.delete('/:cid', deleteContactById);

export default router;
