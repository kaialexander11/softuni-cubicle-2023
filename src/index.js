//console.log('Hello world!');

const express = require('express');
//const handlebars = require('express-handlebars');
//const path = require('path');

const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const routes = require('./routes');


const app = express();

const PORT = 5000;

// Express config:

expressConfig(app);
// require('./config/expressConfig')(app); => valid and does the same as the line above! (optional)
//app.use(express.static('src/public')); => This will work exactly as the line below!
//app.use(express.static(path.resolve(__dirname, 'public')));

//Handlebars:
handlebarsConfig(app);
app.use(routes);

//HOME ROUTE
//app.get('/', homeController.getHome);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}... `));
