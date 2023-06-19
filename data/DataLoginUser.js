const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DTOUser } = require("../entity/DTOUser");
const { DataUser } = require("./DataUser");
class DataLoginUser {


    static  loginUser=async(username,password)=>
    {
        let resultquery=0;
        let queryinsert = `
        
   
        BEGIN TRANSACTION

        DECLARE @IdUser int

        SELECT @IdUser = IdUser
        FROM Userr
        WHERE UserrName = @UserrName AND 
        Passwordd = HASHBYTES('SHA2_256', @Passwordd) AND
        Active = 1

        IF @IdUser IS NULL
        BEGIN
            SELECT -2 as wrongdata
        END
        ELSE
        BEGIN
            INSERT INTO LoginUser (IdUser, LoginDateAndTime)
            VALUES (@IdUser, GETUTCDATE())

            INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
            VALUES (@IdUser, GETUTCDATE(), 'User logged')

            SELECT *
            FROM Userr
            WHERE UserrName = @UserrName AND 
            Passwordd = HASHBYTES('SHA2_256', @Passwordd) AND
            Active = 1
            
        END

        IF(@@ERROR > 0)  
        BEGIN  
            ROLLBACK TRANSACTION  
        END  
        ELSE  
        BEGIN  
            COMMIT TRANSACTION  
        END
      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
           
            .input('UserrName', VarChar, username)
            .input('Passwordd', VarChar, password)
           

            .query(queryinsert)
        
                resultquery = result.recordset[0].wrongdata;
                if(resultquery===undefined)
                 {
                    let userr = new DTOUser();
                    DataUser.getinformation(userr, result);
                    resultquery=userr;
                  
                 }
        
            pool.close();
        return resultquery;
        
    }

    static  logout=async(iduser)=>
    {
        let resultquery=0;
        let deletequery = `
       
        IF NOT EXISTS (SELECT IdUser FROM LoginUser WHERE 
            IdUser = @IdUser)
        BEGIN
            SELECT -1 as notexistloginuser
        END
        else
        begin
            BEGIN TRANSACTION  

           
            delete from LoginUser where iduser=@IdUser
        
            INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
            VALUES (@IdUser, GETUTCDATE(), 'logged out user')

            select 1 as userdeslogged

            IF(@@ERROR > 0)  
            BEGIN  
                ROLLBACK TRANSACTION  
            END  
            ELSE  
            BEGIN  
            COMMIT TRANSACTION  
            END

        end

        `
        let pool = await Conection.conection();
 
        const result = await pool.request()    
        .input('IdUser', Int, iduser)
        .query(deletequery)
        resultquery = result.recordset[0].notexistloginuser;
        if(resultquery===undefined)
        {
           resultquery = result.recordset[0].userdeslogged;
        }
        pool.close();
        return resultquery;
        
    }
  
//#region  Exists
 static existLoginUser=async(iduser,username)=>
 {
    
      let querysearch=`

      SELECT CASE WHEN COUNT(*) > 0 
      THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS Exist
      FROM LoginUser
      WHERE IdUser = @IdUser and IdUser IN (
        SELECT IdUser FROM Userr WHERE UserrName = @UserrName
      )

      `;
         let pool = await Conection.conection();   
        const result = await pool.request()
        .input('IdUser', Int, iduser)
        .input('UserrName', VarChar, username)
        .query(querysearch)
      let exist = result.recordset[0].Exist;
        pool.close();
        return exist;
     
 
  }
 //#endregion



}
module.exports = { DataLoginUser };