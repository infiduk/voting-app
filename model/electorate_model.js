const db = require('./connect');

class Electorate {
    // 선거권자 추가
    create(electorates) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO electorate SET ?';
            db.query(sql, electorate).then(results => {
                //result.id = results[0]['insertId'];
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
}

module.exports = new Electorate();