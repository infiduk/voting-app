const db = require('./connect');

class Electorate {
    // 선거권자 추가
    create(electorate) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO electorate SET ?';
            db.query(sql, electorate).then(results => {
                let result = electorate;
                result.id = results[0]['insertId'];
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 선거권자 목록에 있는지 조회
    select(electorate) {
        return new Promise((resolve, reject) => {
           let sql = 'SELECT * FROM electorate WHERE VOTE_ID = ? AND NAME = ? AND NAME_EX =? AND BIRTHDAY = ?';
           db.query(sql, [electorate.vote_id, electorate.name, electorate.name_ex, electorate.birthday]).then(results => {
               resolve(results);
           }).catch(err => {
               reject(err);
           });
        });
    }

    // 인증번호 생성
    createAuth(data) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE electorate SET AUTH = ? WHERE ID = ? AND VOTE_ID = ?';
            db.query(sql, [data.auth, data.id, data.vote_id]).then(results => {
                resolve('success');
            }).catch(err => {
                console.error('failed: ', err);
                reject(err);
            });
        });
    }
}

module.exports = new Electorate();