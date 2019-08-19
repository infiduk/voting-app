const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const electorateRouter = express.Router();
const electorateModel = require('../model/electorate_model');

electorateRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// 새로운 선거권자 등록
electorateRouter.post('/registerElectorate', (req, res) => {
    const electorate = {
        vote_id: req.body.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
        birthday: req.body.birthday,
        phone: req.body.phone,
        image: image,
        auth: null,
        vote_time: null
    };
    try {
        electorateModel.registerElectorate(electorate);
        console.log("ok");
    } catch (err) {
        console.log(err);
    }
});

// 선거권자 목록에 있는지 조회
electorateRouter.post('/checkElectorate/:voteId', (req, res) => {
    const electorate = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
        birthday: req.body.birthday
    };
    electorateModel.select(electorate).then(result => {
        res.status(200).send({result: result[0]});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});


electorateRouter.post('/registerAuth/:voteId', (req, res) => {
    // 세션에서 id랑 auth결과 조회
    // id 결과가 여러개일 수 있기 때문에 auth 있는지 검사하고 없으면 생성
    // 생성한 값을 저장
    // select
    const data = {
        id: id,
        vote_id: req.param.voteId,
        auth: auth
    };
})

module.exports = electorateRouter;