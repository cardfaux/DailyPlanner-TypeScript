import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error';

export default (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
		if (!token) {
			throw new Error('No Token, Authentication failed!', 401);
		}
		const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		const error = new HttpError(
			'Authentication failed, Authorization Denied...!',
			403
		);
		return next(error);
	}
};
