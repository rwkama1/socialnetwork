
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");


class DataLikeImage {
    //#region CRUD

     static likeanimage=async(iduser,idimage)=>
    {
       let resultquery;

        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@iduserimage and Active=1)
        BEGIN
            select -1 as notexistimage
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  EXISTS ( SELECT * FROM LikeImage WHERE IdUser=@iduser and IdUserImages=@iduserimage)
                BEGIN
                select -3 as existduplicate
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        insert into LikeImage values (@iduser,@iduserimage)
                        UPDATE UserImages SET Likes = Likes + 1 where IdUserImages=@iduserimage
                        select 1 as likeanimageadded
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
            .input('iduserimage', Int, idimage)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistimage;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].existduplicate;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].likeanimageadded;
                 }
              }
            }
        pool.close();
        return resultquery;
        
    }
     static deletelikeanimage=async(iduser,idimage)=>
    {
        let resultquery;
        let queryupdate = 
        `

        IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@iduserimage and Active=1)
        BEGIN
            select -1 as notexistimage
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  NOT EXISTS ( SELECT * FROM LikeImage WHERE IdUser=@iduser and IdUserImages=@iduserimage)
                BEGIN
                select -3 as noexistlike
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        delete from  LikeImage where IdUser=@iduser and IdUserImages=@iduserimage
                        UPDATE UserImages SET Likes = Likes - 1 where IdUserImages=@iduserimage
                        select 1 as deletelikeanimage
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
       .input('iduserimage', Int, idimage) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistimage;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistuser;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].noexistlike;
           if(resultquery===undefined)
           {
               resultquery = result.recordset[0].deletelikeanimage;
            }
         }
       }
        pool.close();
        return resultquery;
        
    }

    //#endregion

    //#region OTHERS

    static  NumberOfLikesImage=async(idimage)=>
    {
    
            let query = `

           SELECT 
            COUNT(*) as numberlikes
            FROM 
             LikeImage
            inner join UserImages on UserImages.iduserimages = LikeImage.iduserimages
            WHERE 
             UserImages.Active = 1
             AND LikeImage.iduserimages=${idimage} 

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
module.exports = { DataLikeImage };