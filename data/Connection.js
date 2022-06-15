const sql  = require("mssql");


 class Conection
{
     static conection=async () => {
        let sqlconfig = {
           user: 'rwkama61_',
            password:'socialnetwork',
            database: 'rwkama61_',
           server: 'sql.bsite.net\\MSSQL2016', 
           
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