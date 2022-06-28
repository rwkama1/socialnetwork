
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");

class DataMessage {

    //#region CRUD

    static addMessage=async(iduserreceived,idusersender,title,text)=>
    {
       let resultquery;

        let queryinsert = 
        `
        IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser = @iduserreceived and Active=1 )
        BEGIN
             select -1 as notexistuserreceived  
        END
        ELSE
        BEGIN
            IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser=@idusersender and Active=1 )
            BEGIN
                select -2 as notexistusersender 
            END
            ELSE
            BEGIN
                INSERT  INTO UserrMessage values (@iduserreceived,@idusersender,@title,@text,getutcdate(),false,false)
                select 1 insertsuccess
            END
        END
     
        `
        let pool = await Conection.conection();
    
             const result = await pool.request()
             .input('iduserreceived', Int,iduserreceived)
             .input('idusersender', Int,idusersender)
             .input('title', VarChar,title)
              .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistuserreceived;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistusersender;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].insertsuccess;
               
              }
            }
        pool.close();
        return resultquery;
        
    }
    static deleteMessage=async(iduserreceived,idusersender,idmessage)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser = @iduserreceived and Active=1 )
        BEGIN
             select -1 as notexistuserreceived  
        END
        ELSE
        BEGIN
            IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser=@idusersender and Active=1 )
            BEGIN
                select -2 as notexistusersender 
            END
            ELSE
            BEGIN
                IF NOT EXISTS (SELECT *FROM UserrMessage WHERE IdUser=@idusersender )
                BEGIN
                    select -3 as notexistusersender 
                END
                ELSE
                BEGIN
                    INSERT  INTO UserrMessage values (@iduserreceived,@idusersender,@title,@text,getutcdate(),false,false)
                    select 1 insertsuccess
                END
              
            END
        END
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduser', Int,iduser)
       .input('iduservideos', Int, idvideo) 
       .input('iduservideos', Int, idvideo) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistuserreceived;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistusersender;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].notexistusersender;
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
module.exports = { DataMessage };