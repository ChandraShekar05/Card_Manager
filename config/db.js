const mysql=require('mysql2/promise')//Importing mysql2 library


//Creating the mysql connection pool
const mysqlpool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'cards'
})

//exporting the pool
module.exports = mysqlpool;