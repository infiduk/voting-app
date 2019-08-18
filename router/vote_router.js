const express = require('express');
const session = require('express-session');
const voteRouter = express.Router();
const voteModel = require('../model/vote_model');

// 후보자랑, 선거권자 테이블을 따로 만들면 안되나?

// 새로운 선거 등록
voteRouter.post('/new', (req, res) => {
    const vote = {
        title: req.body.title, 
        begin_date: req.body.begin_date, 
        end_date: req.body.end_date,
        limit: req.body.limit
    };
    try {
        voteModel.insert(vote);
        console.log("ok");
    } catch (err) {
        console.log(err);
    }
});

voteRouter.get('/votelist', (req, res) => {
    
});

module.exports = voteRouter;