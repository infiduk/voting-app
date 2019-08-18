const express = require('express');
const session = require('express-session');
const voteRouter = express.Router();
const voteModel = require('../model/vote_model');

// 새로운 선거 등록
voteRouter.post('/new', (req, res) => {
    const vote = {
        title: req.body.title, 
        begin_date: req.body.begin_date, 
        end_date: req.body.end_date,
        limit: req.body.limit
    };
    try {
        voteModel.newVote(vote);
        console.log("ok");
    } catch (err) {
        console.log(err);
    }
});

voteRouter.get('/votelist', (req, res) => {
    
});

module.exports = voteRouter;