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

export const eventsRouter = express.Router();

eventsRouter.get('/', getEvents);

eventsRouter.use(checkAuth);

eventsRouter.get('/me', getMyEvents);

eventsRouter.post(
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

eventsRouter.patch(
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

eventsRouter.delete('/:eid', deleteEventById);
