const { DTOCommentVideo } = require("../entity/DTOCommentVideo");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");

class DataCommentVideo {
    //#region CRUD

    static CommentVideo=async(iduser,idvideo,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT iduservideos FROM UserVideos WHERE iduservideos=@idvideo and Active=1)
        BEGIN
            select -1 as notexistvideo
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
                        insert into UserrCommentsVideo values (@@identity,@idvideo)
                        insert into NotificationCommentVideo values
                        ((select IdUser from UserVideos where IdUserVideos=@idvideo),
                        @iduser,@idvideo,'',getutcdate(),0)
                        select 1 as commentvideoadded
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
            .input('idvideo', Int, idvideo)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistvideo;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                    resultquery = result.recordset[0].commentvideoadded;
              }
            }
        pool.close();
        return resultquery;
        
    }
    static UpdateTextCommentVideo=async(iduser,idcomment,idvideo,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrCommentsVideo WHERE idusercomment=@idusercomment 
            and iduservideos=@idvideo)
        BEGIN
            select -1 as notexistcommentvideo
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT iduservideos FROM UserVideos WHERE iduservideos=@idvideo and Active=1)
            BEGIN
                select -2 as notexistvideos
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
            .input('idvideo', Int, idvideo)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcommentvideo;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistvideos;
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
    static deleteCommentVideo=async(iduser,idcomment,idvideo)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS ( SELECT * FROM UserrCommentsVideo WHERE idusercomment=@idcomment and iduservideos=@idvideo)
        BEGIN
            select -1 as notexistcommentvideo
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM UserVideos WHERE iduservideos=@idvideo and Active=1)
            BEGIN
                select -2 as notexistvideos
            END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
                BEGIN
                    select -3 as notexistuser
                END
                ELSE
                BEGIN
                    IF NOT EXISTS ( SELECT * FROM UserrComments WHERE IdUser=@iduser and idusercomment=@idcomment)
                    BEGIN
                        select -4 as notexistcomment
                    END
                    ELSE
                    BEGIN
                            BEGIN TRANSACTION  
                            IF EXISTS ( SELECT * FROM UserrSubComments WHERE  idusercomment=@idcomment)
                            BEGIN
                                delete from UserrSubComments where idusercomment=@idcomment
                            END
                            delete from NotificationSubComment where IdUserComment=@idcomment
                                 delete from LikeComment where idusercomment=@idcomment
                                delete from UserrCommentsVideo where idusercomment=@idcomment
                                delete from UserrComments where idusercomment=@idcomment and iduser=@iduser
                                select 1 as commentvideodeleted
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
       .input('idvideo', Int, idvideo) 
       .input('iduser', Int, iduser) 
       .query(queryupdate)
         resultquery = result.recordset[0].notexistcommentvideo;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistvideos;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].notexistuser;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].notexistcomment;
                        if(resultquery===undefined)
                        {
                            resultquery = result.recordset[0].commentvideodeleted;
                        }
                      
                    }
                   
                }
            }
        pool.close();
        return resultquery;
        
    }

    //#endregion

   //#region Exists

   static existCommentVideo=async(idcomment,iduser,idvideo)=>
   {
       
       let querysearch=`
   
       declare @idcomment int=${idcomment};
       IF NOT EXISTS ( 
           SELECT IdUserComment FROM UserrCommentsVideo 
           WHERE IdUserComment = 
           (SELECT idusercomment FROM UserrComments
                WHERE iduser=@iduser AND idusercomment=@idcomment )
          
           AND iduservideos = @idvideo
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
           .input('idvideo', Int, idvideo)
           .query(querysearch)
           let exist = result.recordset[0].Exist;
           pool.close();
           return exist;
       
   
   }

   //#endregion


    //#region  GETS
      
    
    static getsCommentsVideo=async(iduserlogin,idvideo)=>
    {
      
            let arraycomment=[];
              let querysearch=
              `        
             DECLARE @iduserlogin int = ${iduserlogin}
             DECLARE @idvideo int = ${idvideo}  
              
            SELECT 
			uc.idusercomment,
			uc.textt as textcomment,
			uc.likes as likescomment,
			uc.datepublish as datepublishcomment,

			ucv.idusercommentvideo,
		    ucv.iduservideos,

		
			Userr.iduser as idcommentuser,
            Userr.name as namecommentuser,
            Userr.nick as nickcommentuser,
            Userr.userrname as usernamecommentuser,
            Userr.imagee as imagecommentuser,
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

                    SELECT IdUserComment FROM UserrCommentsVideo 
                    WHERE UserrCommentsVideo.IdUserComment = 
                    (SELECT idusercomment FROM UserrComments
                         WHERE UserrComments.iduser=@iduserlogin AND UserrComments.idusercomment=uc.idusercomment )
                   
                    AND UserrCommentsVideo.iduservideos = ucv.iduservideos
				
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
            UserrComments as uc
            INNER JOIN UserrCommentsVideo as ucv ON ucv.IdUserComment = uc.IdUserComment
            INNER JOIN UserVideos ON UserVideos.IdUserVideos = ucv.IdUserVideos
            INNER JOIN Userr ON Userr.IdUser = uc.IdUser
        
              WHERE 
            UserVideos.Active = 1
            AND Userr.Active = 1
            AND UserVideos.IdUserVideos = @idvideo
            AND NOT EXISTS (
                SELECT IdUserBlocker FROM BlockedUser
                WHERE IdUserBlocker = @iduserlogin 
                AND IdUserBlocked = Userr.IdUser
            )
              `;
       
            let pool = await Conection.conection();
            const result = await pool.request()
            .query(querysearch)
            for (var resultcommentvideo of result.recordset) {
                   let commentvideo = new DTOCommentVideo(); 
                    this.getinformationListVideoComment(commentvideo, resultcommentvideo);
                    arraycomment.push(commentvideo);
                 }
           pool.close();
           return arraycomment;
       
     }
    //#endregion
    //#region OTHERS

    static  NumberOfCommentVideo=async(idvideo)=>
    {
    
            let query = `

            SELECT 
            COUNT(*) as numbercomment
            FROM 
            UserrComments
            inner join UserrCommentsVideo on UserrCommentsVideo.idusercomment = UserrComments.idusercomment
			inner join  UserVideos on UserVideos.iduservideos=UserrCommentsVideo.iduservideos
            WHERE 
            UserVideos.Active = 1
            AND UserrCommentsVideo.iduservideos=${idvideo}

            `;
        let pool = await Conection.conection();
        const result = await pool.request()
       .query(query)
       let numbercomment = result.recordset[0].numbercomment;
        pool.close();
        return numbercomment;
        
    }
 
    //#endregion

    //#region GetInformation

    static getinformationListVideoComment(commentvideo, result) {

        commentvideo.idusercomment = result.idusercomment; 
        commentvideo.textcomment = result.textcomment; 
        commentvideo.likescomment = result.likescomment; 
        commentvideo.datepublishcomment = result.datepublishcomment; 

        commentvideo.IdUserCommentVideo = result.idusercommentvideo; 
        commentvideo.iduservideos = result.iduservideos; 

        
        commentvideo.idcommentuser = result.idcommentuser; 
        commentvideo.namecommentuser = result.namecommentuser; 
        commentvideo.nickcommentuser = result.nickcommentuser; 
        commentvideo.usernamecommentuser = result.usernamecommentuser; 
        commentvideo.imagecommentuser = result.imagecommentuser;

        commentvideo.existlikeloginuser = result.existlikeloginuser; 
        commentvideo.numbersubcomment = result.numbersubcomment;
        commentvideo.existcommentloginuser = result.existcommentloginuser; 
    }
    //#endregion
}
module.exports = { DataCommentVideo };