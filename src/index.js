//console.log('Hello world!');

const express = require('express');
//const handlebars = require('express-handlebars');
const path = require('path');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const app = express();

const PORT = 5000;

// Express config:

expressConfig(app);
// require('./config/expressConfig')(app); => valid and does the same as the line above! (optional)
//app.use(express.static('src/public')); => This will work exactly as the line below!
//app.use(express.static(path.resolve(__dirname, 'public')));

//Handlebars:
handlebarsConfig(app);


// ROUTES:
app.get('/', (req, res) => {
    //res.send('Hello from Express!'); => valid and working!
    res.render('index');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}... `));
