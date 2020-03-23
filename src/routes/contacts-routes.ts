import express from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import {
	getMyContacts,
	getContacts,
	getContactById,
	createMyContacts,
	updateContactById,
	deleteContactById
} from '../controllers/contacts-controllers';

export const contactsRouter = express.Router();

contactsRouter.get('/', getContacts);

contactsRouter.use(checkAuth);

contactsRouter.get('/me', getMyContacts);

contactsRouter.get('/:cid', getContactById);

contactsRouter.post(
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

contactsRouter.patch(
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

contactsRouter.delete('/:cid', deleteContactById);
