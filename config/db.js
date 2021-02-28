const { createPool } = require("mysql");
var port = process.env.mysqlbdport;
var host = process.env.mysqlbdip+"";
var user = process.env.mysqlbdusr+"";
var password = process.env.mysqlbdpsw+"";
var database = process.env.mysqlbdschema+"";
var connectionLimit = process.env.mysqlbdconnectLimit;

if (port==undefined) {
	console.log('env variable mysqlbdport not found, port is default');
	port = 3306;
}

if (host=='undefined') {
	console.log('env variable mysqlbdip not found, host is default');
	host='localhost';
}


if (user=='undefined') {
	console.log('env variable mysqlbdusr not found, user is default');
	user = 'user1';
}

if (password=='undefined') {
	console.log('env variable mysqlbdpsw not found, password is default');
	password = 'Qwer123!';
}

if (database=='undefined') {
	console.log('env variable mysqlbdschema not found, database is default');
	database = 'ach2';
}

if (connectionLimit==undefined) {
	console.log('env variable mysqlbdconnectLimit not found, connectionLimit is default');
	connectionLimit = 10;
}


const pool = createPool({
	port:port,
	host:host,
	user:user,
	password:password,
	database:database,
	connectionLimit: connectionLimit
});

module.exports = pool;
