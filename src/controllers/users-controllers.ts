// Packages
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Bring In Error Model
import HttpError from '../models/http-error';

// Bring In The User Model
import User from '../models/user-model';

// @type -- GET
// @path -- /api/users
// @desc -- path to get all the users
export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let users;

	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError('Fetching Users Failed', 500);
		return next(error);
	}

	res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// @type -- GET
// @path -- /api/users/myData
// @desc -- path to get all the users
export const getMyData = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	let userData: any;

	try {
		userData = await User.findById(req.userData.userId).select('-password');
	} catch (err) {
		const error = new HttpError('Fetching User Data Failed', 500);
		return next(error);
	}

	//res.json({ user: userData.map((user) => user.toObject({ getters: true })) });
	res.json({ userData: userData.toObject({ getters: true }) });
};

// @type -- POST
// @path -- /api/users/signup
// @desc -- path to register a new user
export const signup = async (
	req: Request,
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

	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Signing Up Failed, Please Try Again', 500);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError(
			'User Already Exists, Use A Different E-Mail Or Login Instead',
			422
		);
		return next(error);
	}

	// Hash The Password
	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		const error = new HttpError('Could Not Create User, Please Try Again', 500);
		return next(error);
	}

	// New Instance Of The User Class
	const createdUser: any = new User({
		name,
		email,
		image: req.file.path,
		password: hashedPassword,
		events: [],
		notes: [],
		contacts: []
	});

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError(
			'Creating A User Failed, Please Try Again',
			500
		);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			// The Payload For The Token
			{
				userId: createdUser.id,
				email: createdUser.email,
				userName: createdUser.name
			},
			// The Secret The Token Is Signed With
			`${process.env.JWT_KEY}`,
			// How Long The Token Is Valid For
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError(
			'Creating A User Failed, Please Try Again',
			500
		);
		return next(error);
	}

	res.status(201);
	res.json({
		userId: createdUser.id,
		email: createdUser.email,
		userName: createdUser.name,
		token: token
	});
};

// @type -- POST
// @path -- /api/users/login
// @desc -- path to login a user
export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	let existingUser: any;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Logging In Failed, Please Try Again', 500);
		return next(error);
	}

	if (!existingUser) {
		const error = new HttpError('Invalid Credentials', 403);
		return next(error);
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		const error = new HttpError(
			'Logging In Failed, Please Check Your Credentials And Try Again',
			500
		);
		return next(error);
	}

	if (!isValidPassword) {
		const error = new HttpError(
			'Logging In Failed, Please Check Your Credentials And Try Again',
			500
		);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: existingUser.id,
				email: existingUser.email,
				userName: existingUser.name
			},
			`${process.env.JWT_KEY}`,
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError('Logging In Failed, Please Try Again', 500);
		return next(error);
	}

	res.json({
		userId: existingUser.id,
		email: existingUser.email,
		userName: existingUser.name,
		token: token
	});
};
