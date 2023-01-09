const { DTOLikePost } = require("../entity/DTOLikePost");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");


class DataLikePost {
    //#region CRUD

     static likeanpost=async(iduser,idpost)=>
    {
       let resultquery;

        let queryinsert = 
        `

        IF NOT EXISTS ( SELECT idpost FROM UserPost WHERE idpost=@idpost and Active=1)
        BEGIN
            select -1 as notexistpost
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  EXISTS ( SELECT IdUser FROM LikePost WHERE IdUser=@iduser and idpost=@idpost)
                BEGIN
                select -3 as existduplicate
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        insert into LikePost values (@iduser,@idpost)
                        UPDATE UserPost SET Likes = Likes + 1 where idpost=@idpost
                        select 1 as likeanpostadded
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
            .input('idpost', Int, idpost)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistpost;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].existduplicate;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].likeanpostadded;
                 }
              }
            }
        pool.close();
        return resultquery;
        
    }
     static deletelikeanpost=async(iduser,idpost)=>
    {
        let resultquery;
        let queryupdate = 
        `

        IF NOT EXISTS ( SELECT idpost FROM UserPost WHERE idpost=@idpost and Active=1)
        BEGIN
            select -1 as notexistpost
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  NOT EXISTS ( SELECT IdUser FROM LikePost WHERE IdUser=@iduser and idpost=@idpost)
                BEGIN
                select -3 as noexistlike
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        delete from  LikePost where IdUser=@iduser and idpost=@idpost
                        UPDATE UserPost SET Likes = Likes - 1 where idpost=@idpost
                        select 1 as deletelikeanpost
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
       .input('idpost', Int, idpost) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistpost;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistuser;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].noexistlike;
           if(resultquery===undefined)
           {
               resultquery = result.recordset[0].deletelikeanpost;
            }
         }
       }
        pool.close();
        return resultquery;
        
    }

    //#endregion

    //#region OTHERS

    static  NumberOfLikesPost=async(idpost)=>
    {
    
            let query = `

            SELECT 
            COUNT(*) as numberlikes
            FROM 
             LikePost
            inner join UserPost on UserPost.idpost = LikePost.idpost
            WHERE 
             UserPost.Active = 1
             AND LikePost.idpost=${idpost}

            `;
        let pool = await Conection.conection();
        const result = await pool.request()
       .query(query)
       let numberlikes = result.recordset[0].numberlikes;
        pool.close();
        return numberlikes;
        
    }
 
    //#endregion
}
module.exports = { DataLikePost };