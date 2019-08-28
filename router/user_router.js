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
userRouter.get('/queryVote', (req, res) => {
  voteModel.selectAll().then(result => {
      res.status(200).send({result: result[0]});
  }).catch(err => {
      res.status(500).send({err: err});
  });
});

// 진행 중인 선거 선택
userRouter.get('/queryVote/:voteId', (req, res) => {
  voteModel.select(req.params.voteId).then(result => {
      res.status(200).send({result: result[0]});
  }).catch(err => {
      res.status(500).send({err: err});
  });
});

// 선거권자 인증(일반)
userRouter.post('/check/:voteId', (req, res) => {
    const user = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,                                                                                                                                                                                                       
    };
    const auth = req.body.auth;
    electorateModel.select(user).then(result => {
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
        }).catch(err => {
        // 에러 페이지로 이동
    });
});

// 휴대폰 번호로 인증번호 조회
userRouter.post('/queryAuthWithPhone/:voteId/', (req, res) => {
    const user = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
        phone: req.body.phone
    };
    electorateModel.selectAuthWithPhone(user).then(result => {
        console.log(result[0]);
        // 휴대폰으로 인증번호 전송
    }).catch(err => {
        // 에러 페이지로 이동
    });
});

//
userRouter.post('/vote', (req, res) => {

})

module.exports = userRouter;