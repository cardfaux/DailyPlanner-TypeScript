// Packages
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Bring In Error Model
import { HttpError } from '../models/http-error';

// Bring In The User Model
import User from '../models/user-model';

// Bring In The Event Model
import Contact from '../models/contact-model';

// @type -- GET
// @path -- /api/contacts
// @desc -- path to get all the contacts
export const getContacts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let contacts;

	try {
		contacts = await Contact.find({});
	} catch (err) {
		const error = new HttpError('Fetching Contacts Failed', 500);
		return next(error);
	}

	res.json({
		contacts: contacts.map((contact) => contact.toObject({ getters: true }))
	});
};

// @type -- GET
// @path -- /api/contacts/me
// @desc -- path to get user contacts
export const getMyContacts = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	let myContacts: any;

	try {
		myContacts = await User.findById(req.userData.userId).populate('contacts');
	} catch (err) {
		const error = new HttpError('Fetching User Contacts Failed', 500);
		return next(error);
	}

	if (!myContacts) {
		return next(new HttpError('There Is No Contacts For That User.', 404));
	}

	res.json({
		contacts: myContacts.contacts.map(
			(contact: { toObject: (arg0: { getters: boolean }) => any }) =>
				contact.toObject({ getters: true })
		)
	});
};

// @type -- GET
// @path -- /api/contacts/:cid
// @desc -- path to get a contact by its id
// @aces -- PRIVATE
export const getContactById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const contactId = req.params.cid;

	let contact: any;
	try {
		contact = await Contact.findById(contactId);
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Find Contact',
			500
		);
		return next(error);
	}

	if (!contact || contact.length === 0) {
		const error = new HttpError(
			'Could Not Find A Contact For The Provided ID',
			404
		);
		return next(error);
	}

	// Turns The Place Object Into A Normal JavaScript Object
	// Getters: True Turns The Mongoose Model _id to id
	res.json({
		contact: contact.toObject({
			getters: true
		})
	});
};

// @type -- POST
// @path -- /api/contacts
// @desc -- path to add contacts
export const createMyContacts = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can Not Use throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { name, email, address, birthday, anniversary } = req.body;

	// Build Contact Object Instanciate Contact Constructor
	const createdContact: any = new Contact({
		name,
		email,
		address,
		birthday,
		anniversary,
		creator: req.userData.userId
	});

	let user: any;
	try {
		user = await User.findById(req.userData.userId);
	} catch (err) {
		const error = new HttpError(
			'Creating A New Contact Failed, Please Try Again',
			500
		);
		return next(error);
	}

	// Make Sure The User Is In The DataBase
	if (!user) {
		const error = new HttpError('Could Not Find A User For Provided Id', 404);
		return next(error);
	}

	// Create a Contacts Collection This Will Not Create It Automatically
	try {
		// Current Session
		// This Allows To Only Store The Changes If Both Operations Is Successful
		const sess = await mongoose.startSession();
		// Start Transaction In The Current Session
		sess.startTransaction();
		// Tell Mongoose Whst To Do
		// Create Our Place And Create An Unique Id
		await createdContact.save({ session: sess });
		// Add The Place Id To Our User As Well
		// This Push Is Not The Standard Push, Allows Mongoose To Establish A Connection Between The Models
		// Adds The PlaceId To The Places Field Of The User
		user.contacts.push(createdContact);
		await user.save({ session: sess });
		// Only At This Point Is The Session Saved In The DataBase
		// If Anything Failed Before This Point All Things Would Have Been Rolled Back And Not Saved
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Creating A Contact Failed, Please Try Again',
			500
		);
		return next(error);
	}

	res.status(201).json({ contact: createdContact });
};

// @type -- PATCH
// @path -- /api/contacts/:cid
// @desc -- path to update a contact by id
export const updateContactById = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can not Use Throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { name, email, address, birthday, anniversary } = req.body;
	const contactId = req.params.cid;

	let contact: any;
	try {
		contact = await Contact.findById(contactId);
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Update Contact',
			500
		);
		return next(error);
	}

	if (contact.creator.toString() !== req.userData.userId) {
		const error = new HttpError('Editing Failed, Authorization Denied...', 401);
		return next(error);
	}

	contact.name = name;
	contact.email = email;
	contact.address = address;
	contact.birthday = birthday;
	contact.anniversary = anniversary;

	try {
		await contact.save();
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Save The Updated Contact',
			500
		);
		return next(error);
	}

	res.status(200).json({ contact: contact.toObject({ getters: true }) });
};

// @type -- DELETE
// @path -- /api/contacts/:cid
// @desc -- path to delete a contact by the id
export const deleteContactById = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	const contactId = req.params.cid;

	let contact: any;
	try {
		contact = await Contact.findById(contactId).populate('creator');
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong Deleteing The Contact',
			500
		);
		return next(error);
	}

	if (!contact) {
		const error = new HttpError('Could Not Find A Contact For The Id', 404);
		return next(error);
	}

	if (contact.creator.id !== req.userData.userId) {
		const error = new HttpError(
			'Deleting Failed, Authorization Denied...',
			401
		);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await contact.remove({ session: sess });
		// Pull Will Automatically Remove The Id
		contact.creator.contacts.pull(contact);
		await contact.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong Deleteing The Contact',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted Contact Successfully!' });
};
