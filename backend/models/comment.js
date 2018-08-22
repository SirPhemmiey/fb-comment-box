import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    author: { type: String },
    text: { type: String },
}, { timestamps: true });

export default mongoose.model('Comment', CommentsSchema);