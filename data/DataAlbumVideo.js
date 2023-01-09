const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DTOAlbumVideo } = require("../entity/DTOAlbumVideos");

class DataAlbumVideo {
   
     static  addAlbumVideo=async(albumtitle,userid,arrayurlvideos)=>
    {
      let resultquery;
        let queryinsert = `
        IF NOT EXISTS ( SELECT * FROM Userr WHERE  IdUser=@IdUser and Active=1)
        BEGIN
        select -1 as notexistuser
        END
        ELSE
        BEGIN
            BEGIN TRANSACTION

          insert into AlbumUserVideos values (@IdUser,@Title,1)

          ${this.forAddVideos(arrayurlvideos)}

          INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
          VALUES (@IdUser, GETUTCDATE(), 'AlbumVideo Added')

          select 1 as albumadded

          IF(@@ERROR > 0)  
          BEGIN  
              ROLLBACK TRANSACTION  
          END  
          ELSE  
          BEGIN  
              COMMIT TRANSACTION  
          END
        END
    `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('IdUser', Int,userid)
            .input('Title', VarChar, albumtitle)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistuser;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].albumadded;
            }
        pool.close();
        return resultquery;
        
    }
     static  updateTitleAlbum=async(idalbum,title)=>
    {
        let resultquery;
        let queryinsert =`
        IF NOT EXISTS ( SELECT * FROM AlbumUserVideos WHERE IdAlbumVideos=@IdAlbumVideos and Active=1)
        BEGIN
        select -1 as notexistalbum
        END
        ELSE
        BEGIN
          update AlbumUserVideos set Title=@Title where IdAlbumVideos=@IdAlbumVideos
          select 1 as albumupdated
        END
        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
        .input('IdAlbumVideos', Int , idalbum)
        .input('Title', VarChar, title)
         .query(queryinsert)
         resultquery = result.recordset[0].notexistalbum;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].albumupdated;
            }
        pool.close();
        return resultquery;
        
    }
     static  deleteAlbum=async(idalbum)=>
    {
      let resultquery;
        let queryinsert = `
        IF NOT EXISTS ( SELECT * FROM AlbumUserVideos WHERE IdAlbumVideos=@IdAlbumVideos and Active=1)
        BEGIN
        select -1 as notexistalbum
        END
        ELSE
        BEGIN
        update AlbumUserVideos set Active=0 where IdAlbumVideos=@IdAlbumVideos
        select 1 as albumdel
        END
        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('IdAlbumVideos', Int , idalbum)
        .query(queryinsert)
        resultquery = result.recordset[0].notexistalbum;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].albumdel;
        }
        pool.close();
        return resultquery;
        
    }

   
//#region  Exists
static existAlbumById=async(idalbum)=>
{
   
     let querysearch=`	SELECT 
     CASE WHEN EXISTS (
     SELECT *
     FROM AlbumUserVideos
     WHERE IdAlbumVideos = ${idalbum} and Active=1 )
  THEN CAST( 1 as bit)
  ELSE CAST(0 AS BIT) END as Exist
     `;
        let pool = await Conection.conection();   
            const result = await pool.request()
            .query(querysearch)
     let exist = result.recordset[0].Exist;
       pool.close();
       return exist;
    

 }
