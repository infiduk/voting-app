const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = express.Router();
const electorateModel = require('../model/electorate_model');
const candidateModel = require('../model/candidate_model');

userRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// 진행 중인 선거 목록 조회
userRouter.get('/vote', async (req, res) => {
    try {
        let result = await voteModel.selectAll();
        res.status(200).send(result[0][0]);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 진행 중인 선거 선택
userRouter.get('/vote/:voteId', async (req, res) => {
    try {
        let result = await voteModel.select(req.params.voteId);
        res.status(200).send(result[0][0]);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 선거권자 인증(일반)
userRouter.post('/electorate', async (req, res) => {
    const electorate = {
        vote_id: req.body.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,                                                                                                                                                                                                       
    };
    const auth = req.body.auth;
    try {
        let result = await electorateModel.select(electorate);
        if(result[0].length > 0) {
            req.session.user = {
                vote_id: result[0][0].vote_id,
                name: result[0][0].name,
                name_ex: result[0][0].name_ex
            };
            if(result[0][0].auth != auth) { // 인증번호가 일치하지 않는 경우
                // 인증번호 불일치 메시지 전송
            } else if(result[0][0].vote_time != null) { // 이미 투표한 경우
                // 이미 투표했다는 메시지 전송
            } else {
                // 투표 페이지로 이동
            }
        } else { // 데이터 없음

        }
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 휴대폰 번호로 인증번호 조회
userRouter.post('/auth/:voteId/', async (req, res) => {
    const user = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
    };
    const phone = req.body.phone;
    try {
        let result = await electorateModel.select(user);
        if(phone == result[0][0].phone) {
            let auth = await electorateModel.updateAuth(result[0][0].id);
            // 생성된 인증번호를 휴대폰으로 전송
            // response
        } else { // 해당 투표 선거권자에 포함되지 않았음
            // response 
        }
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 투표
userRouter.post('/vote', async (req, res) => {
    // 회원이 선택한 후보자 목록 받아와서 득표수 올려줌
    const candidates = req.body.candidates;
    try {
        let result = await candidateModel.updateVotes(candidates);
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = userRouter;