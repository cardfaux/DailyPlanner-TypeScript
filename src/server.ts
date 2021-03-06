/* eslint-disable @typescript-eslint/no-unused-vars */
// Core NodeJS Module
import fs from 'fs';
import path from 'path';
// Core NodeJS Module

// Packages
//const express = require('express');
import express, {
	Application,
	RequestHandler,
	Request,
	Response,
	NextFunction,
	json
} from 'express';
import { connect } from 'mongoose';
// Packages

// Express
const app: Application = express();
// Express

// Test Connection Route
// http://localhost:5000
app.get('/', (req: Request, res: Response) => res.send('API RUNNING'));
// Test Connection Route

// Define Routers
import { usersRouter } from './routes/users-routes';
import { eventsRouter } from './routes/events-routes';
import { notesRouter } from './routes/notes-routes';
import { contactsRouter } from './routes/contacts-routes';
// Error Model
import { HttpError } from './models/http-error';

// BodyParser InIt
app.use(json());
// BodyParser InIt

// Parse The Image Uploads
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
// Parse The Image Uploads

// CORS Middleware to attatch to every response
app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, PUT, DELETE'
	);
	next();
});

// Bring In And Prefix Routes Middleware
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/contacts', contactsRouter);

// Default Error Handling MiddleWare
app.use(
	(req, res, next): RequestHandler => {
		const error = new HttpError('Could Not Find This Route!!!', 404);
		throw error;
	}
);

// With error As A Parameter Express Knows It's An Error Middleware
// Will Only Get Executed on Requests That Has An Error Attatched To It, If Any Middleware Before Has An Error
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
	// Rollback File Upload If We Get An Error
	if (req.file) {
		fs.unlink(req.file.path, (err: any) => {
			console.log(err);
		});
	}
	// Check If Response and Headers Has Already Been Sent
	if (res.headersSent) {
		// return next and forward the Error
		return next(error);
	}
	// If We Make It Here Then No Response Has Been Sent, So We Send One
	res.status(error.code || 500);
	// Every Error Sent Back Should Have A Message Property
	res.json({ message: error.message || 'An Unknown Error Occurred' });
});
// Error Handling Routes And MiddleWare

// Start The Server And Connect To The DataBase
const PORT: string | number = process.env.PORT || 5000;
connect(
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@chatterbox-duf9f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
	.then(() => {
		app.listen(PORT, () => console.log(`API IS RUNNING ON PORT ${PORT}.....`));
	})
	.then(() => {
		console.log('MongoDB Connected.....');
	})
	.catch((error) => {
		console.log(error);
	});
// Start The Server And Connect To The DataBase
