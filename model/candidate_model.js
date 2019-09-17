const db = require('./connect');

class Candidate {
    // 후보자 추가
    create(candidates) {
        return new Promise(async (resolve, reject) => {
            let sql = 'INSERT INTO candidate SET ?';
            try {
                let result = await db.query(sql, candidates);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 선거 결과(득표 수) 조회
    selectResult(voteId) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM candidate WHERE VOTE_NO = ? ORDER BY VOTES';
            try {
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 선거자 목록 조회
    select(voteId) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT name, image FROM candidate WHERE VOTE_NO = ?';
            try {
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 득표 수 업데이트
    updateVotes(candidates) {
        let phrase;
        for(let i = 0; i < candidates.length; ++i) {
            phrase = phrase + 'id = ' + candidates[i].id;
            if(i < candidates.length - 1) phrase = phrase + ' or ';
        }
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE candidate SET VOTES = VOTES + 1 WHERE ' + phrase;
            try {
                let result = await db.query(sql);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = new Candidate();