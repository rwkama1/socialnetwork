const { DTOAlbumPhoto } = require("../entity/DTOAlbumPhoto");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");

 class DataAlbumImages {
//#region CRUD
 static  addAlbumImage=async(albumtitle,userid,arrayurlimages)=>
{
  let resultquery;
    let queryinsert = `
    IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@IdUser and Active=1)
    BEGIN
     select -1 as notexistuser
    END
    ELSE
    BEGIN
      BEGIN TRANSACTION

      insert into AlbumUserImages values (@IdUser,@Title,1)

      ${this.forAddImages(arrayurlimages)}

      INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
      VALUES (@IdUser, GETUTCDATE(), 'AlbumImage Added')

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
    IF NOT EXISTS ( SELECT IdAlbumImages FROM AlbumUserImages WHERE IdAlbumImages=@IdAlbumImages and Active=1)
    BEGIN
    select -1 as notexistalbum
    END
    ELSE
    BEGIN
      update AlbumUserImages set Title=@Title where IdAlbumImages=@IdAlbumImages
      select 1 as albumupdated
    END
    `
    let pool = await Conection.conection();

    const result = await pool.request()
    .input('IdAlbumImages', Int , idalbum)
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
    IF NOT EXISTS ( SELECT IdAlbumImages FROM AlbumUserImages WHERE IdAlbumImages=@IdAlbumImages and Active=1)
    BEGIN
    select -1 as notexistalbum
    END
    ELSE
    BEGIN
    update AlbumUserImages set Active=0 where IdAlbumImages=@IdAlbumImages
    select 1 as albumdel
    END
    `
    let pool = await Conection.conection();
    const result = await pool.request()
    .input('IdAlbumImages', Int , idalbum)
    .query(queryinsert)
    resultquery = result.recordset[0].notexistalbum;
    if(resultquery===undefined)
    {
      resultquery = result.recordset[0].albumdel;
    }
    pool.close();
    return resultquery;
    
}

//#endregion
//#region  Exists
 static existAlbumById=async(idalbum)=>
{
   
     let querysearch=`	SELECT 
     CASE WHEN EXISTS (
     SELECT *
     FROM AlbumUserImages
     WHERE IdAlbumImages = ${idalbum} and Active=1 )
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
 static getAlbumImage=async(idalbumimage)=>
{
      let resultquery;
        let querysearch=`
        IF NOT EXISTS (
          SELECT  * FROM  AlbumUserImages WHERE  IdAlbumImages = ${idalbumimage} and Active = 1
        ) 
        BEGIN 
         select -1 as notexistalbum 
        END 
        ELSE
        BEGIN 
        select 
          AlbumUserImages.*, 
          Userr.Name, 
          Userr.UserrName, 
          Userr.Imagee, 
          Userr.Email 
        from 
          AlbumUserImages 
          inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
        where 
          Userr.Active = 1 
          and AlbumUserImages.Active = 1 
          and AlbumUserImages.IdAlbumImages = ${idalbumimage} 
          END
          `;
        let pool = await Conection.conection();
   
            const result = await pool.request()
            .query(querysearch)
            resultquery = result.recordset[0].notexistalbum; 
            if (resultquery===undefined) {
              let albumphoto = new DTOAlbumPhoto();
              this.getinformation(albumphoto, result);
              resultquery=albumphoto;
            }
       pool.close();
       return resultquery;
  
 }
 

//*********************************** */
  static getAlbumImagebyUser=async(iduser)=>
{
  
        let arrayalbumphoto=[];
          let querysearch=`
          
        declare @iduser int= ${iduser}

          SELECT 
          AlbumUserImages.*, 
          Userr.Name, 
          Userr.UserrName, 
          Userr.Imagee, 
          Userr.Email 
      FROM 
          AlbumUserImages 
          INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser 
      WHERE 
          Userr.IdUser = @iduser 
          AND Userr.Active = 1 
          AND AlbumUserImages.Active = 1 
          
      ORDER BY 
          IdAlbumImages
      
          `;
   
        let pool = await Conection.conection();
   
            const result = await pool.request()
            .query(querysearch)
            for (var album of result.recordset) {
                let albumphoto = new DTOAlbumPhoto();   
                this.getinformationList(albumphoto,album);
                arrayalbumphoto.push(albumphoto);
             }
       pool.close();
       return arrayalbumphoto;
   
 }
 static getAlbumImagebyUserWithImages=async(iduser)=>
{
  
        let arrayalbumphoto=[];
          let querysearch=`
          
        declare @iduser int= ${iduser}
      
        SELECT 
        aui.*,
        ui.IdUserImages as idimage,
        ui.Title as titleimage,
        ui.Urlimage as urlimage,
        u.Name,
        u.UserrName,
        u.Imagee,
        u.Email
        FROM 
        AlbumUserImages aui
        INNER JOIN UserImages ui ON aui.idalbumimages = ui.idalbumimages
        INNER JOIN Userr u ON aui.IdUser = u.IdUser
        WHERE 
            u.IdUser = @iduser 
          AND  u.Active = 1
            AND ui.Active = 1
            AND aui.Active = 1
            
        ORDER BY 
        aui.IdAlbumImages
      
          `;
   
        let pool = await Conection.conection();
   
            const result = await pool.request()
            .query(querysearch)
            for (var album of result.recordset) {
                let albumphoto = new DTOAlbumPhoto();   
                this.getinformationListwithImages(albumphoto,album);
                arrayalbumphoto.push(albumphoto);
             }
       pool.close();
       return arrayalbumphoto;
   
 }


  static getAlbumImageByTitleUser=async(title="",iduser)=>
 {
    
         let arrayalbumphoto=[];
           let querysearch=`
           select 
           AlbumUserImages.*, 
           Userr.Name, 
           Userr.UserrName, 
           Userr.Imagee, 
           Userr.Email 
         from 
           AlbumUserImages 
           inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
         where 
           Userr.IdUser = ${iduser} 
           and AlbumUserImages.Title like '%${title}%' 
           and Userr.Active = 1 
           and AlbumUserImages.Active = 1 
         order by 
           IdAlbumImages
                    
           `;
    
         let pool = await Conection.conection();
    
             const result = await pool.request()
             .query(querysearch)
             for (var album of result.recordset) {
                 let albumphoto = new DTOAlbumPhoto();   
                 this.getinformationList(albumphoto,album);
                 arrayalbumphoto.push(albumphoto);
              }
        pool.close();
        return arrayalbumphoto;
     
  }
  static getsAlbumImages=async()=>
 {
  
         let arrayalbumphoto=[];
        let querysearch=`  
        select 
        AlbumUserImages.*, 
        Userr.Name, 
        Userr.UserrName, 
        Userr.Imagee, 
        Userr.Email 
      from 
        AlbumUserImages 
        inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
      where 
        Userr.Active = 1 
        and AlbumUserImages.Active = 1 
      order by 
        IdAlbumImages
      
    `;
       
         let pool = await Conection.conection();
    
             const result = await pool.request()
             .query(querysearch)
        for (var album of result.recordset) {
            let albumphoto = new DTOAlbumPhoto();   
            this.getinformationList(albumphoto,album);
            arrayalbumphoto.push(albumphoto);
         }
      
        pool.close();
        return arrayalbumphoto;
    

     
  }
 
//#endregion
//#region GetInformation
 static getinformation(albumphoto, result) {
    
    albumphoto.idalbumphoto = result.recordset[0].IdAlbumImages; 
    albumphoto.user.iduser = result.recordset[0].IdUser;
    albumphoto.user.name = result.recordset[0].Name;
    albumphoto.user.userrname = result.recordset[0].UserrName;
    albumphoto.user.email = result.recordset[0].Email;
    albumphoto.user.image = result.recordset[0].Imagee;
    albumphoto.title = result.recordset[0].Title;
    albumphoto.active = result.recordset[0].Active;
   
}
 static  getinformationList(albumphoto, album) {
      
    albumphoto.idalbumphoto = album.IdAlbumImages;
    albumphoto.user.iduser = album.IdUser;
    albumphoto.user.name = album.Name;
    albumphoto.user.userrname = album.UserrName;
    albumphoto.user.email = album.Email;
    albumphoto.user.image = album.Imagee;
    albumphoto.title = album.Title;
    albumphoto.active = album.Active;
   
}
static  getinformationListwithImages(albumphoto, album) {
      
  albumphoto.idalbumphoto = album.IdAlbumImages;
  
  albumphoto.idimage = album.idimage;
  albumphoto.titleimage = album.titleimage;
  albumphoto.urlimage = album.urlimage;
  
  albumphoto.user.iduser = album.IdUser;
  albumphoto.user.name = album.Name;
  albumphoto.user.userrname = album.UserrName;
  albumphoto.user.email = album.Email;
  albumphoto.user.image = album.Imagee;
  albumphoto.title = album.Title;
  albumphoto.active = album.Active;
 
}

static forAddImages(arrayurlimages)
   {
    let stringelement="";
    for (let index = 0; index < arrayurlimages.length; index++) {
      const urlimg = arrayurlimages[index];
     

        stringelement=stringelement+
        `

        INSERT INTO UserImages (IdUser, IdAlbumImages, Title, Descriptionn, Likes, Urlimage, Visibility, DatePublish, Active)
        VALUES (@IdUser, IDENT_CURRENT('AlbumUserImages'), 'UpdateTitle', 'UpdateDescription', 0, '${urlimg}', 'Public', GETUTCDATE(), 1)
        
        `
      
     
    }
    return stringelement
   
   }
//#endregion
}
module.exports = { DataAlbumImages };