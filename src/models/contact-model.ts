import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String },
	birthday: { type: Date },
	anniversary: { type: Date },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model('Contact', contactSchema);
