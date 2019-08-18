const db = require('./connect');

class Vote {
    insert(vote) {
        return new Promise((resolve, reject) => {
            var sql = 'INSERT INTO vote SET ?';
            db.query(sql, vote).then(results => {
                let result = vote;
                result.id = results[0]['insertId'];
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }



}

module.exports = new Vote();