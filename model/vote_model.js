const pool = require('./connection');

class Vote {
    insert(vote1) {
        async () => {
            try {
                const connection = await pool.getConnection(async conn => conn);
                try {
                    var sql = 'insert into vote(title, candidates, electorates, begin_date, end_date, limit) values(?, ?, ?, ?, ?, ?)';
                    connection.beginTransaction();
                    const [rows] = connection.query(sql, [vote.title, vote.candidates, vote.electorates, vote.begin_date, vote.end_date, vote.limit]);
                    console.log("In model: " + rows);
                    connection.commit();
                    connection.release();
                    return rows;
                } catch (err) {
                    connection.rollback();
                    connection.release();
                    console.log('Query Error');
                    return false;
                }
            } catch(err) {
                console.log('DB ERROR');
                return false;
            }
        }
    }
}

module.exports = new Vote();