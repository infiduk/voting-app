const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const adminRouter = express.Router();
const voteModel = require('../model/vote_model');
const timeModule = require('../modules/time');
const candidateModel = require('../model/candidate_model');
const electorateModel = require('../model/electorate_model')
const adminModel = require('../model/admin_model');

adminRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// 새로운 선거 등록
adminRouter.post('/admin/vote', async (req, res) => {
    let data;
    const vote = {
        title: req.body.title,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        limit: req.body.limit
    };
    try {
        let result = await voteModel.create(vote);
        let index = result[0]['insertId'];
        timeModule.registerTimer(index, vote.begin_date);
        timeModule.registerTimer(index, vote.end_date);
        data = { result: true, msg: '선거 등록 성공', data: index };
        res.status(200).send(data);
    } catch (err) {
        data = { result: false, msg: '선거 등록 실패' };
        console.log(data)
        res.status(500).send(data);
    }
});

// 새로운 후보자 등록
adminRouter.post('/admin/candidate', async (req, res) => {
    let data;
    let candidatesList = JSON.parse(req.body.candidates);
    let candidates = new Array();
    for (var i = 1; i < candidatesList.length; i++) {
        let candidate = {
            vote_id: req.body.vote_id,
            name: candidatesList[i][0],
            name_ex: candidatesList[i][1],
            phone: candidatesList[i][2]
        };
        candidates.push(candidate);
    }
    console.log(candidates);
    try {
        await candidateModel.create(candidates);
        data = { result: true, msg: '후보자 등록 성공' };
        res.status(200).send(data);
    } catch (err) {
        data = { result: false, msg: '후보자 등록 실패' };
        res.status(500).send(data);
    }
});

// 새로운 선거권자 등록
adminRouter.post('/admin/electorate', async (req, res) => {
    let data;
    let electoratesList = JSON.parse(req.body.electorates);
    let electorates = new Array();
    for (var i = 1; i < electoratesList.length; i++) {
        let electorate = {
            vote_id: req.body.vote_id,
            name: electoratesList[i][0],
            name_ex: electoratesList[i][1],
            phone: electoratesList[i][2]
        };
        electorates.push(electorate);
    }
    console.log(electorates);
    try {
        await electorateModel.create(electorates);
        data = { result: true, msg: '후보자 등록 성공' };
        res.status(200).send(data);
    } catch (err) {
        data = { result: false, msg: '후보자 등록 실패' };
        res.status(500).send(data);
    }
});

// 선거 삭제
adminRouter.delete('/delete', async (req, res) => {
    let data;
    let voteId = req.body.voteId;
    try {
        await voteModel.delete(voteId);
        await candidateModel.delete(voteId);
        await electorateModel.delete(voteId);
        data = { result: true, msg: '선거 삭제 성공' };
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        data = { result: false, msg: '선거 삭제 실패' };
        res.status(500).send(data);
    }
});

// 관리자가 직접 선거권자의 인증번호 생성 및 조회
adminRouter.post('/admin/auth', async (req, res) => {
    // 관리자로 로그인 되었는지 확인
    let data;
    if (req.session.admin) {
        let electorate = {
            vote_id: req.body.vote_id,
            name: req.body.name,
            name_ex: req.body.name_ex
        };
        try {
            let e = await electorateModel.select(electorate);
            let auth = await electorateModel.updateAuth(e[0][0].id);
            data = { result: true, msg: '인증번호 생성 성공', data: auth };
            res.status(200).send(data);
        } catch (err) {
            data = { result: false, msg: '인증번호 생성 실패' };
            res.status(500).send(data);
        }
    } else {
        data = { result: false, msg: '관리자 로그인 필요' };
        res.status(500).send(data);
    }
});

// 관리자 계정 생성
adminRouter.post('/admin', async (req, res) => {
    let data;
    let admin = {
        uid: req.body.uid,
        password: req.body.password,
        name: req.body.name,
        name_ex: req.body.name_ex,
        phone: req.body.phone
    };
    try {
        await adminModel.create(admin);
        data = { result: true, msg: `${admin} 관리자 계정 생성 성공` };
        res.status(200).send(data);
    } catch (err) {
        data = { result: false, msg: '관리자 계정 생성 실패' };
        res.status(500).send(data);
    }
});

// 로그인
adminRouter.post('/login', async (req, res) => {
    let data;
    let admin = {
        uid: req.body.uid,
        password: req.body.password
    };
    try {
        let result = await adminModel.select(admin);
        req.session.admin = {
            ...admin,
            name: result[0][0].name + result[0][0].name_ex
        };
        data = { result: true, msg: '로그인 성공', data: req.session };
        res.status(200).send(data);
    } catch (err) {
        data = { result: false, msg: '로그인 실패' }
        res.status(500).send(data);
    }
});

// 로그아웃
adminRouter.get('/logout', async (req, res) => {
    let data;
    if (req.session.admin) {
        req.session.destroy(
            function (err) {
                if (err) {
                    data = { result: false, msg: `로그아웃 오류: ${err}` }
                    return;
                }
                console.log('세션 삭제 성공');
                data = { result: true, msg: '로그아웃 성공' }
            }
        );
    } else {
        data = { result: false, msg: '세션 정보 없음' }
    }
    res.status(200).send(data);
});

// 세션 확인
adminRouter.get('/session', async (req, res) => {
    if (req.session.admin) {
        res.send({ result: true, data: req.session.admin, msg: "관리자" });
    } else {
        res.send({ result: false, data: null, msg: "로그인 안됨" });
    }
});

module.exports = adminRouter;