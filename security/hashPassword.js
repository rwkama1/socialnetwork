const { pbkdf2Sync ,randomBytes} = require("crypto");
class HashPassword
{
     static  hashPassword(password)  {

        let salt = randomBytes(16).toString('hex');
        let hash  = pbkdf2Sync(password, salt,  
            1000, 64, `sha512`).toString(`hex`); 
        return {hash,salt}
      }
       static verifyPassword(password,hashPassword,salt)  {
      
        var hash = pbkdf2Sync(password,salt, 1000, 64, `sha512`).toString(`hex`); 
        return hashPassword === hash; 
       }
       
}
module.exports = { HashPassword };