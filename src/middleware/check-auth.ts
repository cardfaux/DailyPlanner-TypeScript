import { verify } from 'jsonwebtoken';

import { HttpError } from '../models/http-error';

export default (req: any, res: any, next: any) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
		if (!token) {
			throw new Error('No Token, Authentication failed!');
		}
		const decodedToken: any = verify(token, `${process.env.JWT_KEY}`);
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
