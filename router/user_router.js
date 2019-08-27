const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = express.Router();
const electorateModel = require('../model/user_model');

userRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

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
  voteModel.select(req.params.voteId).then(result => {
      res.status(200).send({result: result[0]});
  }).catch(err => {
      res.status(500).send({err: err});
  });
});

// 선거권자 목록에 있는지 조회
userRouter.get('/checkElectorate/:voteId', (req, res) => {
    const user = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
        birthday: req.body.birthday                                                                                                                                                                                                              
    };
    electorateModel.select(user).then(result => {
        req.session.user = {
            vote_id: result[0].vote_id,
            name: result[0].name,
            name_ex: result[0].name_ex
        };
        res.status(200).send({result: result[0]});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

// 인증번호 조회 페이지로 이동
userRouter.get('/queryAuth/:voteId/', (req, res) => {
    // 관리자인지 확인
    
    res.redirect('');
});

// 관리자가 선거권자의 인증번호 조회
userRouter.post('/queryAuth/:voteId/', (req, res) => {
    
});



module.exports = userRouter;