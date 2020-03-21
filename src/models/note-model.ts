import mongoose, { Schema, model } from 'mongoose';

const noteSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default model('Note', noteSchema);
