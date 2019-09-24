// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // cross domain issue
const corsOptions = {
    origin: true,
    credentials: true
};

const app = express();

// Template Engine
app.set('view engine', 'ejs');
// Template File Location
app.set('/', __dirname + '/front/src');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Router
const router = require('./router/router');
app.use(router);

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.get('/testExpress', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

// app.post('/sendExpress', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`,
//     );
// });

// Server initialize
app.listen(3000, function () {
    console.log("Run server");
});