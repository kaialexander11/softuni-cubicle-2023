const express = require('express');

const dbConnect = require('./config/dbConfig');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const routes = require('./routes');

const app = express();

const PORT = 5000;

expressConfig(app);
handlebarsConfig(app);

dbConnect()
    .then(() => console.log('DB Connected successfully!'))
    .catch(err => {
        console.log('DB error: ', err);
    });

app.use(routes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}... `));


//console.log('Hello world!');
//const handlebars = require('express-handlebars');
//const path = require('path');
// Express config:
// require('./config/expressConfig')(app); => valid and does the same as the line above! (optional)
//app.use(express.static('src/public')); => This will work exactly as the line below!
//app.use(express.static(path.resolve(__dirname, 'public')));

//Handlebars:

//HOME ROUTE
//app.get('/', homeController.getHome);