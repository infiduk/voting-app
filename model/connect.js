const mysql = require('mysql2/promise');
const config = {
    host : '127.0.0.1',
    user : 'ch-4ml',
    password : 'knifeark7677',
    database : 'voting',
    dateStrings: 'date'
};

const pool = mysql.createPool(config);
module.exports = pool;
