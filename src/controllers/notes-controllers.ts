// Packages
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Bring In Error Model
import { HttpError } from '../models/http-error';

// Bring In The User Model
import User from '../models/user-model';

// Bring In The Note Model
import Note from '../models/note-model';

// @type -- GET
// @path -- /api/notes
// @desc -- path to get all notes
// @aces -- PUBLIC
export const getNotes = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let notes;

	try {
		notes = await Note.find({});
	} catch (err) {
		const error = new HttpError('Fetching Notes Failed', 500);
		return next(error);
	}

	res.json({
		notes: notes.map((note) => note.toObject({ getters: true }))
	});
};

// @type -- GET
// @path -- /api/notes/me
// @desc -- path to get users notes
// @aces -- PRIVATE
export const getMyNotes = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	let myNotes: any;

	try {
		myNotes = await User.findById(req.userData.userId).populate('notes');
	} catch (err) {
		const error = new HttpError('Fetching Users Notes Failed', 500);
		return next(error);
	}

	if (!myNotes) {
		return next(new HttpError('There Is No Notes For That User.', 404));
	}

	res.json({
		notes: myNotes.notes.map(
			(note: { toObject: (arg0: { getters: boolean }) => any }) =>
				note.toObject({ getters: true })
		)
	});
};

// @type -- GET
// @path -- /api/notes/:nid
// @desc -- path to get a note by its id
// @aces -- PRIVATE
export const getNoteById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const noteId = req.params.nid;

	let note: any;
	try {
		note = await Note.findById(noteId);
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Find Note',
			500
		);
		return next(error);
	}

	if (!note || note.length === 0) {
		const error = new HttpError(
			'Could Not Find A Note For The Provided ID',
			404
		);
		return next(error);
	}

	// Turns The Place Object Into A Normal JavaScript Object
	// Getters: True Turns The Mongoose Model _id to id
	res.json({
		note: note.toObject({
			getters: true
		})
	});
};

// @type -- POST
// @path -- /api/notes
// @desc -- path to create notes
// @aces -- PRIVATE
export const createANewNote = async (req: any, res: any, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can Not Use throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { title, description } = req.body;

	// Build Event Object Instanciate Note Constructor
	const createdNote = new Note({
		title,
		description,
		creator: req.userData.userId
	});

	let user: any;
	try {
		user = await User.findById(req.userData.userId);
	} catch (err) {
		const error = new HttpError(
			'Creating A New Note Failed, Please Try Again',
			500
		);
		return next(error);
	}

	// Make Sure The User Is In The DataBase
	if (!user) {
		const error = new HttpError('Could Not Find A User For Provided Id', 404);
		return next(error);
	}

	// Create an Events Collection This Will Not Create It Automatically
	try {
		// Current Session
		// This Allows To Only Store The Changes If Both Operations Is Successful
		const sess = await mongoose.startSession();
		// Start Transaction In The Current Session
		sess.startTransaction();
		// Tell Mongoose Whst To Do
		// Create Our Place And Create An Unique Id
		await createdNote.save({ session: sess });
		// Add The Place Id To Our User As Well
		// This Push Is Not The Standard Push, Allows Mongoose To Establish A Connection Between The Models
		// Adds The PlaceId To The Places Field Of The User
		user.notes.push(createdNote);
		await user.save({ session: sess });
		// Only At This Point Is The Session Saved In The DataBase
		// If Anything Failed Before This Point All Things Would Have Been Rolled Back And Not Saved
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Creating A Note Failed, Please Try Again',
			500
		);
		return next(error);
	}

	res.status(201).json({ note: createdNote });
};

// @type -- PATCH
// @path -- /api/notes/:nid
// @desc -- path to update a note by id
// @aces -- PRIVATE
export const updateNoteById: RequestHandler = async (req: any, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can not Use Throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { title, description } = req.body;
	const noteId = req.params.nid;

	let note: any;
	try {
		note = await Note.findById(noteId);
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Update Note',
			500
		);
		return next(error);
	}

	if (note.creator.toString() !== req.userData.userId) {
		const error = new HttpError(
			'Editing Note Failed, Authorization Denied...',
			401
		);
		return next(error);
	}

	note.title = title;
	note.description = description;

	try {
		await note.save();
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Save The Updated Note',
			500
		);
		return next(error);
	}

	res.status(200).json({ note: note.toObject({ getters: true }) });
};

// @type -- DELETE
// @path -- /api/notes/:nid
// @desc -- path to delete a note by the id
// @aces -- PRIVATE
export const deleteNoteById = async (req: any, res: any, next: any) => {
	const noteId = req.params.nid;

	let note: any;
	try {
		note = await Note.findById(noteId).populate('creator');
	} catch (err) {
		const error = new HttpError('Something Went Wrong Deleteing The Note', 500);
		return next(error);
	}

	if (!note) {
		const error = new HttpError('Could Not Find A Note For The Id', 404);
		return next(error);
	}

	if (note.creator.id !== req.userData.userId) {
		const error = new HttpError(
			'Deleting Note Failed, Authorization Denied...',
			401
		);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await note.remove({ session: sess });
		// Pull Will Automatically Remove The Id
		note.creator.notes.pull(note);
		await note.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Something Went Wrong Deleteing The Note', 500);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted Note Successfully!' });
};
