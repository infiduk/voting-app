const db = require('./connect');

class Candidate {
    // 후보자 추가
    create(candidate) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO candidate SET ?';
            db.query(sql, candidate).then(results => {
                let result = candidate;
                result.id = results[0]['insertId'];
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 선거 결과 조회
    selectResult(voteNo) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM candidate WHERE VOTE_NO = ? ORDER BY VOTES';
            db.query(sql, voteNo).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 선거자 목록 조회
    select(voteNo) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT name, image FROM candidate WHERE VOTE_NO = ?';
            db.query(sql, voteNo).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = new Candidate();