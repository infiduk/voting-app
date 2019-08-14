const express = require('express');
const session = require('express-session');
const voteRouter = express.Router();
const voteModel = require('../model/vote_model');

voteRouter.post('/new', (req, res) => {

    const vote = {
        title: req.body.title,
        candidates: req.body.candidates, 
        electorates: req.body.electorates, 
        begin_date: req.body.begin_date, 
        end_date: req.body.end_date,
        limit: req.body.limit
    };

    console.log(vote.title);
    console.log(vote.candidates);
    console.log(vote.electorates);
    console.log(vote.begin_date);
    console.log(vote.end_date);
    console.log(vote.limit);

    console.log("result: " + voteModel.insert(vote));
});

module.exports = voteRouter;