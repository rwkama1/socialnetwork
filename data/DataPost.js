const { Conection } = require("./Connection");
const { VarChar,Int ,DateTime} = require("mssql");
const { DTOPost } = require("../entity/DTOPost");
class DataPost {
    //#region CRUD
     static addPost=async(dtpost)=>
    {
       let resultquery;
        let queryinsert = `
    
        IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdUser and Active=1)
        BEGIN
          select -1 as notexistuser
        END
        ELSE
        BEGIN
             insert into UserPost values (@IdUser,@Title,@Descriptionn ,0,'Public',GETUTCDATE(),1)
             select 1 as addedpost    
        END

        `
        let pool = await Conection.conection();
    
        const result = await pool.request()
            .input('IdUser', Int,dtpost.user.iduser)
            .input('Title', VarChar,dtpost.title)
            .input('Descriptionn', VarChar, dtpost.description)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistuser;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].addedpost;      
            }
        pool.close();
        return resultquery;
        
    }  
     static updateVisibilityPost=async(idpost,visibility)=>
    {
       let resultquery;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM UserPost WHERE IdPost=@IdPost and Active=1)
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
        IF NOT EXISTS ( SELECT * FROM UserPost WHERE IdPost=@IdPost and Active=1)
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
     static deletePost=async(idpost)=>
    {
       let resultquery;
        let queryupdate = `
    
        IF NOT EXISTS ( SELECT * FROM UserPost WHERE IdPost=@IdPost and Active=1)
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
     static getPost=async(idpost)=>
     {
             let resultquery;
             let querysearch = `  
             IF NOT EXISTS ( SELECT * FROM UserPost WHERE IdPost=${idpost} and Active=1)
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
                AND UserPost.IdPost = ${idpost}
             END
             `  
             let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             resultquery = result.recordset[0].notexistpost;
             if (resultquery===undefined) {
                let post = new DTOPost();
                this.getinformation(post, result);
                resultquery=post;
             }     
           
            pool.close();
            return resultquery;
      }
     //********************************************************* */

     static getPosts=async()=>
     {
        let arrayp=[];
             let querysearch = `     
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
    static getPostVisibilityPublicUser=async(iduser)=>
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
                and  UserPost.Visibility='Public'
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