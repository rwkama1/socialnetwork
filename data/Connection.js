const sql  = require("mssql");


 class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama64_SQLLogin_1',
            password:'aeiszhzdoi',
            database: 'socialnetworkkk',
           server: 'socialnetworkkk.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}
module.exports = { Conection };