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
        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE iduservideos=@idvideo and Active=1)
        BEGIN
            select -1 as notexistvideo
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                    BEGIN TRANSACTION  
                        insert into UserrComments values (@iduser,@text,0,getutcdate(),'Public')
                        insert into UserrCommentsVideo values (@@identity,@idvideo)
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
        IF NOT EXISTS ( SELECT * FROM UserrCommentsVideo WHERE idusercomment=@idusercomment 
            and iduservideos=@idvideo)
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
                    IF NOT EXISTS ( SELECT * FROM UserrComments WHERE IdUser=@iduser and idusercomment=@idusercomment)
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
    //#region  GETS
      
    
    static getsCommentsVideo=async(idvideo)=>
    {
      
            let arraycomment=[];
              let querysearch=
              `        
                   
            SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,

			UserrCommentsVideo.idusercommentvideo,
		    UserrCommentsVideo.iduservideos,

		
			Userr.iduser as idcommentuser,
            Userr.name as namecommentuser,
            Userr.nick as nickcommentuser,
            Userr.userrname as usernamecommentuser,
            Userr.imagee as imagecommentuser

            FROM 
            UserrComments
            inner join UserrCommentsVideo on UserrCommentsVideo.idusercomment = UserrComments.idusercomment
			inner join  UserVideos on UserVideos.iduservideos=UserrCommentsVideo.idusercommentvideo
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			UserVideos.Active = 1
			AND Userr.Active=1
            AND UserrCommentsVideo.iduservideos=${idvideo} 

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
    }
    //#endregion
}
module.exports = { DataCommentVideo };