const db = require('./connect');

class Electorate {
    // 선거권자 추가
    create(electorates) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO electorate SET ?';
            db.query(sql, electorate).then(results => {
                //result.id = results[0]['insertId'];
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 선거권자 목록에 있는지 조회
    select(electorate) {
        return new Promise((resolve, reject) => {
           let sql = 'SELECT * FROM electorate WHERE VOTE_ID = ? AND NAME = ? AND NAME_EX =?';
           db.query(sql, electorate).then(results => {
               resolve(results);
           }).catch(err => {
               reject(err);
           });
        });
    }

    // 인증번호 생성 및 조회
    updateAuth(electorate) {
        let auth = this.authGenerator(Math.floor(Math.random() * 10000), 4);
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE electorate SET AUTH = ? WHERE ID = ?';
            db.query(sql, [auth, electorate.id]).then(results => {
                resolve(auth);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 투표 완료 시간 저장
    updateVoteTime(electorate) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE electorate SET VOTE_TIME = ? WHERE ID = ?';
            db.query(sql, [electorate.vote_time, electorate.id]).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 인증번호용 앞에 0 채우기
    authGenerator(auth, len) {
        auth = auth + '';
        return auth.length >= len ? auth : new Array(len - auth.length + 1).join('0') + auth;
    }
}

module.exports = new Electorate();