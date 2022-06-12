const sql  = require("mssql");


 class Conection
{
     static conection=async () => {
        let sqlconfig = {
           user: 'rwkama63_SQLLogin_1',
            password:'67bu3zb26y',
            database: 'socialnetwork',
           server: 'socialnetwork.mssql.somee.com', 
           
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