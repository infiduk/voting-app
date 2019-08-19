const express = require('express');
const session = require('express-session');
const voteRouter = express.Router();
const voteModel = require('../model/vote_model');

// 새로운 선거 등록
voteRouter.post('/registerVote', (req, res) => {
    const vote = {
        title: req.body.title, 
        begin_date: req.body.begin_date, 
        end_date: req.body.end_date,
        limit: req.body.limit
    };
    try {
        voteModel.create(vote);
        console.log("ok");
    } catch (err) {
        console.log(err);
    }
});

// 진행 중인 선거 목록 조회
voteRouter.get('/queryVote', (req, res) => {
    voteModel.selectAll().then(result => {
        res.status(200).send({result: result[0]});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

// 진행 중인 선거 선택
voteRouter.get('/queryVote/:voteId', (req, res) => {
    voteModel.select
})

module.exports = voteRouter;