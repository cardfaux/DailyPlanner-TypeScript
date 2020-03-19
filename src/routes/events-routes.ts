import express from 'express';
import { check } from 'express-validator';

import checkAuth from '../middleware/check-auth';

import {
	getMyEvents,
	getEvents,
	createMyEvents,
	deleteEventById,
	updateEventById
} from '../controllers/events-controllers';

const router = express.Router();

router.get('/', getEvents);

router.use(checkAuth);

router.get('/me', getMyEvents);

router.post(
	'/',
	[
		check('title')
			.not()
			.isEmpty(),
		check('allDay')
			.not()
			.isEmpty(),
		check('start')
			.not()
			.isEmpty(),
		check('end')
			.not()
			.isEmpty()
	],
	createMyEvents
);

router.patch(
	'/:eid',
	[
		check('title')
			.not()
			.isEmpty(),
		check('allDay')
			.not()
			.isEmpty(),
		check('start')
			.not()
			.isEmpty(),
		check('end')
			.not()
			.isEmpty()
	],
	updateEventById
);

router.delete('/:eid', deleteEventById);

export default router;
