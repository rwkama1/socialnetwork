
const { Conection } = require("./Connection");
const { Int } = require("mssql");


class DataLikeSubComment {
    
    //#region CRUD

     static likeansubcomment=async(iduser,idsubcomment)=>
    {
       let resultquery;

        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT IdSubUserComment FROM UserrSubComments WHERE IdSubUserComment=@idsubcomment)
        BEGIN
            select -1 as notexistsubcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  EXISTS ( SELECT IdUser FROM LikeSubComment WHERE IdUser=@iduser and idsubusercomment=@idsubcomment)
                BEGIN
                select -3 as existduplicate
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        INSERT INTO  LikeSubComment values (@iduser,@idsubcomment)
                        UPDATE UserrSubComments SET Likes = Likes + 1 where idsubusercomment=@idsubcomment
                        SELECT 1 as likeansubcommentadded
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
            .input('idsubcomment', Int, idsubcomment)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistsubcomment;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].existduplicate;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].likeansubcommentadded;
                 }
              }
            }
        pool.close();
        return resultquery;
        
    }
     static deletelikeansubcomment=async(iduser,idsubcomment)=>
    {
        let resultquery;
        let queryupdate = 
        `

        IF NOT EXISTS ( SELECT * FROM UserrSubComments WHERE IdSubUserComment=@idsubusercomment)
        BEGIN
            select -1 as notexistsubcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  NOT EXISTS ( SELECT * FROM LikeSubComment WHERE IdUser=@iduser and idsubusercomment=@idsubusercomment)
                BEGIN
                select -3 as noexistlike
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        DELETE from  LikeSubComment where IdUser=@iduser and idsubusercomment=@idsubusercomment
                        UPDATE UserrSubComments SET Likes = Likes - 1 where idsubusercomment=@idsubusercomment
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
       .input('idsubusercomment', Int, idsubcomment) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistsubcomment;
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

        //#region EXISTS
        static existLikeSubComment=async(iduser,idsubcomment)=>
        {
           
             let querysearch=`
       
             IF NOT EXISTS ( 
                SELECT IdUser FROM LikeSubComment 
                WHERE IdUser = @IdUser AND idsubusercomment = @idsubcomment
                )
             BEGIN
                 select CAST(0 AS BIT) as Exist
             END
             ELSE
             BEGIN
                 select CAST(1 AS BIT) as Exist
             END
         
    
             `;
                let pool = await Conection.conection();   
               const result = await pool.request()
               .input('IdUser', Int, iduser)
               .input('idsubcomment', Int, idsubcomment)
               .query(querysearch)
               let exist = result.recordset[0].Exist;
               pool.close();
               return exist;
            
        
         }
        //#endregion

  
}
module.exports = { DataLikeSubComment };