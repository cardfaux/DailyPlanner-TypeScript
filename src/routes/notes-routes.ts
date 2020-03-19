import express from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import {
	getMyNotes,
	getNoteById,
	createANewNote,
	updateNoteById,
	deleteNoteById
} from '../controllers/notes-controllers';

const router = express.Router();

//router.get('/', getNotes);

router.use(checkAuth);

router.get('/me', getMyNotes);

router.get('/:nid', getNoteById);

router.post(
	'/',
	[
		check('title')
			.not()
			.isEmpty(),
		check('description')
			.not()
			.isEmpty()
	],
	createANewNote
);

router.patch(
	'/:nid',
	[
		check('title')
			.not()
			.isEmpty(),
		check('description')
			.not()
			.isEmpty()
	],
	updateNoteById
);

router.delete('/:nid', deleteNoteById);

export default router;
