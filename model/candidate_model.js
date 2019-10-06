const db = require('./connect');

class Candidate {
    // 후보자 추가
    create(candidates) {
        return new Promise(async (resolve, reject) => {
            let stmt = "";
            let candidate;
            for(var i = 0; i < candidates.length; i++) {
                candidate = candidates[i];
                stmt += '(' + candidate.vote_id + ', "' + candidate.name + '", "' + candidate.name_ex + '", "' + candidate.phone + '")';
                if(i < candidates.length - 1) stmt += ', ';
            }
            let sql = 'INSERT INTO candidate (vote_id, name, name_ex, phone) VALUES ' + stmt;
            try {
                let result = await db.query(sql);
                resolve(result);
            } catch(err) {
                console.log(err);
                reject(err);
            }
        });
    }

    // 선거 결과(득표 수) 조회
    selectResult(voteId) {
        return new Promise(async (resolve, reject) => {
            let sql = 'SELECT id, name, name_ex, votes FROM candidate WHERE vote_id = ? ORDER BY VOTES DESC';
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
            let sql = 'SELECT id, name, name_ex FROM candidate WHERE vote_id = ?';
            try {
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                console.log(err);
                reject(err);
            }
        });
    }

    // 득표 수 업데이트
    updateVotes(candidates, voteId) {
        let phrase = '';
        for(let i = 0; i < candidates.length; ++i) {
            candidates[i] += 1;
            phrase = phrase + 'id = ' + candidates[i];
            if(i < candidates.length - 1) phrase = phrase + ' or ';
            console.log(phrase);
        }
        return new Promise(async (resolve, reject) => {
            let sql = 'UPDATE candidate SET VOTES = VOTES + 1 WHERE ' + phrase + ' AND VOTE_ID = ?';
            try {
                console.log(sql);
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    // 후보자 삭제
    delete(voteId) {
        return new Promise(async (resolve, reject) => {
            let sql = 'DELETE FROM candidate WHERE vote_id = ?';
            try {
                let result = await db.query(sql, voteId);
                resolve(result);
            } catch(err) {
                reject(err);
                console.log(err);
            }
        });
    }
}

module.exports = new Candidate();