const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const adminRouter = express.Router();
const candidateModel = require('../model/candidate_model');
const electorateModel = require('../model/electorate_model')

// 새로운 선거 등록
adminRouter.post('/admin/vote', async (req, res) => {
    const vote = {
        title: req.body.title, 
        begin_date: req.body.begin_date, 
        end_date: req.body.end_date,
        limit: req.body.limit
    };
    try {
        let result = await voteModel.create(vote);
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 새로운 후보자 등록
adminRouter.post('/admin/candidate', async (req, res) => {
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
        let result = await candidateModel.registerCandidate(candidates);
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 새로운 선거권자 등록
adminRouter.post('/admin/electorate', async (req, res) => {
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
        let result = await electorateModel.registerElectorate(electorates);
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 관리자가 선거권자의 인증번호 생성 및 조회
adminRouter.post('/admin/auth', async (req, res) => {
    // 관리자로 로그인 되었는지 확인
    let electorate = {
        vote_id: req.body.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex
    };
    try {
        let e = await electorateModel.select(electorate);
        let result = await electorateModel.updateAuth(e[0][0].id);
        // response
    } catch(err) {
        res.status(500).send(err);
    }
});

// 관리자 계정 생성
adminRouter.post('/admin', async (req, res) => {
    
});

// 로그인
adminRouter.post('/login', async (req, res) => {
    let admin = {
        uid: req.body.uid,
        password: req.body.password
    }
});

module.exports = adminRouter;