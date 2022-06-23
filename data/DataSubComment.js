const { DTOSubComment } = require("../entity/DTOSubComment");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DataUser } = require("./DataUser");

class DataSubComment {
    //#region CRUD

    static addSubComment=async(iduser,idcomment,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT * FROM UserrComments WHERE idusercomment=@idusercomment)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@iduser and Active=1)
            BEGIN
             select -2 as notexistuser
            END
            ELSE
            BEGIN
                 insert into UserrSubComments values (@iduser,@idusercomment,0,@text,getutcdate())
                 select 1 as subcommentadded
            END
         END
     
        `
             let pool = await Conection.conection();
             const result = await pool.request()
            .input('idusercomment', Int,idcomment)
            .input('iduser', Int, iduser)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcomment;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                    resultquery = result.recordset[0].subcommentadded;
              }
            }
        pool.close();
        return resultquery;
        
    }

    static UpdateTextSubCommentImage=async(idcomment,idimage,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT * FROM UserrCommentsImage WHERE idusercomment=@idusercomment and iduserimages=@iduserimages)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            UPDATE UserrComments set Textt=@text
            select 1 as commentupdated   
        END
     
        `
             let pool = await Conection.conection();
             const result = await pool.request()
            .input('idusercomment', Int,idcomment)
            .input('iduserimages', Int, idimage)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcomment;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].commentupdated;
              
            }
        pool.close();
        return resultquery;
        
    }
    static deletelikeanvideo=async(iduser,idvideo)=>
    {
        let resultquery;
        let queryupdate = 
        `

        IF NOT EXISTS ( SELECT * FROM UserVideos WHERE IdUserVideos=@iduservideos and Active=1)
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
                IF  NOT EXISTS ( SELECT * FROM LikeVideo WHERE IdUser=@iduser and IdUserVideos=@iduservideos)
                BEGIN
                select -3 as noexistlikevideo
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  
                        DELETE  FROM  LikeVideo where IdUser=@iduser and IdUserVideos=@iduservideos
                        UPDATE UserVideos SET Likes = Likes - 1 where IdUserVideos=@iduservideos
                        select 1 as deletelikeanvideo
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
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduser', Int,iduser)
       .input('iduservideos', Int, idvideo) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistvideo;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistuser;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].noexistlikevideo;
           if(resultquery===undefined)
           {
               resultquery = result.recordset[0].deletelikeanvideo;
            }
         }
       }
        pool.close();
        return resultquery;
        
    }

    //#endregion
    //#region GETS 
    static getsSubCommentImage=async(idimage)=>
    {
      
            let arraysubcomment=[];
              let querysearch=
              `             
            SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrCommentsImage.idusercommentimg,
		    UserrCommentsImage.iduserimages,
			UserrSubComments.idsubusercomment,
			UserrSubComments.likes as likessubcomment,
			UserrSubComments.textt as textsubcomment,
			UserrSubComments.datepublish as datepublishsubcomment,
			Userr.*
            FROM 
            UserrComments
            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
			inner join  UserrSubComments on UserrSubComments.idusercomment=UserrComments.idusercomment
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			UserImages.Active = 1
			AND Userr.Active=1
            AND UserrCommentsImage.iduserimages=${idimage} 
              `;
       
            let pool = await Conection.conection();
       
                const result = await pool.request()
                .query(querysearch)
                for (var resultcommentimg of result.recordset) {
                   let commentimg = new DTOSubComment(); 
                    this.getinformationListImageComment(commentimg,resultcommentimg);
                    arraysubcomment.push(commentimg);
                 }
           pool.close();
           return arraysubcomment;
       
     }
    //#endregion
    //#region OTHERS

    static  NumberOfLikesVideos=async(idvideo)=>
    {
    
            let query = `

            SELECT 
            COUNT(*) as numberlikes
            FROM 
            LikeVideo
            inner join UserVideos on UserVideos.iduservideos = LikeVideo.iduservideos
            WHERE 
            UserVideos.Active = 1
             AND LikeVideo.iduservideos=${idvideo}

            `;
        let pool = await Conection.conection();
        const result = await pool.request()
       .query(query)
       let numberlikes = result.recordset[0].numberlikes;
        pool.close();
        return numberlikes;
        
    }
 
    //#endregion

 //#region GetInformation
static getinformationImageComment(subcomment, result) {
    
    subcomment.imagecomment.comment.IdUserComment = result.recordset[0].idusercomment; 
    subcomment.imagecomment.comment.Textt = result.recordset[0].textcomment; 
    subcomment.imagecomment.comment.Likes = result.recordset[0].likescomment; 
    subcomment.imagecomment.comment.DatePublish = result.recordset[0].datepublishcomment; 
    subcomment.imagecomment.comment.IdUserComment = result.recordset[0].idusercomment; 
    subcomment.imagecomment.comment.IdUserComment = result.recordset[0].idusercomment; 
    subcomment.imagecomment.comment.IdUserComment = result.recordset[0].idusercomment; 
   
}
 static  getinformationListImageComment(subcomment, result) {
      
    subcomment.imagecomment.comment.IdUserComment = result.recordset[0].idusercomment; 
    subcomment.imagecomment.comment.Textt = result.recordset[0].textcomment; 
    subcomment.imagecomment.comment.Likes = result.recordset[0].likescomment; 
    subcomment.imagecomment.IdUserCommentImg = result.recordset[0].idusercommentimg; 
    subcomment.imagecomment.image.idphoto = result.recordset[0].iduserimages; 
    subcomment.IdSubUserComment = result.recordset[0].idusercommentimg; 
    subcomment.Likes = result.recordset[0].idusercommentimg; 
    subcomment.Textt = result.recordset[0].textt; 
    subcomment.DatePublish = result.recordset[0].idusercommentimg; 
    DataUser.getinformationList(subcomment.user,result)


}
//#endregion
}
module.exports = { DataSubComment };