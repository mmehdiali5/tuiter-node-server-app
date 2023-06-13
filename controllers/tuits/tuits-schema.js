import mongoose from 'mongoose';
const schema = mongoose.Schema({
    tuit: String,
    likes: Number,
    liked: Boolean,
    topic: String,
    username: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    dislikes: Number,
    disliked: Boolean,
    replies:Number,
    retuits:Number
}, {collection: 'tuits'});
export default schema;
