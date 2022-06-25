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

   
 
     static getIfExistsSubComentsOfCommentsImage=async(idimage)=>
     {
        let array=[];
        let query=
        `
		IF NOT EXISTS (SELECT idusercomment  from --I check if the image has comments with subcomments
            (
                SELECT 
                UserrComments.idusercomment
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

            ) AS commentsubcomentimg

    )
    BEGIN --if there are no subcomments then list all comments without subcomments

        SELECT 	
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsImage.idusercommentimg,
        UserrCommentsImage.iduserimages,

        0 as idsubusercomment,
        0 as likessubcomment,
        '' as textsubcomment,
        0 as datepublishsubcomment,

        0 as idsubcommentuser,
        '' as namesubcommentuser,
        '' as nicksubcommentuser,
        '' as usernamesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,

        0 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
        inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
        inner join Userr  on Userr.iduser=UserrComments.iduser
          WHERE 
        UserImages.Active = 1
        AND Userr.Active=1
        AND UserrCommentsImage.iduserimages=${idimage}
    END  
    ELSE 
    BEGIN --if there are subcomments then query all comments with subcomments
        
        SELECT
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsImage.idusercommentimg,
        UserrCommentsImage.iduserimages,

        UserrSubComments.idsubusercomment as idsubusercomment  ,
        UserrSubComments.likes as likessubcomment,
        UserrSubComments.textt as textsubcomment,
        UserrSubComments.datepublish as datepublishsubcomment,

        Usersubcomment.iduser as idsubcommentuser,
        Usersubcomment.name as namesubcommentuser,
        Usersubcomment.nick as nicksubcommentuser,
        Usersubcomment.userrname as usernamesubcommentuser,

        Usercomment.iduser as idcommentuser,
        Usercomment.name as namecommentuser,
        Usercomment.nick as nickcommentuser,
        Usercomment.userrname as usernamecommentuser,
        1 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
        inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
        inner join  UserrSubComments on UserrComments.idusercomment=UserrSubComments.idusercomment
        inner join Userr as Usercomment on Usercomment.iduser=UserrComments.iduser
        inner join Userr as Usersubcomment on Usersubcomment.iduser=UserrSubComments.iduser
        WHERE 
        UserImages.Active = 1
        AND Usercomment.Active=1
        AND Usersubcomment.Active=1
        AND UserrCommentsImage.iduserimages=${idimage}

        union all

        SELECT 
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsImage.idusercommentimg,
        UserrCommentsImage.iduserimages,

        0 as idsubusercomment,
        0 as likessubcomment,
        '' as textsubcomment,
        0 as datepublishsubcomment,

        0 as idsubcommentuser,
        '' as namesubcommentuser,
        '' as nicksubcommentuser,
        '' as usernamesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        1 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
        inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
        inner join Userr on Userr.iduser=UserrComments.iduser
        WHERE 
        UserImages.Active = 1
        AND Userr.Active=1
        AND UserrCommentsImage.iduserimages=${idimage}
        AND NOT EXISTS
        (
            SELECT idsubusercomment,idusercomment FROM UserrSubComments
            WHERE UserrComments.idusercomment=UserrSubComments.idusercomment
        ) 
        END

        `
        let pool = await Conection.conection();
       
        const result = await pool.request()
        .query(query)
        for (var resultsubcomments of result.recordset) {
           let subcomments = new DTOSubComment(); 
            this.getInformationCommentImage(subcomments,resultsubcomments);
            array.push(subcomments);
         }
         pool.close();
         return array;
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

    static getInformationCommentImage(subcomment, result) {
      
        subcomment.idsubusercomment = result.idsubusercomment; 
        subcomment.textsubcomment = result.textsubcomment; 
        subcomment.likessubcomment = result.likessubcomment; 
        subcomment.datepublishsubcomment = result.datepublishsubcomment; 

        subcomment.idusercomment = result.idusercomment; 
        subcomment.textcomment = result.textcomment; 
        subcomment.likescomment = result.likescomment; 
        subcomment.datepublishcomment = result.datepublishcomment; 

        subcomment.idusercommentimg = result.idusercommentimg; 
        subcomment.iduserimages = result.iduserimages; 

        subcomment.idsubcommentuser = result.idsubcommentuser; 
        subcomment.namesubcommentuser = result.namesubcommentuser; 
        subcomment.nicksubcommentuser = result.nicksubcommentuser; 
        subcomment.usernamesubcommentuser = result.usernamesubcommentuser; 

        
        subcomment.idcommentuser = result.idcommentuser; 
        subcomment.namecommentuser = result.namecommentuser; 
        subcomment.nickcommentuser = result.nickcommentuser; 
        subcomment.usernamecommentuser = result.usernamecommentuser; 

        subcomment.withsubcomments = result.withsubcomments; 
       

        
  }
  
//#endregion
}
module.exports = { DataSubComment };