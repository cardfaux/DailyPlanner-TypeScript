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

export const notesRouter = express.Router();

//router.get('/', getNotes);

notesRouter.use(checkAuth);

notesRouter.get('/me', getMyNotes);

notesRouter.get('/:nid', getNoteById);

notesRouter.post(
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

notesRouter.patch(
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

notesRouter.delete('/:nid', deleteNoteById);
