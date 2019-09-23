const express = require('express');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const userRouter = express.Router();
const voteModel = require('../model/vote_model');
const electorateModel = require('../model/electorate_model');
const candidateModel = require('../model/candidate_model');
const request = require('request-promise-native');
const process = require('process');

// 진행 중인 선거 목록 조회
userRouter.get('/vote', async (req, res) => {
    let data;
    try {
        let result = await voteModel.selectAll();
        data = {
            result: true,
            msg: '진행 중인 선거 목록 조회 성공',
            data: result[0]
        }
        res.status(200).send(data);
    } catch(err) {
        data = {
            result: false,
            msg: `진행 중인 선거 목록 조회 실패: ${err}`
        }
        res.status(500).send(data);
    }
});

// 진행 중인 선거 선택
userRouter.get('/vote/:voteId', async (req, res) => {
    let data;
    try {
        let result = await voteModel.select(req.params.voteId);
        data = {
            result: true,
            msg: '선거 선택 조회 성공',
            data: result[0][0]
        }
        res.status(200).send(data);
    } catch(err) {
        data = {
            result: false,
            msg: `선거 선택 조회 실패: ${err}`,
        }
        res.status(500).send(data);
    }
});

// 선거권자 인증
userRouter.post('/electorate', async (req, res) => {
    let data;
    const electorate = {
        vote_id: req.body.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,                                                                                                                                                                                                       
    };
    const auth = req.body.auth;
    try {
        let result = await electorateModel.select(electorate);
        if(result[0].length > 0) {
            if(result[0][0].auth != auth) { // 인증번호가 일치하지 않는 경우
                // 인증번호 불일치
                data = { status: false, msg: '인증번호 불일치' };
            } else if(result[0][0].vote_time != null) { // 이미 투표한 경우
                data = { status: false, msg: '이미 투표함' };
            } else {
                data = { status: true, msg: '인증 성공' }
            }
        } else { // 데이터 없음
            data = { status: false, msg: '일치하는 데이터 없음' }
        }
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: `선거권자 인증 오류: ${err}` }
        res.status(500).send(data);
    }
});

// 휴대폰 번호로 인증번호 조회
userRouter.post('/auth/:voteId/', async (req, res) => {
    let data;
    const user = {
        vote_id: req.param.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
    };
    const phone = req.body.phone;
    try {
        let result = await electorateModel.select(user);
        let a_phone = new Array(); // 폰 번호 배열 
        a_phone.push(phone);
        if(phone == result[0][0].phone) {
            let auth = await electorateModel.updateAuth(result[0][0].id);
            // 생성된 인증번호를 휴대폰으로 전송
            let config = {
                uri: `https://api-sens.ncloud.com/v1/sms/services/${process.env.SENS_SERVICEID}/messages`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-ncp-auth-key': process.env.SENS_AUTHKEY,
                    'x-ncp-service-secret': process.env.SENS_SERVICESECRET,
                },
                body: {
                    'type': 'SMS',
                    'from': process.env.SENS_SENDNUMBER,
                    'to': a_phone,
                    'content': `[높은 뜻 정의교회] ${name}님. ${vote_id}번 선거 인증번호는 ${auth} 입니다.`
                }
            };
            let response = await request(config);
            console.log("메시지 전송: " + response.status);
            data = { status: true, msg: '인증번호 전송 성공' };
            res.status(200).send(data);
        } else { // 해당 투표 선거권자에 포함되지 않았음
            data = { status: false, msg: '입력 값과 일치하는 정보 없음'} 
            res.status(500).send(data);
        }
    } catch(err) {
        data = { status: false, msg: `인증번호 조회 오류: ${err}` }
        res.status(500).send(data);
    }
});

// 투표
userRouter.post('/vote', async (req, res) => {
    let data;
    // 회원이 선택한 후보자 목록 받아와서 득표수 올려줌
    const candidates = req.body.candidates;
    try {
        await candidateModel.updateVotes(candidates);
        data = { status: true, msg: '투표 성공' };
        res.status(200).send(data);
    } catch(err) {
        data = { status: false, msg: '투표 실패' };
        res.status(500).send(data);
    }
});

// 진행 중인 선거 목록 조회
userRouter.get('/vote', async (req, res) => {
    let data;
    try {
        let result = await voteModel.selectAll();
        data = {
            result: true,
            msg: '진행 중인 선거 목록 조회 성공',
            data: result[0]
        }
        res.status(200).send(data);
    } catch(err) {
        data = {
            result: false,
            msg: `진행 중인 선거 목록 조회 실패: ${err}`
        }
        res.status(500).send(data);
    }
});

module.exports = userRouter;