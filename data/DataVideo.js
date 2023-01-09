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
          IF @Visibility = 'Public' OR @Visibility = 'Private'
          BEGIN
             BEGIN TRANSACTION

             insert into UserVideos values (@IdUser,@IdAlbumVideos,
              @Title,@Likes,@Descriptionn,@UrlVideo,@Visibility,
              GETUTCDATE(),1)
            
              
             INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
             VALUES (@IdUser, GETUTCDATE(), 'Video Added')

             select 1 as addvideo

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
            .input('IdUser', Int,dtvideos.user.iduser)
            .input('IdAlbumVideos', Int, dtvideos.albumvideo.idalbumvideo)
            .input('Title', VarChar, dtvideos.title)
            .input('Descriptionn', VarChar, dtvideos.description)
            .input('Visibility', VarChar, dtvideos.visibility)
            .input('Likes', Int, dtvideos.likes)
            .input('UrlVideo', VarChar, dtvideos.urlvideo)       
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
                  resultquery = result.recordset[0].addvideo;
                }
                
              }
            }
        pool.close();
        return resultquery;
        
    }
    static updateVideo=async(idvideos,title,description,visibility)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE 
          IdUserVideos=@IdUserVideos and Active=1)
        BEGIN
        select -1 as notexistv
        END
        ELSE
        BEGIN
            IF @Visibility = 'Public' OR @Visibility = 'Private'
            BEGIN
              update UserVideos set Visibility=@Visibility,
              Descriptionn=@Descriptionn,
              Title=@Title
              where IdUserVideos=@IdUserVideos
              select 1 as updatevideos
              
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
            .input('IdUserVideos', Int, idvideos)   
            .query(queryupdate)
            resultquery = result.recordset[0].notexistv;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].visibilityerror;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].updatevideos;
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
        IF NOT EXISTS ( SELECT * FROM UserVideos
           WHERE IdUserVideos=@IdUserVideos and Active=1)
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
    //#endregion
