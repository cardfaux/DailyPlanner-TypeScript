import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model('Note', noteSchema);
