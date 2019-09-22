const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const adminRouter = express.Router();
const voteModel = require('../model/vote_model');
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
    console.log(req.body.title + "타이틀2" + req.body.begin_date + req.body.end_date + req.body.limit);
    try {
        await voteModel.create(vote);
        data = { status: true, msg: '선거 등록 성공' };
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: '선거 등록 실패' };
        res.status(500).send(data);
    }
});

// 새로운 후보자 등록
adminRouter.post('/admin/candidate', async (req, res) => {
    let data;
    let candidates = new Array();
    for(let i = 0; i < req.body.data.length; i++) {
        let candidate = {
            vote_id: req.body.data[i].voteId,
            name: req.body.data[i].name,
            name_ex: req.body.data[i].name_ex,
            phone: req.body.data[i].phone,
            image: image,
            votes: 0
        };
        candidates.push(candidate);
    }
    try {
        await candidateModel.registerCandidate(candidates);
        data = { status: true, msg: '후보자 등록 성공' };
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: '후보자 등록 실패' };
        res.status(500).send(data);
    }
});

// 새로운 선거권자 등록
adminRouter.post('/admin/electorate', async (req, res) => {
    let data;
    let electorates = new Array();
    for(let i = 0; i < req.body.data.length; i++) {
        let electorate = {
            vote_id: req.body.voteId,
            name: req.body.data[i].name,
            name_ex: req.body.data[i].name_ex,
            birthday: req.body.data[i].birthday,
            phone: req.body.data[i].phone,
            image: image, // 아직
            auth: null,
            vote_time: null
        };
        electorates.push(electorate);
    }
    try {
        await electorateModel.registerElectorate(electorates);
        data = { status: true, msg: '선거권자 등록 성공' };
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: '선거권자 등록 실패' };
        res.status(500).send(data);
    }
});

// 관리자가 직접 선거권자의 인증번호 생성 및 조회
adminRouter.post('/admin/auth', async (req, res) => {
    // 관리자로 로그인 되었는지 확인
    let data;
    if(req.session.admin) {
        let electorate = {
            vote_id: req.body.voteId,
            name: req.body.name,
            name_ex: req.body.name_ex
        };
        try {
            let e = await electorateModel.select(electorate);
            let auth = await electorateModel.updateAuth(e[0][0].id);
            data = { status: true, msg: '인증번호 생성 성공', data: auth };
            res.status(200).send(data);
        } catch(err) {
            data = { status: false, msg: '인증번호 생성 실패' };
            res.status(500).send(data);
        }
    } else {
        data = { status: false, msg: '관리자 로그인 필요' };
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
        data = { status: true, msg: `${name}${name_ex} 관리자 계정 생성 성공` };
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: '관리자 계정 생성 실패' };
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
        data = { status: true, msg: '로그인 성공' };
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: '로그인 실패' }
        res.status(500).send(data);
    }
});


// 로그아웃
adminRouter.get('/logout', async (req, res) => {
    let data;
    if(req.session.admin) {
        req.session.destroy(
            function (err) {
                if (err) {
                    data = { status: false, msg: `로그아웃 오류: ${err}` }
                    return;
                }
                console.log('세션 삭제 성공');
                data = { status: true, msg: '로그아웃 성공' }
            }
        );
    } else {
        data = { status: false, msg: '세션 정보 없음' }
    }
    res.status(200).send(data);
});
module.exports = adminRouter;