//#region Exists
static existVideoById=async(idvideo)=>
{
   
     let querysearch=`
            SELECT 
          CASE WHEN EXISTS (
          SELECT *
          FROM UserVideos
          WHERE IdUserVideos = ${idvideo} and Active=1 )
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

static getVideo=async(idvideo)=>
{
        let resultquery;
        let querysearch = `  
        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE IdUserVideos=${idvideo} and Active=1)
         BEGIN
         select -1 as noexistv
         END
         ELSE
         BEGIN
            select 
            UserVideos.*, 
            AlbumUserVideos.Title as AlbumTitle, 
            Userr.Name, 
            Userr.Nick, 
            Userr.Email, 
            Userr.Imagee 
            from 
            UserVideos 
            inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
            inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
            where 
            Userr.Active = 1 
            and AlbumUserVideos.Active = 1 
            and UserVideos.Active = 1 
            and UserVideos.IdUserVideos = ${idvideo}
        END
        `  
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(querysearch)
        resultquery = result.recordset[0].noexistv;
        if (resultquery===undefined) {
         let vide = new DTOVideo();
         this.getinformation(vide, result);
         resultquery=vide;
        }     
      
       pool.close();
       return resultquery;
 }

 static getSearchVideos=async(nameuser,description,title)=>
 {
         let arrav=[];
         let querysearch = `     
         SELECT
         UserVideos.*,
         AlbumUserVideos.Title as AlbumTitle,
         Userr.Name,
         Userr.Nick,
         Userr.Email,
         Userr.Imagee
          FROM UserVideos
          INNER JOIN AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos
          INNER JOIN Userr on Userr.IdUser = AlbumUserVideos.IdUser
          WHERE
         Userr.Active = 1
         AND AlbumUserVideos.Active = 1
         AND UserVideos.Active = 1
         AND Userr.Name LIKE '%${nameuser}%' 
         AND UserVideos.Title LIKE '%${title}%'
         AND UserVideos.Descriptionn LIKE '%${description}%'
       
         `  
         let pool = await Conection.conection();
         const result = await pool.request()      
         .query(querysearch)
         for (var p of result.recordset) {
            let vide = new DTOVideo();   
            this.getinformationList(vide,p);
            arrav.push(vide);
         }
      
        pool.close();
        return arrav;
  }

 static getVideos=async()=>
 {
         let arrav=[];
         let querysearch = `     
         select 
         UserVideos.*, 
         AlbumUserVideos.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
       from 
       UserVideos 
         inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
         inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
       where 
         Userr.Active = 1 
         and AlbumUserVideos.Active = 1 
         and UserVideos.Active = 1
       
         `  
         let pool = await Conection.conection();
         const result = await pool.request()      
         .query(querysearch)
         for (var p of result.recordset) {
            let vide = new DTOVideo();   
            this.getinformationList(vide,p);
            arrav.push(vide);
         }
      
        pool.close();
        return arrav;
  }

  static getVideosOrderByDatePublish=async()=>
  {
          let arrav=[];
          let querysearch = `     
          select 
          UserVideos.*, 
          AlbumUserVideos.Title as AlbumTitle, 
          Userr.Name, 
          Userr.Nick, 
          Userr.Email, 
          Userr.Imagee 
        from 
        UserVideos 
          inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
          inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
        where 
          Userr.Active = 1 
          and AlbumUserVideos.Active = 1 
          and UserVideos.Active = 1
          order by datepublish desc
        
          `  
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
             let vide = new DTOVideo();   
             this.getinformationList(vide,p);
             arrav.push(vide);
          }
       
         pool.close();
         return arrav;
   }
   static getVideosOrderByLikes=async()=>
   {
           let arrav=[];
           let querysearch = `

           select 
           UserVideos.*, 
           AlbumUserVideos.Title as AlbumTitle, 
           Userr.Name, 
           Userr.Nick, 
           Userr.Email, 
           Userr.Imagee 
         from 
         UserVideos 
           inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
           inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
         where 
           Userr.Active = 1 
           and AlbumUserVideos.Active = 1 
           and UserVideos.Active = 1
           order by Likes desc
         
           `  
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let vide = new DTOVideo();   
              this.getinformationList(vide,p);
              arrav.push(vide);
           }
        
          pool.close();
          return arrav;
    }
    static getVideosOrderbyComments=async()=>
    {
            let arrav=[];
            let querysearch = `
            SELECT
            UserVideos.IdUserVideos,
            UserVideos.IdUser,
            UserVideos.IdAlbumVideos,
            UserVideos.Title,
            UserVideos.Likes,
            UserVideos.Urlvideos,
            UserVideos.Visibility,
            UserVideos.DatePublish,
            UserVideos.Active,
          UserVideos.Descriptionn,
            AlbumUserVideos.Title AS AlbumTitle,
            Userr.Name,
            Userr.Nick,
            Userr.Email,
            Userr.Imagee,
            COUNT(UserrCommentsVideo.IdUserCommentVideo) AS NumComments
        FROM UserVideos
        LEFT JOIN UserrCommentsVideo
        ON UserVideos.IdUserVideos = UserrCommentsVideo.IdUserVideos
        INNER JOIN AlbumUserVideos
        ON UserVideos.IdAlbumVideos = AlbumUserVideos.IdAlbumVideos
        INNER JOIN Userr
        ON AlbumUserVideos.IdUser = Userr.IdUser

        WHERE
        Userr.Active = 1 
        and AlbumUserVideos.Active = 1 
        and UserVideos.Active = 1 

        GROUP BY
          UserVideos.IdUserVideos,
            UserVideos.IdUser,
            UserVideos.IdAlbumVideos,
            UserVideos.Title,
            UserVideos.Likes,
            UserVideos.Urlvideos,
            UserVideos.Visibility,
            UserVideos.DatePublish,
          UserVideos.Descriptionn,
            UserVideos.Active,
            AlbumUserVideos.Title,
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
               let vide = new DTOVideo();   
               this.getinformationList(vide,p);
               vide.numbercomments = p.NumComments;
               arrav.push(vide);
            }
         
           pool.close();
           return arrav;
     }
     static getUserFollowerVideos=async(iduser)=>
     {
             let arrav=[];
             let querysearch = `
             SELECT 
             UserVideos.*,
             AlbumUserVideos.Title as AlbumTitle,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee
            FROM UserVideos
            INNER JOIN AlbumUserVideos ON UserVideos.IdAlbumVideos = AlbumUserVideos.IdAlbumVideos
            INNER JOIN Userr ON Userr.IdUser = AlbumUserVideos.IdUser
            INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
            WHERE Followers.IdFollowerUser = @IdUser
             AND Userr.Active = 1 
             AND AlbumUserVideos.Active = 1 
             AND UserVideos.Active = 1 

            ORDER BY UserVideos.DatePublish DESC
           
             `  
             let pool = await Conection.conection();
             const result = await pool.request() 
             .input('IdUser', Int,iduser)
             .query(querysearch)
             for (var p of result.recordset) {
                let vide = new DTOVideo();   
                this.getinformationList(vide,p);
                
                arrav.push(vide);
             }
          
            pool.close();
            return arrav;
      }
      static getVideosSuggestedUser=async(iduser,iduserlogin)=>
      {
              let arrav=[];
              let querysearch = `

           
               SELECT 
              UserVideos.*,
              AlbumUserVideos.Title as AlbumTitle,
              Userr.Name,
              Userr.Nick,
              Userr.Email,
              Userr.Imagee
             FROM UserVideos
             INNER JOIN AlbumUserVideos ON UserVideos.IdAlbumVideos = AlbumUserVideos.IdAlbumVideos
             INNER JOIN Userr ON Userr.IdUser = AlbumUserVideos.IdUser
             INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
             WHERE Followers.IdFollowerUser = @IdUser
              AND Userr.Active = 1 
              AND AlbumUserVideos.Active = 1 
              AND UserVideos.Active = 1 
              AND Userr.IdUser != @IdUserLogin
             
 
  

             UNION

             SELECT 
             UserVideos.*,
             AlbumUserVideos.Title as AlbumTitle,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee
            FROM UserVideos
            INNER JOIN AlbumUserVideos ON UserVideos.IdAlbumVideos = AlbumUserVideos.IdAlbumVideos
            INNER JOIN Userr ON Userr.IdUser = AlbumUserVideos.IdUser
            INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
            WHERE Followers.IdFollowerUser = @IdUserLogin
             AND Userr.Active = 1 
             AND AlbumUserVideos.Active = 1 
             AND UserVideos.Active = 1 
             AND Userr.IdUser != @IdUserLogin
             

            ORDER BY UserVideos.DatePublish DESC
              `  
              let pool = await Conection.conection();
              const result = await pool.request() 
              .input('IdUser', Int,iduser)
              .input('IdUserLogin', Int,iduserlogin)
              .query(querysearch)
              for (var p of result.recordset) {
                 let vide = new DTOVideo();   
                 this.getinformationList(vide,p);
                 
                 arrav.push(vide);
              }
           
             pool.close();
             return arrav;
       }
  
  static getVideosbyAlbum=async(idalbumvideo)=>
  {
     let arrayv=[];
    let querysearch = ` 
                select 
                UserVideos.*, 
                AlbumUserVideos.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserVideos 
                inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
                inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserVideos.Active = 1 
                and UserVideos.Active = 1 
                and UserVideos.IdAlbumVideos = ${idalbumvideo}
       `  
      
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
             let vid = new DTOVideo();   
              this.getinformationList(vid,p);
           arrayv.push(vid);
          }
       
         pool.close();
         return arrayv;
   }
 static getVideosbyAlbumAndUser=async(idalbum,iduser)=>
   {
      let arrayv=[];
           let querysearch = ` 
                select 
                UserVideos.*, 
                AlbumUserVideos.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserVideos 
                inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
                inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserVideos.Active = 1 
                and UserVideos.Active = 1 
                and UserVideos.IdAlbumVideos = ${idalbum}
                and AlbumUserVideos.IdUser = ${iduser}
        `  
       
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let vid = new DTOVideo();   
               this.getinformationList(vid,p);
               arrayv.push(vid);
           }
        
          pool.close();
          return arrayv;
    }
 static getVideosbyIdUser=async(iduser)=>
  {
      let arrayv=[];
          let querysearch = `   
            SELECT 
            UserVideos.*, 
            AlbumUserVideos.Title as AlbumTitle, 
            Userr.Name, 
            Userr.Nick, 
            Userr.Email, 
            Userr.Imagee 
            from 
            UserVideos 
            inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
            inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
            where 
            Userr.Active = 1 
            and AlbumUserVideos.Active = 1 
            and UserVideos.Active = 1 
            and UserVideos.IdUser = ${iduser}
       `  
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
             let vid = new DTOVideo();   
              this.getinformationList(vid,p);
              arrayv.push(vid);
          }
       
         pool.close();
         return arrayv;
   }
   static getVideosVisibilityFriendUser=async(iduser)=>
   {
      let arrayv=[];
           let querysearch = `   
             SELECT 
             UserVideos.*, 
             AlbumUserVideos.Title as AlbumTitle, 
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
             from 
             UserVideos 
             inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
             inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
             where 
             Userr.Active = 1 
             and AlbumUserVideos.Active = 1 
             and UserVideos.Active = 1 
             and UserVideos.Visibility='Friend'
             and UserVideos.IdUser = ${iduser}
        `  
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let vid = new DTOVideo();   
              this.getinformationList(vid,p);
              arrayv.push(vid);
          
           }
        
          pool.close();
          return arrayv;
    }
   
   static getVideosVisibilityPublicUser=async(iduser)=>
    {
       let arrayv=[];
            let querysearch = `   
            SELECT 
            UserVideos.*, 
            AlbumUserVideos.Title as AlbumTitle, 
            Userr.Name, 
            Userr.Nick, 
            Userr.Email, 
            Userr.Imagee 
            from 
            UserVideos 
            inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
            inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
            where 
            Userr.Active = 1 
            and AlbumUserVideos.Active = 1 
            and UserVideos.Active = 1 
            and UserVideos.Visibility='Public'
            and UserVideos.IdUser = ${iduser}
         `  
            let pool = await Conection.conection();
            const result = await pool.request()      
            .query(querysearch)
            for (var p of result.recordset) {
              let vid = new DTOVideo();   
              this.getinformationList(vid,p);
              arrayv.push(vid);
            }
         
           pool.close();
           return arrayv;
     }
   static getVideosbyFriendUser=async(iduser)=>     {
      let arrayv=[];
           let querysearch = `  
              SELECT 
                UserVideos.*, 
                AlbumUserVideos.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserVideos 
                inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
                inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
                inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserVideos.Active = 1 
                and UserVideos.Active = 1 
                and UserrRelations.Statee = 'Confirmed' 
                and (UserVideos.Visibility='Public' or UserVideos.Visibility='Friend') 
                and UserrRelations.IdUser = ${iduser}
                ORDER BY datepublish desc
         `  
           let pool = await Conection.conection();
           const result = await pool.request()      
           .query(querysearch)
           for (var p of result.recordset) {
              let vid = new DTOVideo();   
              this.getinformationList(vid,p);
              arrayv.push(vid);
           }
        
          pool.close();
          return arrayv;
    }
    static getVideosVisibilityByUserRelation=async(iduserlogin,iduser)=>
    {
    /*    if the users are friends, 
          it shows the videos with public or friend status, and if they are not,
          it shows the public videos
      */
       let arrayv=[];
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
         UserVideos.*, 
         AlbumUserVideos.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
         FROM 
         UserVideos 
         INNER JOIN AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
         INNER JOIN Userr on Userr.IdUser = AlbumUserVideos.IdUser 
         WHERE 
         Userr.Active = 1 
         AND AlbumUserVideos.Active = 1 
         AND UserVideos.Active = 1 
         AND  (UserVideos.Visibility='Friend' OR UserVideos.Visibility='Public')
         AND UserVideos.IdUser = ${iduser}
  END
  ELSE
  BEGIN
         SELECT 
          UserVideos.*, 
         AlbumUserVideos.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
         FROM 
         UserVideos 
         INNER JOIN AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
         INNER JOIN Userr on Userr.IdUser = AlbumUserVideos.IdUser 
         WHERE 
         Userr.Active = 1 
         AND AlbumUserVideos.Active = 1 
         AND UserVideos.Active = 1 
         AND  UserVideos.Visibility='Public'
         AND UserVideos.IdUser = ${iduser}
      END
               `  
            let pool = await Conection.conection();
            const result = await pool.request()      
            .query(querysearch)
            for (var p of result.recordset) {
              let vid = new DTOVideo();   
              this.getinformationList(vid,p);
              arrayv.push(vid);
            }
         
           pool.close();
           return arrayv;
    }
    static getVideosMainPage=async(iduserlogin,country)=>     {
      let arrayv=[];
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
                UserVideos.*, 
                AlbumUserVideos.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserVideos 
                inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
                inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
                inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserVideos.Active = 1 
                and UserVideos.Active = 1 
                and UserrRelations.Statee = 'Confirmed' 
                and (UserVideos.Visibility='Public' or UserVideos.Visibility='Friend') 
                and UserrRelations.IdUser = ${iduserlogin}

                UNION

          SELECT 
          UserVideos.*, 
          AlbumUserVideos.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
					and Userr.Country =@Country
        

          UNION

          SELECT 
          UserVideos.*, 
					AlbumUserVideos.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
          ORDER BY DATEPUBLISH DESC
		END
		ELSE
		BEGIN				
			IF EXISTS (
				SELECT 
               UserVideos.*
                from 
                UserVideos 
                inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
                inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserVideos.Active = 1 
                and UserVideos.Active = 1 
                and UserVideos.Visibility='Public'
				         and Userr.Country = @Country
				)
			BEGIN			
					SELECT 
					UserVideos.*, 
					AlbumUserVideos.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
					and Userr.Country = @Country

               UNION

          SELECT 
          UserVideos.*, 
					AlbumUserVideos.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
          ORDER BY DATEPUBLISH DESC

		    END
         ELSE 
			BEGIN
				SELECT 
           UserVideos.*, 
          AlbumUserVideos.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
          ORDER BY DATEPUBLISH DESC
			END 		  
		END 
         `  
           let pool = await Conection.conection();
           const result = await pool.request()
           .input('Country', VarChar,country)      
           .query(querysearch)
           for (var p of result.recordset) {
            let vid = new DTOVideo();   
            this.getinformationList(vid,p);
            arrayv.push(vid);
           }
        
          pool.close();
          return arrayv;
    }


    static getVideosByLikeUser=async(iduserlogin)=>//Get all the video that the user gave like
    {
      let array=[];
      let querysearch=
      `
      SELECT 
      UserVideos.*, 
      AlbumUserVideos.Title as AlbumTitle, 
      Userr.Name, 
      Userr.Nick, 
      Userr.Email, 
      Userr.Imagee 
      FROM 
      LikeVideo 
      inner join UserVideos on UserVideos.iduservideos = LikeVideo.iduservideos 
      inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos  
      inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser
      WHERE 
      Userr.Active = 1 
      and AlbumUserVideos.Active = 1 
      and UserVideos.Active = 1 
      and LikeVideo.iduser=${iduserlogin}

      `
      let pool = await Conection.conection();
      const result = await pool.request()      
      .query(querysearch)
      for (var p of result.recordset) {
        let vid = new DTOVideo();   
        this.getinformationList(vid,p);
        array.push(vid);
      }
     pool.close();
     return array;
    } 

