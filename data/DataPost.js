const { Conection } = require("./Connection");
const { VarChar,Int ,DateTime} = require("mssql");
const { DTOPost } = require("../entity/DTOPost");
class DataPost {
    //#region CRUD
     static addPost=async(dtpost)=>
    {
       let resultquery;
        let queryinsert = `
    
        IF NOT EXISTS
         ( SELECT IdUser FROM Userr WHERE IdUser=@IdUser and Active=1)
        BEGIN
          select -1 as notexistuser
        END
        ELSE
        BEGIN
           
        IF @Visibility = 'Public' OR @Visibility = 'Private'
        BEGIN

         BEGIN TRANSACTION

         insert into UserPost values  (@IdUser,
            @Title,@Descriptionn ,0,
            @Visibility
         ,GETUTCDATE(),1)

         INSERT INTO Logs (IdUser, LogDateAndTime, DetailLog)
         VALUES (@IdUser, GETUTCDATE(), 'Post Added')

         select 1 as addedpost

         
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
          select -2 as visibilityerror
         END
      END

        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('IdUser', Int,dtpost.user.iduser)
            .input('Title', VarChar,dtpost.title)
            .input('Visibility', VarChar,dtpost.visibility)
            .input('Descriptionn', VarChar, dtpost.description)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistuser;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].visibilityerror;      
             if(resultquery===undefined)
             {
              resultquery = result.recordset[0].addedpost;      
             }
            }
        pool.close();
        return resultquery;
        
    }  

     static updateVisibilityPost=async(idpost,visibility)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE IdPost=@IdPost and Active=1)
        BEGIN
             select -1 as notexistpost
        END
        ELSE
        BEGIN
            update UserPost set Visibility=@Visibility where IdPost=@IdPost
            select 1 as updatedpost
        END
        `
        let pool = await Conection.conection();
             const result = await pool.request()
            .input('Visibility', VarChar,visibility)
            .input('IdPost', Int, idpost)   
            .query(queryupdate)
            resultquery = result.recordset[0].notexistpost;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].updatedpost;
            }
        pool.close();
        return resultquery;
        
    }
     static updateTitleDescriptionPost=async(idpost,description,title)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE IdPost=@IdPost and Active=1)
        BEGIN
             select -1 as notexistpost
        END
        ELSE
        BEGIN
        update UserPost set Title=@Title,Descriptionn=@Descriptionn where IdPost=@IdPost
        select 1 as updatedpost
        END
        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('Title', VarChar,title)
            .input('Descriptionn', VarChar,description)
            .input('IdPost', Int, idpost)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistpost;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].updatedpost;
            }
        pool.close();
        return resultquery;
        
    }
    static updatePost=async(idpost,title,description,visibility)=>
{
   let resultquery;
    let queryupdate = `
    
    IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE IdPost=@IdUserPost and Active=1)
    BEGIN
      SELECT -1 as notexistpost
    END
    ELSE
    BEGIN
      IF @Visibility = 'Public' OR @Visibility = 'Private'
      BEGIN
        UPDATE UserPost SET Visibility=@Visibility,
        Descriptionn=@Descriptionn,
        Title=@Title
        WHERE IdPost=@IdUserPost
        SELECT 1 as updatedpost
      END
      ELSE
      BEGIN
        SELECT -2 as visibilityerror
      END
    END
    


    `
    let pool = await Conection.conection();
         const result = await pool.request()
         .input('Visibility', VarChar,visibility)
         .input('Title', VarChar,title)
         .input('Descriptionn', VarChar,description)
        .input('IdUserPost', Int, idpost)   
        .query(queryupdate)
        resultquery = result.recordset[0].notexistpost;
        if(resultquery===undefined)
        {
          resultquery = result.recordset[0].visibilityerror;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].updatedpost;
          }
        }
    pool.close();
    return resultquery;
    
    }
     static deletePost=async(idpost)=>
    {
       let resultquery;
        let queryupdate = `
    
        IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE IdPost=@IdPost and Active=1)
        BEGIN
             select -1 as notexistpost
        END
        ELSE
        BEGIN
        update UserPost set Active=0 where IdPost=@IdPost
        select 1 as deletepost
        END
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('IdPost', Int, idpost)
       .query(queryupdate)
            resultquery = result.recordset[0].notexistpost;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].deletepost;
            }
        pool.close();
        return resultquery;
        
    }
     //#endregion 
     //#region Exists
      static existPostId=async(idpost)=>
      {
          
            let querysearch=`	
            SELECT 
            CASE WHEN EXISTS (
            SELECT *
            FROM UserPost
            WHERE IdPost = ${idpost} and Active=1 )
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
     static getPost=async(iduserlogin,idpost)=>
     {
             let resultquery;
             let querysearch = `  

             DECLARE @iduserlogin int= ${iduserlogin};

             DECLARE @idpost int= ${idpost};
     
               IF  EXISTS ( 
              SELECT IdUserBlocker FROM BlockedUser WHERE
              IdUserBlocker = @iduserlogin AND IdUserBlocked = 
              (SELECT iduser FROM UserPost where IdPost=@idpost)
               )
             BEGIN
               select -1 as userblocked
             END
             ELSE
             BEGIN
             IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE
               IdPost=@idpost and Active=1)
              BEGIN
                    select -1 as notexistpost
              END
              ELSE
              BEGIN
                SELECT 
                UserPost.*,
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                FROM 
                UserPost 
                INNER JOIN  Userr on Userr.IdUser = UserPost.IdUser 
                WHERE 
                Userr.Active = 1 
                AND UserPost.Active = 1 
                AND UserPost.IdPost = @idpost
              END
             END
             `  
             let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             resultquery = result.recordset[0].userblocked;
             if (resultquery===undefined) {
                resultquery = result.recordset[0].notexistpost;
                if (resultquery===undefined) {
                    let post = new DTOPost();
                    this.getinformation(post, result);
                    resultquery=post;
                }     
            } 
            pool.close();
            return resultquery;
      }
     //********************************************************* */

     static getPosts=async(iduserlogin)=>
     {
        let arrayp=[];
             let querysearch = ` 

            declare @iduserlogin int = ${iduserlogin};

             select 
             UserPost.*, 
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
           from 
           UserPost 
             inner join Userr on Userr.IdUser = UserPost.IdUser 
           where 
             Userr.Active = 1 
             and UserPost.Active = 1
             AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
              WHERE IdUserBlocker = @iduserlogin 
              AND IdUserBlocked = Userr.IdUser)
           order by datepublish desc
             `  
             let pool = await Conection.conection();
             const result = await pool.request()      
             .query(querysearch)
             for (var p of result.recordset) {
                let post = new DTOPost();   
                this.getinformationList(post,p);
                arrayp.push(post);
             }
          
            pool.close();
            return arrayp;
      }
      static getSearchPost=async(iduserlogin,nameuser="",title="",description="")=>
     {
        let arrayp=[];
             let querysearch = `
             
             DECLARE @iduserlogin int= ${iduserlogin};

             SELECT
             UserPost.*,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee
            FROM UserPost
            INNER JOIN Userr ON Userr.IdUser = UserPost.IdUser
            WHERE
            Userr.Active = 1
            AND UserPost.Active = 1
            AND Userr.Name LIKE '%${nameuser}%'
            AND UserPost.Title LIKE '%${title}%'
            AND UserPost.Descriptionn LIKE '%${description}%'
            AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
              WHERE IdUserBlocker = @iduserlogin 
              AND IdUserBlocked = Userr.IdUser)
            order by datepublish desc
             `  
             let pool = await Conection.conection();
             const result = await pool.request()      
             .query(querysearch)
             for (var p of result.recordset) {
                let post = new DTOPost();   
                this.getinformationList(post,p);
                arrayp.push(post);
             }
          
            pool.close();
            return arrayp;
      }
      static getUserFollowerPost=async(iduser)=>
      {
              let arrayp=[];
              let querysearch = `

            SELECT
             UserPost.*,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee
            FROM UserPost
         
          INNER JOIN Userr ON Userr.IdUser = UserPost.IdUser
          INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
          WHERE Followers.IdFollowerUser = @IdUser
          AND Userr.Active = 1 
          AND UserPost.Active = 1 
          ORDER BY UserPost.DatePublish DESC
          
            
              `  
              let pool = await Conection.conection();
              const result = await pool.request() 
              .input('IdUser', Int,iduser)
              .query(querysearch)
              for (var p of result.recordset) {
                let post = new DTOPost();   
                this.getinformationList(post,p);
                 
                arrayp.push(post);
              }
           
             pool.close();
             return arrayp;
       }
       static getPostSuggestedUser=async(iduser,iduserlogin)=>
       {
               let arrayp=[];
               let querysearch = `
 
         
               SELECT
               UserPost.*,
               Userr.Name,
               Userr.Nick,
               Userr.Email,
               Userr.Imagee
              FROM UserPost
           
            INNER JOIN Userr ON Userr.IdUser = UserPost.IdUser
            INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
            WHERE Followers.IdFollowerUser = @IdUser
            AND Userr.Active = 1 
            AND UserPost.Active = 1 
            AND Userr.IdUser != @IdUserLogin  
            AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
              WHERE IdUserBlocker = @IdUserLogin 
              AND IdUserBlocked = Userr.IdUser) 

           UNION

            SELECT
             UserPost.*,
             Userr.Name,
             Userr.Nick,
             Userr.Email,
             Userr.Imagee
            FROM UserPost
         
          INNER JOIN Userr ON Userr.IdUser = UserPost.IdUser
          INNER JOIN Followers ON Followers.IdFollowedUser = Userr.IdUser
          WHERE Followers.IdFollowerUser = @IdUserLogin
          AND Userr.Active = 1 
          AND UserPost.Active = 1 
           AND Userr.IdUser != @IdUserLogin
           AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
            WHERE IdUserBlocker = @IdUserLogin 
            AND IdUserBlocked = Userr.IdUser)

         ORDER BY UserPost.DatePublish DESC
       
               `  
               let pool = await Conection.conection();
               const result = await pool.request() 
               .input('IdUser', Int,iduser)
               .input('IdUserLogin', Int,iduserlogin)
               .query(querysearch)
               for (var p of result.recordset) {
                let post = new DTOPost();   
                this.getinformationList(post,p);
                 
                arrayp.push(post);
               }
            
              pool.close();
              return arrayp;
        }

      static getPostOrderByLikes=async(iduserlogin)=>
     {
             let arrayp=[];
             let querysearch = `
          declare @iduserlogin int = ${iduserlogin};
          select
             UserPost.*, 
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
           from 
           UserPost 
             inner join Userr on Userr.IdUser = UserPost.IdUser 
           where 
             Userr.Active = 1 
             and UserPost.Active = 1
             AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
              WHERE IdUserBlocker = @iduserlogin 
              AND IdUserBlocked = Userr.IdUser)
             order by Likes desc


           
             `  
             let pool = await Conection.conection();
             const result = await pool.request()      
             .query(querysearch)
             for (var p of result.recordset) {
              let post = new DTOPost();   
              this.getinformationList(post,p);
              arrayp.push(post);
             }
          
            pool.close();
            return arrayp;
      }
      static getPostsOrderbyComments=async(iduserlogin)=>
      {
              let arrayp=[];
              let querysearch = `

              declare @iduserlogin int = ${iduserlogin};
              SELECT
              UserPost.IdPost,
              UserPost.IdUser,
              UserPost.Title,
              UserPost.Likes,
              UserPost.Visibility,
              UserPost.DatePublish,
              UserPost.Active,
              UserPost.Descriptionn,
              Userr.Name,
              Userr.Nick,
              Userr.Email,
              Userr.Imagee,
              COUNT(UserrCommentsPost.IdUserCommentPost) AS NumComments
          FROM UserPost
          LEFT JOIN UserrCommentsPost
          ON UserPost.IdPost = UserrCommentsPost.IdPost
          INNER JOIN Userr
          ON UserPost.IdUser = Userr.IdUser
  
          WHERE
          Userr.Active = 1 
          and UserPost.Active = 1 
          AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
            WHERE IdUserBlocker = @iduserlogin 
            AND IdUserBlocked = Userr.IdUser)

          GROUP BY
            UserPost.IdPost,
              UserPost.IdUser,
              UserPost.Title,
              UserPost.Likes,
              UserPost.Visibility,
              UserPost.DatePublish,
              UserPost.Descriptionn,
              UserPost.Active,
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
                let post = new DTOPost();   
                this.getinformationList(post,p);
               
                post.numbercomments = p.NumComments;
                 arrayp.push(post);
              }
           
             pool.close();
             return arrayp;
       }



      static getPostbyIdUser=async(iduser)=>
  {
     let arrayp=[];
          let querysearch = `   
            SELECT 
            UserPost.*,  
            Userr.Name, 
            Userr.Nick, 
            Userr.Email, 
            Userr.Imagee 
            from 
            UserPost
            inner join Userr on Userr.IdUser = UserPost.IdUser 
            where 
            Userr.Active = 1 
            and UserPost.Active = 1 
            and UserPost.IdUser = ${iduser}
       `  
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
             let post = new DTOPost();   
              this.getinformationList(post,p);
              arrayp.push(post);
          }
       
         pool.close();
         return arrayp;
   }

   static getPostVisibilityFriendUser=async(iduser)=>
       {
          let arrayp=[];
               let querysearch = `   
                 SELECT 
                 UserPost.*, 
                 Userr.Name, 
                 Userr.Nick, 
                 Userr.Email, 
                 Userr.Imagee 
                 from 
                 UserPost 
                 inner join Userr on Userr.IdUser = UserPost.IdUser 
                 where 
                 Userr.Active = 1 
                 and UserPost.Active = 1 
                 and  UserPost.Visibility='Friend'
                 and UserPost.IdUser = ${iduser}
            `  
               let pool = await Conection.conection();
               const result = await pool.request()      
               .query(querysearch)
               for (var p of result.recordset) {
                let post = new DTOPost();   
                this.getinformationList(post,p);
                arrayp.push(post);
               }
            
              pool.close();
              return arrayp;
        }
    static getPostVisibilityPublicUser=async(iduserlogin,iduser)=>
        {
               let arrayp=[];
                let querysearch = `   
                DECLARE @iduserlogin int= ${iduserlogin};

                DECLARE @iduser int= ${iduser};
    
                  IF EXISTS ( 
                 SELECT IdUserBlocker FROM BlockedUser WHERE
                 IdUserBlocker = @iduserlogin AND IdUserBlocked = @iduser
                  )
                BEGIN
                  select -1 as userblocked
                END
                ELSE
                BEGIN
                  SELECT 
                  UserPost.*, 
                  Userr.Name, 
                  Userr.Nick, 
                  Userr.Email, 
                  Userr.Imagee 
                  from 
                  UserPost 
                  inner join Userr on Userr.IdUser = UserPost.IdUser 
                  where 
                  Userr.Active = 1 
                  and UserPost.Active = 1 
                  and  UserPost.Visibility='Public'
                  and UserPost.IdUser = @iduser
                END
             `  
                let pool = await Conection.conection();
                const result = await pool.request()      
                .query(querysearch)
                for (var p of result.recordset) {
                  let post = new DTOPost();   
                  this.getinformationList(post,p);
                  arrayp.push(post);
                }
            
               pool.close();
               return arrayp;
         }
   static getPostbyFriendUser=async(iduser)=>     {
          let arrayp=[];
               let querysearch = `  
                  SELECT 
                    UserPost.*, 
                    Userr.Name, 
                    Userr.Nick, 
                    Userr.Email, 
                    Userr.Imagee 
                    from 
                    UserPost 
                    inner join Userr on Userr.IdUser = UserPost.IdUser 
                    inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                    where 
                    Userr.Active = 1 
                    and UserPost.Active = 1 
                    and UserrRelations.Statee = 'Confirmed' 
                    and (UserPost.Visibility='Public' or UserPost.Visibility='Friend') 
                    and UserrRelations.IdUser = ${iduser}
                    ORDER BY datepublish desc
             `  
               let pool = await Conection.conection();
               const result = await pool.request()      
               .query(querysearch)
               for (var p of result.recordset) {
                let post = new DTOPost();   
                this.getinformationList(post,p);
                arrayp.push(post);
               }
            
              pool.close();
              return arrayp;
        }

    static getPostVisibilityByUserRelation=async(iduserlogin,iduser)=>
        {
            /*    if the users are friends, 
              it shows the post with public or friend status, and if they are not,
              it shows the public post
          */
           let arrayp=[];
           let querysearch = `   
    
        IF EXISTS ( SELECT UserrRelations.IdFriend FROM  UserrRelations 
                   INNER JOIN Userr ON Userr.IdUser = UserrRelations.IdFriend 
                  WHERE 
                   Userr.Active = 1 
                    AND UserrRelations.IdUser =${iduserlogin}
                   AND UserrRelations.IdFriend =${iduser}
                   AND UserrRelations.Statee = 'Confirmed' 
              )
         BEGIN
         SELECT 
             UserPost.*, 
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
             FROM 
             UserPost 
             INNER JOIN Userr on Userr.IdUser = UserPost.IdUser 
             WHERE 
             Userr.Active = 1 
             AND UserPost.Active = 1 
             AND  (UserPost.Visibility='Friend' OR UserPost.Visibility='Public')
             AND UserPost.IdUser = ${iduser}
      END
      ELSE
      BEGIN
         SELECT 
             UserPost.*,  
             Userr.Name, 
             Userr.Nick, 
             Userr.Email, 
             Userr.Imagee 
             FROM 
             UserPost 
             INNER JOIN Userr on Userr.IdUser = UserPost.IdUser 
             WHERE 
             Userr.Active = 1 
             AND UserPost.Active = 1 
             AND UserPost.Visibility='Public'
             AND UserPost.IdUser = ${iduser}
             END

              `  
                let pool = await Conection.conection();
                const result = await pool.request()      
                .query(querysearch)
                for (var p of result.recordset) {
                  let post = new DTOPost();   
                  this.getinformationList(post,p);
                  arrayp.push(post);
                }
             
               pool.close();
               return arrayp;
        }
   static getPostMainPage=async(iduserlogin,country)=>     {
          let arrayp=[];
           let querysearch = `            
          IF EXISTS (
            select 
              UserrRelations.IdFriend
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
                    UserPost.*, 
                    Userr.Name, 
                    Userr.Nick, 
                    Userr.Email, 
                    Userr.Imagee 
                    from 
                    UserPost 
                    inner join Userr on Userr.IdUser = UserPost.IdUser 
                    inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                    where 
                    Userr.Active = 1 
                    and UserPost.Active = 1 
                    and UserrRelations.Statee = 'Confirmed' 
                    and (UserPost.Visibility='Public' or UserPost.Visibility='Friend') 
                    and UserrRelations.IdUser = ${iduserlogin}
    
                    UNION
    
              SELECT 
              UserPost.*, 
              Userr.Name, 
              Userr.Nick, 
              Userr.Email, 
              Userr.Imagee 
              from 
              UserPost 
              inner join Userr on Userr.IdUser = UserPost.IdUser 
              where 
              Userr.Active = 1 
              and UserPost.Active = 1 
              and UserPost.Visibility='Public'
              and Userr.Country =@Country
                 
    
                   UNION
    
              SELECT 
              UserPost.*, 
              Userr.Name, 
              Userr.Nick, 
              Userr.Email, 
              Userr.Imagee 
              from 
              UserPost 
              inner join Userr on Userr.IdUser = UserPost.IdUser 
              where 
              Userr.Active = 1 
              and UserPost.Active = 1 
              and UserPost.Visibility='Public'
             ORDER BY DATEPUBLISH DESC
        END
        ELSE
        BEGIN				
          IF EXISTS (
            SELECT 
                UserPost.*
                    from 
                    UserPost 
                    inner join Userr on Userr.IdUser = UserPost.IdUser 
                    where 
                    Userr.Active = 1  
                    and UserPost.Active = 1 
                    and UserPost.Visibility='Public'
                    and Userr.Country = @Country
            )
          BEGIN			
              SELECT 
              UserPost.*, 
              Userr.Name, 
              Userr.Nick, 
              Userr.Email, 
              Userr.Imagee 
              from 
              UserPost 
              inner join Userr on Userr.IdUser = UserPost.IdUser 
              where 
              Userr.Active = 1 
              and UserPost.Active = 1 
              and UserPost.Visibility='Public'
              and Userr.Country = @Country
    
                   UNION
    
                SELECT 
                UserPost.*, 
              Userr.Name, 
              Userr.Nick, 
              Userr.Email, 
              Userr.Imagee 
              from 
              UserPost 
              inner join Userr on Userr.IdUser = UserPost.IdUser 
              where 
              Userr.Active = 1 
              and UserPost.Active = 1 
              and UserPost.Visibility='Public'
              ORDER BY DATEPUBLISH DESC
    
            END
             ELSE 
          BEGIN
            SELECT 
            UserPost.*,  
              Userr.Name, 
              Userr.Nick, 
              Userr.Email, 
              Userr.Imagee 
              from 
              UserPost 
              inner join Userr on Userr.IdUser = UserPost.IdUser 
              where 
              Userr.Active = 1 
              and UserPost.Active = 1 
              and UserPost.Active = 1 
              and UserPost.Visibility='Public'
             ORDER BY DATEPUBLISH DESC
          END 		  
        END 
             `  
               let pool = await Conection.conection();
               const result = await pool.request()
               .input('Country', VarChar,country)      
               .query(querysearch)
               for (var p of result.recordset) {
                  let post = new DTOPost();   
                this.getinformationList(post,p);
                arrayp.push(post);
               }
            
              pool.close();
              return arrayp;
        }    


    static getPostByLikeUser=async(iduserlogin)=>//Get all the posts that the user gave like
        {
          let array=[];
          let querysearch=
          `
          SELECT 
          UserPost.*, 
          Userr.Name, 
          Userr.Nick, 
          Userr.Email, 
          Userr.Imagee 
          FROM 
          LikePost 
          inner join UserPost on UserPost.idpost = LikePost.idpost 
          inner join Userr on Userr.IdUser = UserPost.IdUser
          WHERE 
          Userr.Active = 1 
          and UserPost.Active = 1 
          and LikePost.iduser=${iduserlogin}
    
          `
          let pool = await Conection.conection();
          const result = await pool.request()      
          .query(querysearch)
          for (var p of result.recordset) {
            let post = new DTOPost();   
            this.getinformationList(post,p);
            array.push(post);
          }
         pool.close();
         return array;
        } 
     //#endregion
      //#region  GetInformation
  static  getinformation(post, result) {
    
  post.idpost = result.recordset[0].IdPost; 
  post.user.iduser = result.recordset[0].IdUser;
  post.user.name = result.recordset[0].Name;
  post.user.nick = result.recordset[0].Nick;
  post.user.email = result.recordset[0].Email;
  post.user.image = result.recordset[0].Imagee;
  post.title = result.recordset[0].Title;
  post.description = result.recordset[0].Descriptionn;
  post.likes = result.recordset[0].Likes;
  post.visibility = result.recordset[0].Visibility;
  post.active = result.recordset[0].Active;
  post.DateTimePublish = result.recordset[0].DatePublish;

}
static  getinformationList(post, p) {
  
  post.idpost =p.IdPost; 
  post.user.iduser = p.IdUser;
  post.user.name = p.Name;
  post.user.nick = p.Nick;
  post.user.email = p.Email;
  post.user.image = p.Imagee;
  post.title = p.Title;
  post.description = p.Descriptionn;
  post.likes = p.Likes;
  post.visibility = p.Visibility;
  post.active = p.Active;
  post.DateTimePublish =p.DatePublish;
 


 
}
//#endregion

}
module.exports = { DataPost };