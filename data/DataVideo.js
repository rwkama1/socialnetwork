const { Conection } = require("./Connection");
const { VarChar,Int ,DateTime} = require("mssql");
const { DTOVideo } = require("../entity/DTOVideo");
class DataVideo {
    //#region CRUD
     static addVideo=async(dtvideos)=>
    {
       let resultquery;
        let queryinsert = `
    
        IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdUser and Active=1)
        BEGIN
          select -1 as notexistuser
        END
        ELSE
        BEGIN
          IF NOT EXISTS ( SELECT * FROM AlbumUserVideos WHERE IdAlbumVideos=@IdAlbumVideos and Active=1)
          BEGIN
             select -2 as notexistalbum
          END
          ELSE
          BEGIN
             insert into UserVideos values (@IdUser,@IdAlbumVideos,@Title,@Likes,@Descriptionn,@UrlVideo,'Public',GETUTCDATE(),1)
             select 1 as addvideo
          END
        END
        
    
        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('IdUser', Int,dtvideos.user.iduser)
            .input('IdAlbumVideos', Int, dtvideos.albumvideo.idalbumvideo)
            .input('Title', VarChar, dtvideos.title)
            .input('Descriptionn', VarChar, dtvideos.description)
            .input('Likes', Int, dtvideos.likes)
            .input('UrlVideo', VarChar, dtvideos.urlvideo)       
            .query(queryinsert)
            resultquery = result.recordset[0].notexistuser;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistalbum;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].addvideo;
              }
            }
        pool.close();
        return resultquery;
        
    }
     static updateVisibilityVideo=async(idvideos,visibility)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE IdUserVideos=@IdUserVideos and Active=1)
        BEGIN
        select -1 as notexistv
        END
        ELSE
        BEGIN
        update UserVideos set Visibility=@Visibility where IdUserVideos=@IdUserVideos
        select 1 as updatevideos
        END
        `
        let pool = await Conection.conection();
             const result = await pool.request()
            .input('Visibility', VarChar,visibility)
            .input('IdUserVideos', Int, idvideos)   
            .query(queryupdate)
            resultquery = result.recordset[0].notexistv;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].updatevideos;
            }
        pool.close();
        return resultquery;
        
    }
     static updateTitleDescriptionVideo=async(idvideo,description,title)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE IdUserVideos=@IdUserVideos and Active=1)
        BEGIN
        select -1 as notexistv
        END
        ELSE
        BEGIN
        update UserVideos set Title=@Title,Descriptionn=@Descriptionn where IdUserVideos=@IdUserVideos
        select 1 as updatevideo
        END
        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('Title', VarChar,title)
            .input('Descriptionn', VarChar,description)
            .input('IdUserVideos', Int, idvideo)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistv;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].IdUserVideos;
            }
        pool.close();
        return resultquery;
        
    }
    static deleteVideo=async(idvideo)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE IdUserVideos=@IdUserVideos and Active=1)
        BEGIN
          select -1 as notexistv
        END
        ELSE
        BEGIN
          update UserVideos set Active=0 where IdUserVideos=@IdUserVideos
          select 1 as delvideo
        END
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('IdUserVideos', Int, idvideo)
       .query(queryupdate)
            resultquery = result.recordset[0].notexistv;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].delvideo;
            }
        pool.close();
        return resultquery;
        
    }
}
module.exports = { DataVideo };
    //#endregion