
const { Conection } = require("./Connection");
const { VarChar,Int ,DateTime} = require("mssql");
const { DTOPhoto } = require("../entity/DTOPhoto");


 class DataPhoto {
//#region CRUD
 static addImages=async(dtimages)=>
{
   let resultquery;
    let queryinsert = `

    IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@IdUser and Active=1)
    BEGIN
      select -1 as notexistuser
    END
    ELSE
    BEGIN
      IF NOT EXISTS ( SELECT IdAlbumImages FROM AlbumUserImages WHERE IdAlbumImages=@IdAlbumImages and Active=1)
      BEGIN
         select -2 as notexistalbum
      END
      ELSE
      BEGIN

      IF @Visibility = 'Public' OR @Visibility = 'Private'
      BEGIN

         BEGIN TRANSACTION

         insert into UserImages values  (@IdUser,
            @IdAlbumImages,@Title,@Descriptionn ,@Likes,@Urlimage,@Visibility
         ,GETUTCDATE(),1)

         INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
         VALUES (@IdUser, GETUTCDATE(), 'Image Added')

         select 1 as addedphoto

         
         IF(@@ERROR > 0)  
         BEGIN  
             ROLLBACK TRANSACTION  
         END  
         ELSE  
         BEGIN  
             COMMIT TRANSACTION  
         END
      END
      ELSE
         BEGIN
          select -3 as visibilityerror
         END
      END
    END
    

    `
    let pool = await Conection.conection();

    const result = await pool.request()
        .input('IdUser', Int,dtimages.user.iduser)
        .input('IdAlbumImages', Int, dtimages.albumphoto.idalbumphoto)
        .input('Title', VarChar, dtimages.title)
        .input('Descriptionn', VarChar, dtimages.description)
        .input('Visibility', VarChar,  dtimages.visibility)
        .input('Likes', Int, dtimages.likes)
        .input('Urlimage', VarChar, dtimages.urlimage)       
        .query(queryinsert)
        resultquery = result.recordset[0].notexistuser;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].notexistalbum;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].visibilityerror;
            if(resultquery===undefined)
            {
               resultquery = result.recordset[0].addedphoto;
            }
          }
        }
    pool.close();
    return resultquery;
    
}
 static updateVisibilityPhoto=async(idimage,visibility)=>
{
   let resultquery;
    let queryupdate = `
    IF NOT EXISTS 
    ( SELECT * FROM UserImages 
      WHERE IdUserImages=@IdUserImages and Active=1)
    BEGIN
    select -1 as notexistimage
    END
    ELSE
    BEGIN
    update UserImages
     set Visibility=@Visibility where IdUserImages=@IdUserImages
    select 1 as updatedphoto
    END
    `
    let pool = await Conection.conection();
         const result = await pool.request()
        .input('Visibility', VarChar,visibility)
        .input('IdUserImages', Int, idimage)   
        .query(queryupdate)
        resultquery = result.recordset[0].notexistimage;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].updatedphoto;
        }
    pool.close();
    return resultquery;
    
}
static updatePhoto=async(idimage,title,description,visibility)=>
{
   let resultquery;
    let queryupdate = `
    IF NOT EXISTS ( SELECT IdUserImages FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
    BEGIN
    select -1 as notexistimage
    END
    ELSE
    BEGIN
      IF @Visibility = 'Public' OR @Visibility = 'Private'
      BEGIN
         update UserImages set Visibility=@Visibility,
         Descriptionn=@Descriptionn,
         Title=@Title
         where IdUserImages=@IdUserImages
         select 1 as updatedphoto
         
      END
      ELSE
      BEGIN
         select -2 as visibilityerror
      END
END
    `
    let pool = await Conection.conection();
         const result = await pool.request()
         .input('Visibility', VarChar,visibility)
         .input('Title', VarChar,title)
         .input('Descriptionn', VarChar,description)
        .input('IdUserImages', Int, idimage)   
        .query(queryupdate)
        resultquery = result.recordset[0].notexistimage;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].visibilityerror;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].updatedphoto;
          }
        }
    pool.close();
    return resultquery;
    
}

 static updateTitleDescriptionPhoto=async(idimage,description,title)=>
{
   let resultquery;
    let queryupdate = `
    IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
    BEGIN
    select -1 as notexistimage
    END
    ELSE
    BEGIN
    update UserImages set Title=@Title,Descriptionn=@Descriptionn where IdUserImages=@IdUserImages
    select 1 as updatedphoto
    END
    `
    let pool = await Conection.conection();

    const result = await pool.request()
        .input('Title', VarChar,title)
        .input('Descriptionn', VarChar,description)
        .input('IdUserImages', Int, idimage)
        .query(queryupdate)
        resultquery = result.recordset[0].notexistimage;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].updatedphoto;
        }
    pool.close();
    return resultquery;
    
}
 static deletePhoto=async(idimage)=>
{
   let resultquery;
    let queryupdate = `

    IF NOT EXISTS ( SELECT IdUserImages FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
    BEGIN
    select -1 as notexistimage
    END
    ELSE
    BEGIN
    update UserImages set Active=0 where IdUserImages=@IdUserImages
    select 1 as deletephoto
    END

    `
    let pool = await Conection.conection();
    const result = await pool.request()
   .input('IdUserImages', Int, idimage)
   .query(queryupdate)
        resultquery = result.recordset[0].notexistimage;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].deletephoto;
        }
    pool.close();
    return resultquery;
    
}
//#endregion
//#region Exists
 static existImageById=async(idimage)=>
{
   
     let querysearch=`	
     SELECT 
     CASE WHEN EXISTS (
     SELECT *
     FROM UserImages
     WHERE IdUserImages = ${idimage} and Active=1 )
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

 static getImage=async(idimage)=>
{
        let resultquery;
        let querysearch = `  
        IF NOT EXISTS ( SELECT IdUserImages FROM UserImages WHERE IdUserImages=${idimage} and Active=1)
         BEGIN
         select -1 as notexistimage
         END
         ELSE
         BEGIN
            select 
            UserImages.*, 
            AlbumUserImages.Title as AlbumTitle, 
            Userr.Name, 
            Userr.Nick, 
            Userr.Email, 
            Userr.Imagee 
            from 
            UserImages 
            inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
            inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
            where 
            Userr.Active = 1 
            and AlbumUserImages.Active = 1 
            and UserImages.Active = 1 
            and UserImages.IdUserImages = ${idimage}
        END
        `  
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(querysearch)
        resultquery = result.recordset[0].notexistimage;
        if (resultquery===undefined) {
         let image = new DTOPhoto();
         DataPhoto.getinformation(image, result);
         resultquery=image;
        }     
      
       pool.close();
       return resultquery;
 }

//*********************************** */

  static getImages=async()=>
 {
    let arrayphoto=[];
         let querysearch = `     
         select 
         UserImages.*, 
         AlbumUserImages.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
       from 
         UserImages 
         inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
         inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
       where 
         Userr.Active = 1 
         and AlbumUserImages.Active = 1 
         and UserImages.Active = 1
       
         `  
         let pool = await Conection.conection();
         const result = await pool.request()      
         .query(querysearch)
         for (var p of result.recordset) {
            let photo = new DTOPhoto();   
            this.getinformationList(photo,p);
          arrayphoto.push(photo);
         }
      
        pool.close();
        return arrayphoto;
  }
  static getSearchImages=async(nameuser="",description="",title="")=>
 {
         let arrav=[];
         let querysearch = `     
       
         SELECT
            UserImages.*,
            AlbumUserImages.Title AS AlbumTitle,
            Userr.Name,
            Userr.Nick,
            Userr.Email,
            Userr.Imagee
         FROM UserImages
         INNER JOIN AlbumUserImages ON AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages
         INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser
         WHERE
         Userr.Active = 1
         AND AlbumUserImages.Active = 1
         AND UserImages.Active = 1
         AND Userr.Name LIKE '%${nameuser}%'
         AND UserImages.Title LIKE '%${title}%'
         AND UserImages.Descriptionn LIKE '%${description}%'
  
         `  
         let pool = await Conection.conection();
         const result = await pool.request()      
         .query(querysearch)
         for (var p of result.recordset) {
            let img = new DTOPhoto();   
            this.getinformationList(img,p);
            arrav.push(img);
         }
      
        pool.close();
        return arrav;
  }
  static getImagesbyAlbum=async(idalbum)=>
  {
     let arrayphoto=[];
          let querysearch = ` 
                select 
                UserImages.*, 
                AlbumUserImages.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserImages.IdAlbumImages = ${idalbum}
       `  
      
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
             let photo = new DTOPhoto();   
              this.getinformationList(photo,p);
           arrayphoto.push(photo);
          }
       
         pool.close();
         return arrayphoto;
   }
   static getImagesbyAlbumAndUser=async(idalbum,iduser)=>
   {
      let arrayphoto=[];
           let querysearch = ` 
                 select 
                 UserImages.*, 
                 AlbumUserImages.Title as AlbumTitle, 
                 Userr.Name, 
                 Userr.Nick, 
                 Userr.Email, 
                 Userr.Imagee 
                 from 
                 UserImages 
                 inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                 inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                 where 
                 Userr.Active = 1 
                 and AlbumUserImages.Active = 1 
                 and UserImages.Active = 1 
                 and UserImages.IdAlbumImages = ${idalbum}
                 and AlbumUserImages.IdUser = ${iduser}
        `  
       
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let photo = new DTOPhoto();   
               this.getinformationList(photo,p);
            arrayphoto.push(photo);
           }
        
          pool.close();
          return arrayphoto;
    }
   static getImagesbyIdUser=async(iduser)=>
  {
     let arrayphoto=[];
          let querysearch = `   
            SELECT 
            UserImages.*, 
            AlbumUserImages.Title as AlbumTitle, 
            Userr.Name, 
            Userr.Nick, 
            Userr.Email, 
            Userr.Imagee 
            from 
            UserImages 
            inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
            inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
            where 
            Userr.Active = 1 
            and AlbumUserImages.Active = 1 
            and UserImages.Active = 1 
            and UserImages.IdUser = ${iduser}
       `  
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
             let photo = new DTOPhoto();   
              this.getinformationList(photo,p);
           arrayphoto.push(photo);
          }
       
         pool.close();
         return arrayphoto;
   }
   static getImagesVisibilityFriendUser=async(iduser)=>
   {
      let arrayphoto=[];
           let querysearch = `   
             SELECT 
             UserImages.*, 
             AlbumUserImages.Title as AlbumTitle, 
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
             from 
             UserImages 
             inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
             inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
             where 
             Userr.Active = 1 
             and AlbumUserImages.Active = 1 
             and UserImages.Active = 1 
             and  UserImages.Visibility='Friend'
             and UserImages.IdUser = ${iduser}
        `  
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let photo = new DTOPhoto();   
               this.getinformationList(photo,p);
            arrayphoto.push(photo);
           }
        
          pool.close();
          return arrayphoto;
    }   
   static getImagesVisibilityPublicUser=async(iduser)=>
    {
       let arrayphoto=[];
            let querysearch = `   
              SELECT 
              UserImages.*, 
              AlbumUserImages.Title as AlbumTitle, 
              Userr.Name, 
              Userr.Nick, 
              Userr.Email, 
              Userr.Imagee 
              from 
              UserImages 
              inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
              inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
              where 
              Userr.Active = 1 
              and AlbumUserImages.Active = 1 
              and UserImages.Active = 1 
              and  UserImages.Visibility='Public'
              and UserImages.IdUser = ${iduser}
         `  
            let pool = await Conection.conection();
            const result = await pool.request()      
            .query(querysearch)
            for (var p of result.recordset) {
               let photo = new DTOPhoto();   
                this.getinformationList(photo,p);
             arrayphoto.push(photo);
            }
         
           pool.close();
           return arrayphoto;
     }
     static getImagesOrderByLikes=async()=>
     {
             let arrav=[];
             let querysearch = `
  
             select 
             UserImages.*, 
             AlbumUserImages.Title as AlbumTitle, 
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
           from 
           UserImages 
             inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
             inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
           where 
             Userr.Active = 1 
             and AlbumUserImages.Active = 1 
             and UserImages.Active = 1
             order by Likes desc
           
             `  
             let pool = await Conection.conection();
             const result = await pool.request()      
             .query(querysearch)
             for (var p of result.recordset) {
                let photo = new DTOPhoto();   
                this.getinformationList(photo,p);
                arrav.push(photo);
             }
          
            pool.close();
            return arrav;
      }
     static getImagessOrderbyComments=async()=>
     {
             let arrav=[];
             let querysearch = `

             SELECT
             UserImages.IdUserImages,
             UserImages.IdUser,
             UserImages.IdAlbumImages,
             UserImages.Title,
             UserImages.Likes,
             UserImages.UrlImage,
             UserImages.Visibility,
             UserImages.DatePublish,
             UserImages.Active,
           UserImages.Descriptionn,
             AlbumUserImages.Title AS AlbumTitle,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee,
             COUNT(UserrCommentsImage.IdUserCommentImg) AS NumComments
         FROM UserImages
         LEFT JOIN UserrCommentsImage
         ON UserImages.IdUserImages = UserrCommentsImage.IdUserImages
         INNER JOIN AlbumUserImages
         ON UserImages.IdAlbumImages = AlbumUserImages.IdAlbumImages
         INNER JOIN Userr
         ON AlbumUserImages.IdUser = Userr.IdUser
 
         WHERE
         Userr.Active = 1 
         and AlbumUserImages.Active = 1 
         and UserImages.Active = 1 
 
         GROUP BY
           UserImages.IdUserImages,
             UserImages.IdUser,
             UserImages.IdAlbumImages,
             UserImages.Title,
             UserImages.Likes,
             UserImages.UrlImage,
             UserImages.Visibility,
             UserImages.DatePublish,
             UserImages.Descriptionn,
             UserImages.Active,
             AlbumUserImages.Title,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee
            ORDER BY
                     NumComments DESC





             `  
             let pool = await Conection.conection();
             const result = await pool.request()      
             .query(querysearch)
             for (var p of result.recordset) {
                let img = new DTOPhoto();   
                this.getinformationList(img,p);
                img.numbercomments = p.NumComments;
                arrav.push(img);
             }
          
            pool.close();
            return arrav;
      }
      static getUserFollowerImages=async(iduser)=>
      {
              let arrav=[];
              let querysearch = `
              SELECT 
              UserImages.*,
              AlbumUserImages.Title AS AlbumTitle,
              Userr.Name,
              Userr.Nick,
              Userr.Email,
              Userr.Imagee
          FROM UserImages
          INNER JOIN AlbumUserImages ON UserImages.IdAlbumImages = AlbumUserImages.IdAlbumImages
          INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser
          INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
          WHERE Followers.IdFollowerUser = @IdUser
          AND Userr.Active = 1 
          AND AlbumUserImages.Active = 1 
          AND UserImages.Active = 1 
          ORDER BY UserImages.DatePublish DESC
          
            
              `  
              let pool = await Conection.conection();
              const result = await pool.request() 
              .input('IdUser', Int,iduser)
              .query(querysearch)
              for (var p of result.recordset) {
                 let img = new DTOPhoto();   
                 this.getinformationList(img,p);
                 
                 arrav.push(img);
              }
           
             pool.close();
             return arrav;
       }
       static getImageSuggestedUser=async(iduser,iduserlogin)=>
       {
               let arrav=[];
               let querysearch = `
 
            
               SELECT 
               UserImages.*,
               AlbumUserImages.Title AS AlbumTitle,
               Userr.Name,
               Userr.Nick,
               Userr.Email,
               Userr.Imagee
           FROM UserImages
           INNER JOIN AlbumUserImages ON UserImages.IdAlbumImages = AlbumUserImages.IdAlbumImages
           INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser
           INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
           WHERE Followers.IdFollowerUser = @IdUser
               AND Userr.Active = 1 
               AND AlbumUserImages.Active = 1 
               AND UserImages.Active = 1 
               AND Userr.IdUser != @IdUserLogin
           
           UNION
           
 
           SELECT 
           UserImages.*,
           AlbumUserImages.Title AS AlbumTitle,
           Userr.Name,
           Userr.Nick,
           Userr.Email,
           Userr.Imagee
       FROM UserImages
       INNER JOIN AlbumUserImages ON UserImages.IdAlbumImages = AlbumUserImages.IdAlbumImages
       INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser
       INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
       WHERE Followers.IdFollowerUser = @IdUserLogin
           AND Userr.Active = 1 
           AND AlbumUserImages.Active = 1 
           AND UserImages.Active = 1 
           AND Userr.IdUser != @IdUserLogin
       ORDER BY UserImages.DatePublish DESC
       
               `  
               let pool = await Conection.conection();
               const result = await pool.request() 
               .input('IdUser', Int,iduser)
               .input('IdUserLogin', Int,iduserlogin)
               .query(querysearch)
               for (var p of result.recordset) {
                  let img = new DTOPhoto();   
                  this.getinformationList(img,p);
                  
                  arrav.push(img);
               }
            
              pool.close();
              return arrav;
        }



   static getImagesbyFriendUser=async(iduser)=>     {
      let arrayphoto=[];
           let querysearch = `  
              SELECT 
                UserImages.*, 
                AlbumUserImages.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserrRelations.Statee = 'Confirmed' 
                and (UserImages.Visibility='Public' or UserImages.Visibility='Friend') 
                and UserrRelations.IdUser = ${iduser}
                ORDER BY datepublish desc
         `  
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let photo = new DTOPhoto();   
               this.getinformationList(photo,p);
            arrayphoto.push(photo);
           }
        
          pool.close();
          return arrayphoto;
    }
    static getImagesVisibilityByUserRelation=async(iduserlogin,iduser)=>
    {
        /*    if the users are friends, 
          it shows the images with public or friend status, and if they are not,
          it shows the public images
      */
       let arrayphoto=[];
       let querysearch = `   

    IF EXISTS ( SELECT UserrRelations.* FROM  UserrRelations 
               INNER JOIN Userr ON Userr.IdUser = UserrRelations.IdFriend 
              WHERE 
               Userr.Active = 1 
                AND UserrRelations.IdUser =${iduserlogin}
               AND UserrRelations.IdFriend =${iduser}
               AND UserrRelations.Statee = 'Confirmed' 
          )
   BEGIN
     SELECT 
         UserImages.*, 
         AlbumUserImages.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
         FROM 
         UserImages 
         INNER JOIN AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
         INNER JOIN Userr on Userr.IdUser = AlbumUserImages.IdUser 
         WHERE 
         Userr.Active = 1 
         AND AlbumUserImages.Active = 1 
         AND UserImages.Active = 1 
         AND  (UserImages.Visibility='Friend' OR UserImages.Visibility='Public')
         AND UserImages.IdUser = ${iduser}
  END
  ELSE
  BEGIN
     SELECT 
         UserImages.*, 
         AlbumUserImages.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
         FROM 
         UserImages 
         INNER JOIN AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
         INNER JOIN Userr on Userr.IdUser = AlbumUserImages.IdUser 
         WHERE 
         Userr.Active = 1 
         AND AlbumUserImages.Active = 1 
         AND UserImages.Active = 1 
         AND  UserImages.Visibility='Public'
         AND UserImages.IdUser = ${iduser}
      END
               `  
            let pool = await Conection.conection();
            const result = await pool.request()      
            .query(querysearch)
            for (var p of result.recordset) {
            let photo = new DTOPhoto();   
             this.getinformationList(photo,p);
             arrayphoto.push(photo);
            }
         
           pool.close();
           return arrayphoto;
    }
    static getImagesMainPage=async(iduserlogin,country)=>     {
      let arrayphoto=[];
       let querysearch = `            
      IF EXISTS (
				select 
				  UserrRelations.*
				from 
				  UserrRelations 
				  inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
				where 
				  Userr.Active = 1 
				  and UserrRelations.IdUser =${iduserlogin}
				  and UserrRelations.Statee = 'Confirmed'
				  )

		BEGIN
			    SELECT 
                UserImages.*, 
                AlbumUserImages.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserrRelations.Statee = 'Confirmed' 
                and (UserImages.Visibility='Public' or UserImages.Visibility='Friend') 
                and UserrRelations.IdUser = ${iduserlogin}

                UNION

                SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
					and Userr.Country =@Country
             

               UNION

               SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
               ORDER BY DATEPUBLISH DESC
		END
		ELSE
		BEGIN				
			IF EXISTS (
				   SELECT 
                UserImages.*
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserImages.Visibility='Public'
				   and Userr.Country = @Country
				)
			BEGIN			
					SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
					and Userr.Country = @Country

               UNION

               SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
               ORDER BY DATEPUBLISH DESC

		    END
         ELSE 
			BEGIN
				   SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
               ORDER BY DATEPUBLISH DESC
			END 		  
		END 
         `  
           let pool = await Conection.conection();
           const result = await pool.request()
           .input('Country', VarChar,country)      
           .query(querysearch)
           for (var p of result.recordset) {
              let photo = new DTOPhoto();   
            this.getinformationList(photo,p);
            arrayphoto.push(photo);
           }
        
          pool.close();
          return arrayphoto;
    }

    static getImagesByLikeUser=async(iduserlogin)=>//Get all the images that the user gave like
    {
      let arrayphoto=[];
      let querysearch=
      `
      SELECT 
      UserImages.*, 
      AlbumUserImages.Title as AlbumTitle, 
      Userr.Name, 
      Userr.Nick, 
      Userr.Email, 
      Userr.Imagee 
      FROM 
      LikeImage 
      inner join UserImages on UserImages.iduserimages = LikeImage.iduserimages 
      inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages  
      inner join Userr on Userr.IdUser = AlbumUserImages.IdUser
      WHERE 
      Userr.Active = 1 
      and AlbumUserImages.Active = 1 
      and UserImages.Active = 1 
      and LikeImage.iduser=${iduserlogin}

      `
      let pool = await Conection.conection();
      const result = await pool.request()      
      .query(querysearch)
      for (var p of result.recordset) {
         let photo = new DTOPhoto();   
          this.getinformationList(photo,p);
       arrayphoto.push(photo);
      }
     pool.close();
     return arrayphoto;
    } 
//#endregion
//#region Others


//#endregion


//#region  GetInformation
 static  getinformation(image, result) {
    
    image.idphoto = result.recordset[0].IdUserImages; 
    image.user.iduser = result.recordset[0].IdUser;
    image.user.name = result.recordset[0].Name;
    image.user.nick = result.recordset[0].Nick;
    image.user.email = result.recordset[0].Email;
    image.user.image = result.recordset[0].Imagee;
    image.albumphoto.idalbumphoto=result.recordset[0].IdAlbumImages;
    image.albumphoto.title=result.recordset[0].AlbumTitle;
    image.albumphoto.user=null;
    image.title = result.recordset[0].Title;
    image.description = result.recordset[0].Descriptionn;
    image.likes = result.recordset[0].Likes;
    image.urlimage = result.recordset[0].Urlimage;
    image.visibility = result.recordset[0].Visibility;
    image.active = result.recordset[0].Active;
    image.DateTimePublish = result.recordset[0].DatePublish;
 

   
}
static  getinformationList(image, p) {
    
    image.idphoto =p.IdUserImages; 
    image.user.iduser = p.IdUser;
    image.user.name = p.Name;
    image.user.nick = p.Nick;
    image.user.email = p.Email;
    image.user.image = p.Imagee;
    image.albumphoto.idalbumphoto=p.IdAlbumImages;
    image.albumphoto.title=p.AlbumTitle;
    image.albumphoto.user=null;
    image.title = p.Title;
    image.description = p.Descriptionn;
    image.likes = p.Likes;
    image.urlimage =p.Urlimage;
    image.visibility = p.Visibility;
    image.active = p.Active;
    image.DateTimePublish =p.DatePublish;
   
 

   
}
//#endregion
}
module.exports = { DataPhoto };