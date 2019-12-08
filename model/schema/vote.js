require('../db-connection');
const mongoose = require('mongoose');
const candidateSchema = require('./candidate');
const electorateSchema = require('./electorate');

const voteSchema = mongoose.Schema({
    id          : mongoose.Schema.Types.ObjectId,
    title       : String,
    context     : String,
    begin       : Date,
    end         : Date,
    limit       : Number, // 몇 명 까지 투표할 지
    candidates1 : [candidateSchema],  // 장로 후보자 목록
    candidates2 : [candidateSchema],  // 안수집사 후보자 목록
    candidates3 : [candidateSchema],  // 권사 후보자 목록
    electorates : [electorateSchema], // 선거권자
    status      : Number, // 0: 투표 전 / 1: 투표 중 / 2: 투표 종료
});

module.exports = mongoose.model('Vote', voteSchema);