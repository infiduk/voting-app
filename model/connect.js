const mysql = require('mysql2/promise');
const config = {
    host : 'ch-4ml.iptime.org',
    user : 'ch-4ml',
    password : '!7rmfwkgkausshVdma',
    database : 'voting',
    dateStrings: 'date'
};

const pool = mysql.createPool(config);
module.exports = pool;
