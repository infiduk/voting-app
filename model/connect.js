const mysql = require('mysql2');
const config = {
    host : 'ch-4ml.iptime.org',
    user : 'ch-4ml',
    password : 'knifeark7677',
    port : 3306,
    database : 'voting',
    dateStrings: 'date'
};
const conn = mysql.createPool(config);

module.exports = conn;