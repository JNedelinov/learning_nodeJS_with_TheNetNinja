const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); 
// mongoose.model() will look at the name of the model and will pluralise it to look for the collection in the DB 

module.exports = Blog;