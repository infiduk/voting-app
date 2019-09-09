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
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 진행 중인 선거 선택
userRouter.get('/vote/:voteId', async (req, res) => {
    try {
        let result = await voteModel.select(req.params.voteId);
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 선거권자 인증(일반)
userRouter.post('/electorate/:voteId', async (req, res) => {
    const user = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,                                                                                                                                                                                                       
    };
    const auth = req.body.auth;
    try {
        let result = await electorateModel.select(user);
        if(result[0].length > 0) {
            req.session.user = {
                vote_id: result[0][0].vote_id,
                name: result[0][0].name,
                name_ex: result[0][0].name_ex,
                vote_time: result[0][0].vote_time
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
userRouter.post('/queryAuthWithPhone/:voteId/', async (req, res) => {
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
        } else { // 해당 투표 선거권자에 포함되지 않았음
            
        }
        // response
    } catch(err) {
        result(err);
    }
});

userRouter.post('/vote', (req, res) => {

})

module.exports = userRouter;