//#endregion
//#region GETS
 static getAlbumVideos=async(idalbum)=>
{
      let resultquery;
        let querysearch=`
        IF NOT EXISTS (
          SELECT  * FROM  AlbumUserVideos WHERE  IdAlbumVideos = ${idalbum} and Active = 1
        ) 
        BEGIN 
         select -1 as notexistalbum 
        END 
        ELSE
        BEGIN 
        select 
        AlbumUserVideos.*, 
          Userr.Name, 
          Userr.UserrName, 
          Userr.Imagee, 
          Userr.Email 
        from 
         AlbumUserVideos 
          inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
        where 
          Userr.Active = 1 
          and AlbumUserVideos.Active = 1 
          and AlbumUserVideos.IdAlbumVideos = ${idalbum} 
          END
          `;
        let pool = await Conection.conection();
   
            const result = await pool.request()
            .query(querysearch)
            resultquery = result.recordset[0].notexistalbum; 
            if (resultquery===undefined) {
              let albumvideo = new DTOAlbumVideo();
              this.getinformation(albumvideo, result);
              resultquery=albumvideo;
            }
       pool.close();
       return resultquery;
  
 }

 //*********************************** */
 static getAlbumVideobyUser=async(iduser)=>
 {
   
         let arrayalbumvid=[];
           let querysearch=`
           select 
           AlbumUserVideos.*, 
           Userr.Name, 
           Userr.UserrName, 
           Userr.Imagee, 
           Userr.Email 
         from 
         AlbumUserVideos 
           inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
         where 
           Userr.IdUser = ${iduser} 
           and Userr.Active = 1 
           and AlbumUserVideos.Active = 1        
           `;
    
         let pool = await Conection.conection();
    
             const result = await pool.request()
             .query(querysearch)
             for (var album of result.recordset) {
                let albumvideo = new DTOAlbumVideo(); 
                 this.getinformationList(albumvideo,album);
               arrayalbumvid.push(albumvideo);
              }
        pool.close();
        return arrayalbumvid;
    
  }
   static getAlbumVideoByTitleUser=async(title="",iduser)=>
  {
     
          let arrayalbumvid=[];
            let querysearch=`
            select 
            AlbumUserVideos.*, 
            Userr.Name, 
            Userr.UserrName, 
            Userr.Imagee, 
            Userr.Email 
          from 
          AlbumUserVideos 
            inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
          where 
            Userr.IdUser = ${iduser} 
            and AlbumUserVideos.Title like '%${title}%' 
            and Userr.Active = 1 
            and AlbumUserVideos.Active = 1 
                     
            `;
     
          let pool = await Conection.conection();
     
              const result = await pool.request()
              .query(querysearch)
              for (var album of result.recordset) {
                let albumvideo = new DTOAlbumVideo(); 
                 this.getinformationList(albumvideo,album);
               arrayalbumvid.push(albumvideo);
              }
         pool.close();
         return arrayalbumvid;
      
   }
   static getsAlbumVideos=async()=>
  {
   
          let arrayalbumvid=[];
         let querysearch=`  
         select 
         AlbumUserVideos.*, 
         Userr.Name, 
         Userr.UserrName, 
         Userr.Imagee, 
         Userr.Email 
       from 
       AlbumUserVideos 
         inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
       where 
         Userr.Active = 1 
         and AlbumUserVideos.Active = 1 
     `;
        
          let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var album of result.recordset) {
                let albumvideo = new DTOAlbumVideo(); 
                 this.getinformationList(albumvideo,album);
               arrayalbumvid.push(albumvideo);
              }
       
         pool.close();
         return arrayalbumvid;
     
 
      
   }
//#region GetInformation
static getinformation(albumvideo, result) {
    
    albumvideo.idalbumvideo = result.recordset[0].IdAlbumVideos; 
    albumvideo.user.iduser = result.recordset[0].IdUser;
    albumvideo.user.name = result.recordset[0].Name;
    albumvideo.user.userrname = result.recordset[0].UserrName;
    albumvideo.user.email = result.recordset[0].Email;
    albumvideo.user.image = result.recordset[0].Imagee;
    albumvideo.title = result.recordset[0].Title;
    albumvideo.active = result.recordset[0].Active;
   
}
 static  getinformationList(albumvideo, album) {
      
    albumvideo.idalbumvideo = album.IdAlbumVideos;
    albumvideo.user.iduser = album.IdUser;
    albumvideo.user.name = album.Name;
    albumvideo.user.userrname = album.UserrName;
    albumvideo.user.email = album.Email;
    albumvideo.user.image = album.Imagee;
    albumvideo.title = album.Title;
    albumvideo.active = album.Active;
   
}
static forAddVideos(arrayurlvideos)
   {
    let stringelement="";
    for (let index = 0; index < arrayurlvideos.length; index++) {
      const urlvideo = arrayurlvideos[index];
     

        stringelement=stringelement+
        `

        INSERT INTO UserVideos (IdUser, IdAlbumVideos, Title, Descriptionn, Likes, Urlvideos, Visibility, DatePublish, Active)
        VALUES (@IdUser, IDENT_CURRENT('AlbumUserVideos'), 'UpdateTitle', 'UpdateDescription', 0, '${urlvideo}', 'Public', GETUTCDATE(), 1)
        
        `
      
     
    }
    return stringelement
   
   }
//#endregion
}
module.exports = { DataAlbumVideo };