const voteModel = require('../model/vote_model');
const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

class Time {
    // 선거 상태 초기화
    async initVoteStatus() {
        try {
            // '생성됨' 상태인 선거 조회
            let result = await voteModel.selectAll("0");
            for(let i = 0; i < result[0].length; i++) {
                let res = result[0][i];
                if(this.isDatePassed(res.begin_date)) {
                    await voteModel.update(res.id);
                } else {
                    this.registerTimer(res.id, res.begin_date);
                }
            }

            result = await voteModel.selectAll("1");
            for(let i = 0; i < result[0].length; i++) {
                let res = result[0][i];
                if(this.isDatePassed(res.end_date)) {
                    await voteModel.update(res.id);
                } else {
                    this.registerTimer(res.id, res.end_date);
                }
            }
            // '선거 진행 중' 상태인 선거 조회
        } catch(error) {
            console.log(error);
            return;
        } 
    }

    // 경과 여부 확인
    isDatePassed(referenceDate) {
        return moment(referenceDate).isBefore(moment()) ? true : false;
    }

    // 타이머 등록
    registerTimer(voteId, referenceDate) {
        setTimeout(async () => { // 완료시간 경과 안됐으면 상태 변경 타이머 작동
            await voteModel.update(voteId);
        }, moment(referenceDate).diff(moment()));
    }
}

module.exports = new Time();