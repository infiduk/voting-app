const db = require('./connect');

class Vote {
    // 새 선거 생성
    create(vote) {
        console.log("자 여기 들어왔읍니까 3-1");
        return new Promise(async (resolve, reject) => {
            console.log("프로미스 안 3-2");
            let sql = 'INSERT INTO vote SET ?';
            try {
                console.log("트라이 안 3-3");
                let result = await db.query(sql, vote);
                console.log("sql이 먹었읍니까 3-4");
                resolve(result);
                console.log("resolve 다했닼~~~~ 3-5");
            } catch(err) {
                console.log("되긴 무슨 3-6");
                reject(err);
            }
        });
    }

    // 진행 중인 선거 목록 조회
    selectAll() {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM vote WHERE status = 1';
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