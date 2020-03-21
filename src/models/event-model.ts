import mongoose, { Schema, model } from 'mongoose';

const eventSchema = new Schema({
	title: { type: String, required: true },
	allDay: { type: Boolean, required: true, default: false },
	start: { type: Date, required: true },
	end: { type: Date, required: true },
	description: { type: String },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default model('Event', eventSchema);
