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


electorateRouter.post('/registerAuth/:voteId/:category', (req, res) => {
    // 세션에서 id랑 auth결과 조회
    let auth = Math.floor(Math.random() * 10000);
    let len;
    if(req.param.category == 1) len = 6; // 휴대전화 인증
    else len = 4; // 현장 인증
    
    const data = {
        id: id,
        vote_id: req.param.voteId,
        auth: pad(auth, len),
    };

    electorateModel.createAuth(data).then(result => {
        res.status(200).send({result: result[0]});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

module.exports = electorateRouter;