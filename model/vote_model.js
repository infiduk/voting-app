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
                console.log(err);
                reject(err);
            }
        });
    }

    // 진행 중인 선거 목록 조회
    selectAll(status) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM vote WHERE status = ?';
            try {
                let result = await db.query(sql, status);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 선거 진행 기간 지나면 완료로 상태 변경
    update(voteId) {
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE vote SET status = 0 WHERE ID = ?';
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