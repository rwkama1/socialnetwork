const { DTOCommentImage } = require("../entity/DTOCommentImage");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");

class DataCommentImage {
    //#region CRUD

    static CommentImage=async(iduser,idimage,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT * FROM UserImages WHERE iduserimages=@iduserimages and Active=1)
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
                    BEGIN TRANSACTION  
                        insert into UserrComments values (@iduser,@text,0,getutcdate(),'Public')
                        insert into UserrCommentsImage values (@@identity,@iduserimages)
                        select 1 as commentimageadded
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
     
        `
             let pool = await Conection.conection();
             const result = await pool.request()
            .input('iduser', Int,iduser)
            .input('iduserimages', Int, idimage)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistimage;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                    resultquery = result.recordset[0].commentimageadded;
              }
            }
        pool.close();
        return resultquery;
        
    }
    static UpdateTextCommentImage=async(iduser,idcomment,idimage,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT * FROM UserrCommentsImage WHERE idusercomment=@idusercomment 
            and iduserimages=@iduserimages)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM UserImages WHERE iduserimages=@iduserimages and Active=1)
            BEGIN
                select -2 as notexistimage
            END
           ELSE
           BEGIN
                IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
                BEGIN
                    select -3 as notexistuser
                END
                ELSE
                BEGIN
                    UPDATE UserrComments set Textt=@text where idusercomment=@idusercomment and iduser=@iduser
                    select 1 as commentupdated  
                 END
           END
         
        END
        
        `
             let pool = await Conection.conection();
             const result = await pool.request()
            .input('idusercomment', Int,idcomment)
            .input('iduser', Int,iduser)
            .input('iduserimages', Int, idimage)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcomment;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistimage;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].notexistuser;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].commentupdated;
                    }
                   
                }
              
              
            }
        pool.close();
        return resultquery;
        
    }
    static deleteCommentImage=async(iduser,idcomment,idimage)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS ( SELECT * FROM UserrCommentsImage WHERE idusercomment=@idcomment and iduserimages=@idimage)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM UserImages WHERE iduserimages=@idimage and Active=1)
            BEGIN
                select -2 as notexistimage
            END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
                BEGIN
                    select -3 as notexistuser
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                    delete from UserrSubComments where idusercomment=@idcomment
                    delete from UserrCommentsImage where idusercomment=@idcomment
                    delete from UserrComments where idusercomment=@idcomment and iduser=@iduser
                    select 1 as commentimagedeleted
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
       .input('idcomment', Int,idcomment)
       .input('idimage', Int, idimage) 
       .input('iduser', Int, iduser) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistcomment;
       if(resultquery===undefined)
       {
            resultquery = result.recordset[0].notexistimage;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistuser;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].commentimagedeleted;
                }
                
            }
       
       }
        pool.close();
        return resultquery;
        
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
module.exports = { DataCommentImage };