//#endregion
//#region  GetInformation
static  getinformation(video, result) {
    
  video.idvideo = result.recordset[0].IdUserVideos; 
  video.user.iduser = result.recordset[0].IdUser;
  video.user.name = result.recordset[0].Name;
  video.user.nick = result.recordset[0].Nick;
  video.user.email = result.recordset[0].Email;
  video.user.video = result.recordset[0].Video;
  video.albumvideo.idalbumvideo=result.recordset[0].IdAlbumVideos;
  video.albumvideo.title=result.recordset[0].AlbumTitle;
  video.albumvideo.user=null;
  video.title = result.recordset[0].Title;
  video.description = result.recordset[0].Descriptionn;
  video.likes = result.recordset[0].Likes;
  video.urlvideo = result.recordset[0].Urlvideos;
  video.visibility = result.recordset[0].Visibility;
  video.active = result.recordset[0].Active;
  video.DateTimePublish = result.recordset[0].DatePublish;


 
}
static  getinformationList(video, p) {
  
  video.idvideo =p.IdUserVideos; 
  video.user.iduser = p.IdUser;
  video.user.name = p.Name;
  video.user.nick = p.Nick;
  video.user.email = p.Email;
  video.user.image = p.Imagee;
  video.albumvideo.idalbumvideo=p.IdAlbumVideos;
  video.albumvideo.title=p.AlbumTitle;
  video.albumvideo.user=null;
  video.title = p.Title;
  video.description = p.Descriptionn;
  video.likes = p.Likes;
  video.urlvideo =p.Urlvideos;
  video.visibility = p.Visibility;
  video.active = p.Active;
  video.DateTimePublish =p.DatePublish;
 


 
}
//#endregion

}
module.exports = { DataVideo };
    //#endregion