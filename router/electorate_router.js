const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const electorateRouter = express.Router();
const electorateModel = require('../model/electorate_model');

userRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// userRouter.post('/certificate' (req, res) => {
    
// });

module.exports = electorateRouter;