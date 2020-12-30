const mysql = require('mysql2')
const pool = mysql.createPool(
                            {host:"localhost",
                            user:"PostUser",
                            password:"Jfdk1221@",
                            database:"SchemaForPosts",
                            debug:false});

const promisePool = pool.promise();
module.exports = promisePool;