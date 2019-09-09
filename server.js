// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Template Engine
app.set('view engine', 'ejs');
// Template File Location
app.set('/', __dirname + '/front/src/');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Router
const router = require('./router/router');
app.use(router);

app.get('/data', (req, res) => {
    const data = {
        lastname: "lee",
        firstname: "chanhyuk"
    }
    res.json(data);
});

// Server initialize
app.listen(5000, function() {
    console.log("Run server");
});