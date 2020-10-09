const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://[username]:[password]@cluster0.hb9uk.mongodb.net/[database]?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3500)) // app.listen(3500) is here because we want to start recieving requests when the DataBase is loaded
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parses the query into an object

// morgan middleware
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

// 404 page
// this should be on the last line in the code because it runs with every request
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});