
const { Conection } = require("./Connection");
const { Int } = require("mssql");


class DataLikeComment {
    
    //#region CRUD

     static likeancomment=async(iduser,idcomment)=>
    {
       let resultquery;

        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT * FROM UserrComments WHERE IdUserComment=@idusercomment)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  EXISTS ( SELECT * FROM LikeComment WHERE IdUser=@iduser and idusercomment=@idusercomment)
                BEGIN
                select -3 as existduplicate
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        INSERT INTO  LikeComment values (@iduser,@idusercomment)
                        UPDATE UserrComments SET Likes = Likes + 1 where idusercomment=@idusercomment
                        SELECT 1 as likeancommentadded
                    IF(@@ERROR > 0)  
                    BEGIN  
                        ROLLBACK TRANSACTION  
                    END  
                    ELSE  
                    BEGIN  
                    COMMIT TRANSACTION  
                    END
                END 
            END
        END
     
        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('iduser', Int,iduser)
            .input('idusercomment', Int, idcomment)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcomment;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].existduplicate;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].likeancommentadded;
                 }
              }
            }
        pool.close();
        return resultquery;
        
    }
     static deletelikeancomment=async(iduser,idcomment)=>
    {
        let resultquery;
        let queryupdate = 
        `

        IF NOT EXISTS ( SELECT * FROM UserrComments WHERE IdUserComment=@idusercomment)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  NOT EXISTS ( SELECT * FROM LikeComment WHERE IdUser=@iduser and idusercomment=@idusercomment)
                BEGIN
                select -3 as noexistlike
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        DELETE from  LikeComment where IdUser=@iduser and idusercomment=@idusercomment
                        UPDATE UserrComments SET Likes = Likes - 1 where idusercomment=@idusercomment
                        select 1 as deletelike
                    IF(@@ERROR > 0)  
                    BEGIN  
                        ROLLBACK TRANSACTION  
                    END  
                    ELSE  
                    BEGIN  
                    COMMIT TRANSACTION  
                    END
                END 
            END
        END
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduser', Int,iduser)
       .input('idusercomment', Int, idcomment) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistcomment;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistuser;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].noexistlike;
           if(resultquery===undefined)
           {
               resultquery = result.recordset[0].deletelike;
            }
         }
       }
        pool.close();
        return resultquery;
        
    }

    //#endregion

  
}
module.exports = { DataLikeComment };