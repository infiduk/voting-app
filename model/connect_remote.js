const mysqlssh = require('mysql-ssh');
const fs = require('fs');

class Connection {
    connect(sql, ...args) {
        return new Promise(async (resolve, reject) => {
            try {
                let db = await mysqlssh.connect(
                    {
                        host: 'ch-4ml.iptime.org',
                        user: 'ch-4ml',
                        privateKey: fs.readFileSync(process.env.HOME + '/.ssh/known_hosts')
                    },
                    {
                        host: '127.0.0.1',
                        user: 'ch-4ml',
                        password: 'knifeark7677',
                        database: 'voting'
                    }
                )
                let result = await db.query(sql, args);
                mysqlssh.close();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new Connection();