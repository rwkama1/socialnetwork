const { DTOLikeVideo } = require("../entity/DTOLikeVideo");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");

class DataLikeVideo {
    //#region CRUD

    static likeanvideo=async(iduser,idvideo)=>
    {
       let resultquery;

        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT IdUserVideos FROM UserVideos WHERE IdUserVideos=@iduservideo and Active=1)
        BEGIN
            select -1 as notexistvideo
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  EXISTS ( SELECT IdUser FROM LikeVideo WHERE IdUser=@iduser and IdUserVideos=@iduservideo)
                BEGIN
                 select -3 as existduplicate
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        insert into LikeVideo values (@iduser,@iduservideo)
                        UPDATE UserVideos SET Likes = Likes + 1 where IdUserVideos=@iduservideo
                        select 1 as likeanvideoadded
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
            .input('iduservideo', Int, idvideo)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistvideo;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].existduplicate;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].likeanvideoadded;
                 }
              }
            }
        pool.close();
        return resultquery;
        
    }
    static deletelikeanvideo=async(iduser,idvideo)=>
    {
        let resultquery;
        let queryupdate = 
        `

        IF NOT EXISTS ( SELECT IdUserVideos FROM UserVideos WHERE IdUserVideos=@iduservideos and Active=1)
        BEGIN
            select -1 as notexistvideo
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF  NOT EXISTS ( SELECT IdUser FROM LikeVideo WHERE IdUser=@iduser and IdUserVideos=@iduservideos)
                BEGIN
                select -3 as noexistlikevideo
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        DELETE  FROM  LikeVideo where IdUser=@iduser and IdUserVideos=@iduservideos
                        UPDATE UserVideos SET Likes = Likes - 1 where IdUserVideos=@iduservideos
                        select 1 as deletelikeanvideo
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
       .input('iduservideos', Int, idvideo) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistvideo;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistuser;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].noexistlikevideo;
           if(resultquery===undefined)
           {
               resultquery = result.recordset[0].deletelikeanvideo;
            }
         }
       }
        pool.close();
        return resultquery;
        
    }

    //#endregion

   //#region EXISTS
   static existLikeVideo=async(iduser,idvideo)=>
   {
      
        let querysearch=`
  
        IF NOT EXISTS ( 
           SELECT IdUser FROM LikeVideo 
           WHERE IdUser = @IdUser AND iduservideos = @iduservideos
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
          .input('iduservideos', Int, idvideo)
          .query(querysearch)
          let exist = result.recordset[0].Exist;
          pool.close();
          return exist;
       
   
    }
   //#endregion



    //#region OTHERS

    static  NumberOfLikesVideos=async(idvideo)=>
    {
    
            let query = `

            SELECT 
            COUNT(*) as numberlikes
            FROM 
            LikeVideo
            inner join UserVideos on UserVideos.iduservideos = LikeVideo.iduservideos
            WHERE 
            UserVideos.Active = 1
             AND LikeVideo.iduservideos=${idvideo}

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
module.exports = { DataLikeVideo };