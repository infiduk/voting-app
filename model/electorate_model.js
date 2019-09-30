const db = require('./connect');

class Electorate {
    // 선거권자 추가
    create(electorates) {
        return new Promise(async (resolve, reject) => {
            let stmt = "";
            let electorate;
            for(var i = 0; i < electorates.length; i++) {
                electorate = electorates[i];
                stmt += '(' + electorate.vote_id + ', "' + electorate.name + '", "' + electorate.name_ex + '", "' + electorate.phone + '")';
                if(i < electorates.length - 1) stmt += ', ';
            }
            let sql = 'INSERT INTO electorate (vote_id, name, name_ex, phone) VALUES ' + stmt;
            try {
                let result = await db.query(sql);
                resolve(result);
                console.log('result :' + result);
            } catch(err) {
                console.log(err);
                reject(err);
            }
        });
    }

    // 선거권자 목록에 있는지 조회
    select(electorate) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT * FROM electorate WHERE VOTE_ID = ? AND NAME = ? AND NAME_EX = ?';
            try {
                let result = await db.query(sql, [electorate.vote_id, electorate.name, electorate.name_ex]);
                resolve(result);
            } catch(err) {
                console.log(err);
                reject(err);
            }
        });
    }

    // 인증번호 생성 및 조회
    updateAuth(id) {
        let auth = this.authGenerator(Math.floor(Math.random() * 10000), 4);
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE electorate SET AUTH = ? WHERE ID = ?';
            try {
                await db.query(sql, [auth, id]);
                resolve(auth);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 투표 완료 시간 저장
    updateVoteTime(electorate) {
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE electorate SET VOTE_TIME = NOW() WHERE ID = ?';
            try {
                let result = await db.query(sql, electorate.id);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 인증번호용 앞에 0 채우기
    authGenerator(auth, len) {
        auth = auth + '';
        return auth.length >= len ? auth : new Array(len - auth.length + 1).join('0') + auth;
    }
}

module.exports = new Electorate();