const db = require('./connect');

class Vote {
    // 새 선거 생성
    create(vote) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO vote SET ?';
            db.query(sql, vote).then(results => {
                let result = vote;
                result.id = results[0]['insertId'];
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 진행 중인 선거 목록 조회
    selectAll() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM vote';
            db.query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 진행 중인 선거 선택
}

module.exports = new Vote();