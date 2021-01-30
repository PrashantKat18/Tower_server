var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: 1000000,
    host:'localhost',
    user: 'vijnalab',
    password: 'Vijna@123',
    database : 'indian',
    port: 3306,
    debug: false,
    multipleStatements: true,
    queueLimit: 300000000000,
    acquireTimeout: 100000000
});
module.exports.connection = connection;