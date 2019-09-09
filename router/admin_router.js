const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const adminRouter = express.Router();
const candidateModel = require('../model/candidate_model');
const electorateModel = require('../model/electorate_model')

// 새로운 선거 등록
adminRouter.post('/registerVote', (req, res) => {
  const vote = {
      title: req.body.title, 
      begin_date: req.body.begin_date, 
      end_date: req.body.end_date,
      limit: req.body.limit
  };
  voteModel.create(vote).then(result => {
      res.redirect('');
  }).catch(err => {
      res.redirect('', {err: err});
  });
});

// 새로운 후보자 등록
adminRouter.post('/registerCandidate', (req, res) => {
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
    candidateModel.registerCandidate(candidates).then(result => {
        res.redirect('');
    }).catch(err => {
        res.redirect('', {err: err});
    });
});

// 새로운 선거권자 등록
adminRouter.post('/registerElectorate', (req, res) => {
    let electorates = new Array();
    for(let i = 0; i < req.body.data.length; i++) {
        let electorate = {
            vote_id: req.body.data[i].voteId,
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
    
    electorateModel.registerElectorate(electorates).then(result => {
        res.redirect('');
    }).catch(err => {
        res.redirect('', {err: err});
    });
});

// 관리자가 선거권자의 인증번호 생성 및 조회
adminRouter.get('/queryAuth/:voteId/', (req, res) => {
    // 관리자로 로그인 되었는지 확인
    let electorate = {
        vote_id: req.body.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex
    };
    electorateModel.select(electorate).then(result => {
        if(result[0].length > 0) {
            electorateModel.updateAuth(result[0][0].id).then(result => {
                // result: 생성된 인증번호를 전송
            }).catch(err => {

            });
        } else { // 해당 투표 선거권자에 포함되지 않았음
            
        }
    }).catch(err => {

    });
});

adminRouter

module.exports = adminRouter;