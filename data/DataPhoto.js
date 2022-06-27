// import DTOPhoto from "../shared/entity/DTOPhoto";
// import { DataException } from "../shared/exceptions/dataexception";
const { Conection } = require("./Connection");
const { VarChar,Int ,DateTime} = require("mssql");
const { DTOPhoto } = require("../entity/DTOPhoto");


 class DataPhoto {
//#region CRUD
 static addImages=async(dtimages)=>
{
   let resultquery;
    let queryinsert = `

    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdUser and Active=1)
    BEGIN
      select -1 as notexistuser
    END
    ELSE
    BEGIN
      IF NOT EXISTS ( SELECT * FROM AlbumUserImages WHERE IdAlbumImages=@IdAlbumImages and Active=1)
      BEGIN
         select -2 as notexistalbum
      END
      ELSE
      BEGIN
         insert into UserImages values  (@IdUser,@IdAlbumImages,@Title,@Descriptionn ,@Likes,@Urlimage,'Public',GETUTCDATE(),1)
         select 1 as addedphoto
      END
    END
    

    `
    let pool = await Conection.conection();

    const result = await pool.request()
        .input('IdUser', Int,dtimages.user.iduser)
        .input('IdAlbumImages', Int, dtimages.albumphoto.idalbumphoto)
        .input('Title', VarChar, dtimages.title)
        .input('Descriptionn', VarChar, dtimages.description)
        .input('Likes', Int, dtimages.likes)
        .input('Urlimage', VarChar, dtimages.urlimage)       
        .query(queryinsert)
        resultquery = result.recordset[0].notexistuser;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].notexistalbum;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].addedphoto;
          }
        }
    pool.close();
    return resultquery;
    
}
 static updateVisibilityPhoto=async(idimage,visibility)=>
{
   let resultquery;
    let queryupdate = `
    IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
    BEGIN
    select -1 as notexistimage
    END
    ELSE
    BEGIN
    update UserImages set Visibility=@Visibility where IdUserImages=@IdUserImages
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

    IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
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
        IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=${idimage} and Active=1)
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
// static DiffDatePublishDateNow=async(dtophoto)=>
// {
      
//         let querysearch = `     
// 		WITH
//         differencee AS ( 
//         SELECT DATEDIFF(second,@DatePublish , GETUTCDATE() ) AS seconds,
//                DATEDIFF(minute,@DatePublish ,GETUTCDATE() ) AS minutess,
//                 DATEDIFF(hour, @DatePublish,GETUTCDATE() ) AS hourss,
//                DATEDIFF(day,@DatePublish ,GETUTCDATE() ) AS dayss,
//                 DATEDIFF(month,@DatePublish, GETUTCDATE()) AS months,
//                 DATEDIFF(year,@DatePublish,GETUTCDATE() ) AS years
//        )
//        SELECT 	
//        CASE  WHEN seconds<60   THEN (select seconds )  END  AS difsecond ,
//        CASE  WHEN seconds>=60 and minutess<60   THEN (select minutess )  END  AS difminutes ,
//        CASE WHEN minutess>=60 and hourss<24 THEN  (SELECT hourss ) END AS difhour,
//        CASE  WHEN hourss>=24 and dayss<31 THEN  (SELECT dayss) END AS difdays,
//        CASE  WHEN dayss>=31 and months<12 THEN  (SELECT months) END AS difmonth,
//        CASE  WHEN months>=12  THEN  (SELECT years) END AS difyears	
//        FROM differencee
//      `  
//         let pool = await Conection.conection();
//         const result = await pool.request()      
//         .input('DatePublish', DateTime,dtophoto.DateTimePublish)
//         .query(querysearch)
         
//         dtophoto.diffsecond = result.recordset[0].difsecond;
//         dtophoto.diffminutes = result.recordset[0].difminutes;
//         dtophoto.diffhour = result.recordset[0].difhour;
//         dtophoto.diffdays = result.recordset[0].difdays;
//         dtophoto.diffmonth = result.recordset[0].difmonth;
//         dtophoto.diffyear = result.recordset[0].difyears;

//        pool.close();
       
//  }
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