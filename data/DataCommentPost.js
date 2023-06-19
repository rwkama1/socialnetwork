const { DTOCommentPost } = require("../entity/DTOCommentPost");
const { Conection } = require("./Connection");
const { VarChar,Int } = require("mssql");


class DataCommentPost {
    //#region CRUD

    static CommentPost=async(iduser,idpost,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE IdPost=@idpost and Active=1)
        BEGIN
            select -1 as notexistpost
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                    BEGIN TRANSACTION  
                        insert into UserrComments values (@iduser,@text,0,getutcdate(),'Public')
                        insert into UserrCommentsPost values (@@identity,@IdPost)
                        insert into NotificationCommentPost values
                         ((select IdUser from UserPost where IdPost=@idpost),
                         @iduser,@idpost,'',getutcdate(),0)
                        select 1 as commentpostadded
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
            .input('idpost', Int, idpost)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistpost;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                    resultquery = result.recordset[0].commentpostadded;
              }
            }
        pool.close();
        return resultquery;
        
    }
    static UpdateTextCommentPost=async(iduser,idcomment,idpost,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrCommentsPost WHERE idusercomment=@idusercomment 
            and IdPost=@idpost)
        BEGIN
            select -1 as notexistcommentpost
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdPost FROM UserPost WHERE IdPost=@idpost and Active=1)
            BEGIN
                select -2 as notexistpost
            END
           ELSE
           BEGIN
                IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
                BEGIN
                    select -3 as notexistuser
                END
                ELSE
                BEGIN
                    IF NOT EXISTS ( SELECT IdUser FROM UserrComments WHERE IdUser=@iduser and idusercomment=@idusercomment)
                    BEGIN
                        select -4 as notexistcomment
                    END
                    ELSE
                    BEGIN
                        UPDATE UserrComments set Textt=@text where idusercomment=@idusercomment and iduser=@iduser
                        select 1 as commentupdated  
                    END
                 END
               
           END
         
        END
        
        `
             let pool = await Conection.conection();
             const result = await pool.request()
            .input('idusercomment', Int,idcomment)
            .input('iduser', Int,iduser)
            .input('idpost', Int, idpost)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcommentpost;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistpost;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].notexistuser;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].notexistcomment;
                        if(resultquery===undefined)
                        {
                            resultquery = result.recordset[0].commentupdated;
                        }
                      
                    }
                   
                }
              
              
            }
        pool.close();
        return resultquery;
        
    }
    static deleteCommentPost=async(iduser,idcomment,idpost)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrCommentsPost WHERE idusercomment=@idcomment and IdPost=@idpost)
        BEGIN
            select -1 as notexistcommentpost
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT idpost FROM UserPost WHERE idpost=@idpost and Active=1)
            BEGIN
                select -2 as notexistpost
            END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
                BEGIN
                    select -3 as notexistuser
                END
                ELSE
                BEGIN
                    IF NOT EXISTS ( SELECT IdUser FROM UserrComments WHERE IdUser=@iduser and idusercomment=@idcomment)
                    BEGIN
                        select -4 as notexistcomment
                    END
                    ELSE
                    BEGIN
                            BEGIN TRANSACTION  
                            IF EXISTS ( SELECT idusercomment FROM UserrSubComments WHERE  idusercomment=@idcomment)
                            BEGIN
                                delete from UserrSubComments where idusercomment=@idcomment
                            END
                            delete from NotificationSubComment where IdUserComment=@idcomment
                            delete from LikeComment where idusercomment=@idcomment
                            delete from UserrCommentsPost where idusercomment=@idcomment
                            delete from UserrComments where idusercomment=@idcomment and iduser=@iduser
                            select 1 as commentpostdeleted
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
         END

        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('idcomment', Int,idcomment)
       .input('idpost', Int, idpost) 
       .input('iduser', Int, iduser) 
       .query(queryupdate)
         resultquery = result.recordset[0].notexistcommentpost;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistpost;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].notexistuser;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].notexistcomment;
                        if(resultquery===undefined)
                        {
                            resultquery = result.recordset[0].commentpostdeleted;
                        }
                      
                    }
                   
                }
            }
        pool.close();
        return resultquery;
        
    }

    //#endregion

    //#region Exists

    static existCommentPost=async(idcomment,iduser,idpost)=>
        {
           
             let querysearch=`
       
             declare @idcomment int=${idcomment};
             IF NOT EXISTS ( 
                 SELECT IdUserComment FROM UserrCommentsPost 
                 WHERE IdUserComment = 
                 (SELECT idusercomment FROM UserrComments
                      WHERE iduser=@iduser AND idusercomment=@idcomment )
                
                 AND idpost = @IdPost
                 )
             BEGIN
                 select CAST(0 AS BIT) as Exist
             END
             ELSE
             BEGIN
                 select CAST(1 AS BIT) as Exist
             END
         
             `;
                let pool = await Conection.conection();   
               const result = await pool.request()
               .input('IdUser', Int, iduser)
               .input('IdPost', Int, idpost)
               .query(querysearch)
               let exist = result.recordset[0].Exist;
               pool.close();
               return exist;
            
        
         }

    //#endregion

    //#region  GETS
      
    static getsCommentsPost=async(iduserlogin,idpost)=>
    {
      
            let arraycomment=[];
            let querysearch=
              `        
            DECLARE @iduserlogin int = ${iduserlogin}
            DECLARE @idpost int = ${idpost}

           SELECT 
            UC.idusercomment,
            UC.Textt AS textcomment,
            UC.Likes AS likescomment,
            UC.DatePublish AS datepublishcomment,
        
            UCP.idusercommentpost,
            UCP.idpost,
        
            U.IdUser AS idcommentuser,
            U.Name AS namecommentuser,
            U.Nick AS nickcommentuser,
            U.UserrName AS usernamecommentuser,
            U.Imagee AS imagecommentuser,
			CASE
				WHEN EXISTS (

				 SELECT IdUser FROM LikeComment 
				  WHERE LikeComment.IdUser = @iduserlogin AND LikeComment.IdUserComment = uc.idusercomment
				
				)
				THEN CAST(1 AS BIT)
				ELSE CAST(0 AS BIT)
				END AS existlikeloginuser,

                CASE
				WHEN EXISTS (

                    SELECT IdUserComment FROM UserrCommentsPost 
                    WHERE UserrCommentsPost.IdUserComment = 
                    (SELECT idusercomment FROM UserrComments
                         WHERE UserrComments.iduser=@iduserlogin AND UserrComments.idusercomment=UC.idusercomment )
                   
                    AND UserrCommentsPost.idpost = UP.IdPost
				
				)
				THEN CAST(1 AS BIT)
				ELSE CAST(0 AS BIT)
				END AS existcommentloginuser,

				(
					SELECT 
					COUNT(*) as numbersubcomments
					FROM 
					UserrSubComments
					WHERE 
					UserrSubComments.idusercomment=uc.idusercomment
				) as numbersubcomment
        FROM 
            UserrCommentsPost UCP
            INNER JOIN UserrComments UC ON UCP.IdUserComment = UC.IdUserComment
            INNER JOIN UserPost UP ON UCP.IdPost = UP.IdPost
            INNER JOIN Userr U ON UC.IdUser = U.IdUser
        WHERE 
            U.Active = 1
             AND 
            UP.IdPost = @idpost
            AND UP.Active = 1
             AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
              WHERE IdUserBlocker = @iduserlogin 
                 AND IdUserBlocked = U.IdUser)

        
              `;
       
            let pool = await Conection.conection();
            const result = await pool.request()
            .query(querysearch)
            for (var resultcommentpost of result.recordset) {
                   let commentpost = new DTOCommentPost(); 
                    this.getinformationListPostComment(commentpost,resultcommentpost);
                    arraycomment.push(commentpost);
                 }
           pool.close();
           return arraycomment;
       
     }
     
    //#endregion

    //#region OTHERS

    static  NumberOfCommentPost=async(idpost)=>
    {
    
            let query = `

            SELECT 
            COUNT(*) as numbercomment
            FROM 
            UserrComments
            inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
			inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
            WHERE 
            UserPost.Active = 1
            AND UserrCommentsPost.idpost=${idpost}

            `;
        let pool = await Conection.conection();
        const result = await pool.request()
       .query(query)
       let numbercomment = result.recordset[0].numbercomment;
        pool.close();
        return numbercomment;
        
    }
 
    //#endregion

      //#region GET INFORMATION
      
 static getinformationListPostComment(postcomment, result) {
      
        postcomment.idusercomment = result.idusercomment; 
        postcomment.textcomment = result.textcomment; 
        postcomment.likescomment = result.likescomment; 
        postcomment.datepublishcomment = result.datepublishcomment; 

        postcomment.IdUserCommentPost = result.idusercommentpost; 
        postcomment.idpost = result.idpost; 

        
        postcomment.idcommentuser = result.idcommentuser; 
        postcomment.namecommentuser = result.namecommentuser; 
        postcomment.nickcommentuser = result.nickcommentuser; 
        postcomment.usernamecommentuser = result.usernamecommentuser; 
        postcomment.imagecommentuser = result.imagecommentuser;



        postcomment.existlikeloginuser = result.existlikeloginuser;
        postcomment.numbersubcomment = result.numbersubcomment;
        postcomment.existcommentloginuser = result.existcommentloginuser;
        
    
    
    
    }
    //#endregion
}
module.exports = { DataCommentPost };