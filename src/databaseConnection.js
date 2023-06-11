const mysql = require('mysql');

function establishConnection(){
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bustravel'
    });

    return connection;
}

module.exports = establishConnection;