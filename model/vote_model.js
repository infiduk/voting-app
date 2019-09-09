const db = require('./connect');

class Vote {
    // 새 선거 생성
    create(vote) {
        return new Promise(async (resolve, reject) => {
            let sql = 'INSERT INTO vote SET ?';
            try {
                let result = await db.query(sql, vote);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 진행 중인 선거 목록 조회
    selectAll() {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM vote';
            try {
                let result = await db.query(sql);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 진행 중인 선거 선택
    select(voteId) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM vote WHERE ID = ?';
            try {
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = new Vote();