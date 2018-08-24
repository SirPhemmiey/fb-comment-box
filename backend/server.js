
require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import Comment from './models/comment';

//import {getSecret} from './secrets';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3001;

//db config
mongoose.connect(process.env.DB_URI);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

//read comments
router.get('/comments', (req, res) => {
    Comment.find((err, comments) => {
        if (err) return res.json({ success: false, error: err.message });
        return res.json({ success: true, data: comments })
    });
});

//add comments
router.post('/comments', (req, res) => {
    const comment = new Comment;
    const {author, text} = req.body;

    if (!author || !text) {
        return res.json({
            success: false,
            error: "The Fields cannot be empty"
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true
        });
    })
})

//edit comments
router.put('/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        res.json({ success: false, error: "No Id specified"});
    }
    Comment.findById(commentId, (err, comment) => {
        if (err) return res.json({ success: false, error: err.message });
        const { author, text } = req.body;
        if (author) comment.author = author;
        if (text) comment.text = text;
        comment.save(err => {
            if (err) return json({ success: false, error: err});
            return json({ success: true});
        })
    })
})

//delete comments
router.delete('/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        res.json({ success: false, error: "Id cannot be found" });
    }
    Comment.findByIdAndRemove(commentId, (err, comment) => {
        if (err) return res.json({ success: true, error: err });
        return res.json({ success: true });
    })
})

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening with 🔥  on port ${API_PORT}`));

export default app;