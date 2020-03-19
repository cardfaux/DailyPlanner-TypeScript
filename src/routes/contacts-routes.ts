import express from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import contactsControllers from '../controllers/contacts-controllers';

const router = express.Router();

router.get('/', contactsControllers.getContacts);

router.use(checkAuth);

router.get('/me', contactsControllers.getMyContacts);

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
	contactsControllers.createMyContacts
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
	contactsControllers.updateContactById
);

router.delete('/:cid', contactsControllers.deleteContactById);

export default router;
