const mysql2=require('mysql2');
const db=mysql2.createPool({
    host: '0.0.0.0',
  user: 'projectUser',
  database: 'projectdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password:'cdac'
  
})
module.exports=db;