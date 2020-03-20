import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const MIME_TYPE_MAP: any = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg'
};

const fileUpload = multer({
	limits: { fileSize: 500000 }, // 500 kb
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/images');
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, uuidv4() + '.' + ext);
		}
	}),
	fileFilter: (req, file, cb: any) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		const error = isValid ? null : new Error('Invalid mime type!');
		cb(error, isValid);
	}
});

export default fileUpload;
