import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	// Unique True Will Create An Internal Index For This Field
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	image: { type: String },
	date: { type: Date, default: Date.now },
	events: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Event' }],
	notes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Note' }],
	contacts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Contact' }]
});

userSchema.plugin(uniqueValidator);
export default mongoose.model('User', userSchema);
