const { DTOSubComment } = require("../entity/DTOSubComment");
const { Conection } = require("./Connection");
const { VarChar,Int } = require("mssql");


class DataSubComment {
    //#region CRUD

    static addSubComment=async(iduser,idcomment,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrComments WHERE idusercomment=@idusercomment)
        BEGIN
            select -1 as notexistcomment
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
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
    static updateSubCommentText=async(idsubcomment,idcomment,iduser,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrComments WHERE idusercomment=@idusercomment)
            BEGIN
                select -1 as notexistcomment
            END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT iduser FROM Userr WHERE iduser=@iduser)
            BEGIN
                select -2 as notexistuser
            END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT idsubusercomment FROM UserrSubComments WHERE  idsubusercomment=@idsubusercomment)
                BEGIN
                    select -3 as notexistsubcomment
                END 
                ELSE
                BEGIN
                    UPDATE UserrSubComments set Textt=@text  where idsubusercomment=@idsubusercomment
                    select 1 as commentupdated   
                END
            END
          
        END
     
        `
             let pool = await Conection.conection();
             const result = await pool.request()
            .input('idusercomment', Int,idcomment)
            .input('iduser', Int, iduser)
            .input('idsubusercomment', Int, idsubcomment)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcomment;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistuser;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].notexistsubcomment;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].commentupdated;
              
                    }
                }
               
            }
        pool.close();
        return resultquery;
        
    }
    static deleteSubComment=async(iduser,idsubcomment)=>
    {
        let resultquery;
        let queryupdate = 
        `
            IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@iduser and Active=1)
                BEGIN
                select -1 as notexistuser
                END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT idsubusercomment FROM UserrSubComments WHERE  idsubusercomment=@idsubusercomment)
                BEGIN
                    select -2 as notexistsubcomment
                END 
                ELSE
                BEGIN
                    DELETE  FROM  UserrSubComments where IdUser=@iduser and idsubusercomment=@idsubusercomment
                    select 1 as deletesubcomment               
                END 
            END
      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduser', Int,iduser)
       .input('idsubusercomment', Int, idsubcomment) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistuser;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistsubcomment;
         if(resultquery===undefined)
         {
            resultquery = result.recordset[0].deletesubcomment;
         }
       }
        pool.close();
        return resultquery;
        
    }

    //#endregion
    //#region GETS 
 
    static getSubCommentsByUserComment=async(idcomment,iduser)=>//get subcomments according to user comment
    {
       let array=[];
       let query=
          `
          SELECT
          UserrComments.idusercomment,
          UserrComments.textt as textcomment,
          UserrComments.likes as likescomment,
          UserrComments.datepublish as datepublishcomment,
  
          UserrSubComments.idsubusercomment as idsubusercomment  ,
          UserrSubComments.likes as likessubcomment,
          UserrSubComments.textt as textsubcomment,
          UserrSubComments.datepublish as datepublishsubcomment,
  
          Usersubcomment.iduser as idsubcommentuser,
          Usersubcomment.name as namesubcommentuser,
          Usersubcomment.nick as nicksubcommentuser,
          Usersubcomment.userrname as usernamesubcommentuser,
          Usersubcomment.imagee as imagesubcommentuser,
  
          Usercomment.iduser as idcommentuser,
          Usercomment.name as namecommentuser,
          Usercomment.nick as nickcommentuser,
          Usercomment.userrname as usernamecommentuser,
          Usercomment.imagee as imagecommentuser
          FROM 
          UserrComments
          inner join  UserrSubComments on UserrComments.idusercomment=UserrSubComments.idusercomment
          inner join Userr as Usercomment on Usercomment.iduser=UserrComments.iduser
          inner join Userr as Usersubcomment on Usersubcomment.iduser=UserrSubComments.iduser
          WHERE 
          Usercomment.Active=1
          AND Usersubcomment.Active=1
          AND UserrComments.idusercomment=${idcomment}
          AND Usercomment.iduser=${iduser}

          `
       let pool = await Conection.conection();
      
       const result = await pool.request()
       .query(query)
       for (var resultsubcomments of result.recordset) {
          let subcomments = new DTOSubComment(); 
           this.getInformationSubComment(subcomments,resultsubcomments);
           array.push(subcomments);
        }
        pool.close();
        return array;
    }


    //***************************************************************** */
    
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
        '' as imagesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        Userr.imagee as imagecommentuser,

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
        Usersubcomment.imagee as imagesubcommentuser,

        Usercomment.iduser as idcommentuser,
        Usercomment.name as namecommentuser,
        Usercomment.nick as nickcommentuser,
        Usercomment.userrname as usernamecommentuser,
        Usercomment.imagee as imagecommentuser,

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
        '' as imagesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        Userr.imagee as imagecommentuser,

      0 as withsubcomments
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
     static getIfExistsSubComentsOfCommentsPost=async(idpost)=>
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
                inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
                inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
                inner join  UserrSubComments on UserrSubComments.idusercomment=UserrComments.idusercomment
                inner join Userr on Userr.iduser=UserrComments.iduser
                WHERE 
                UserPost.Active = 1
                AND Userr.Active=1
                AND UserrCommentsPost.idpost=${idpost}

            ) AS commentsubcomentpost

    )
    BEGIN --if there are no subcomments then list all comments without subcomments

        SELECT 	
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsPost.idusercommentpost,
        UserrCommentsPost.idpost,

        0 as idsubusercomment,
        0 as likessubcomment,
        '' as textsubcomment,
        0 as datepublishsubcomment,

        0 as idsubcommentuser,
        '' as namesubcommentuser,
        '' as nicksubcommentuser,
        '' as usernamesubcommentuser,
        '' as imagesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        Userr.imagee as imagecommentuser,

        0 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
        inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
        inner join Userr  on Userr.iduser=UserrComments.iduser
          WHERE 
        UserPost.Active = 1
        AND Userr.Active=1
        AND UserrCommentsPost.idpost=${idpost}
    END  
    ELSE 
    BEGIN --if there are subcomments then query all comments with subcomments
        
        SELECT
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsPost.idusercommentpost,
        UserrCommentsPost.idpost,

        UserrSubComments.idsubusercomment as idsubusercomment  ,
        UserrSubComments.likes as likessubcomment,
        UserrSubComments.textt as textsubcomment,
        UserrSubComments.datepublish as datepublishsubcomment,

        Usersubcomment.iduser as idsubcommentuser,
        Usersubcomment.name as namesubcommentuser,
        Usersubcomment.nick as nicksubcommentuser,
        Usersubcomment.userrname as usernamesubcommentuser,
        Usersubcomment.imagee as imagesubcommentuser,

        Usercomment.iduser as idcommentuser,
        Usercomment.name as namecommentuser,
        Usercomment.nick as nickcommentuser,
        Usercomment.userrname as usernamecommentuser,
        Usercomment.imagee as imagecommentuser,
        1 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
        inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
        inner join  UserrSubComments on UserrComments.idusercomment=UserrSubComments.idusercomment
        inner join Userr as Usercomment on Usercomment.iduser=UserrComments.iduser
        inner join Userr as Usersubcomment on Usersubcomment.iduser=UserrSubComments.iduser
        WHERE 
        UserPost.Active = 1
        AND Usercomment.Active=1
        AND Usersubcomment.Active=1
        AND UserrCommentsPost.idpost=${idpost}

        union all

        SELECT 
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsPost.idusercommentpost,
        UserrCommentsPost.idpost,

        0 as idsubusercomment,
        0 as likessubcomment,
        '' as textsubcomment,
        0 as datepublishsubcomment,


        0 as idsubcommentuser,
        '' as namesubcommentuser,
        '' as nicksubcommentuser,
        '' as usernamesubcommentuser,
        '' as imagesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        Userr.imagee as imagecommentuser,
        0 as withsubcomments
        FROM 
         UserrComments
        inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
        inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
        inner join Userr  on Userr.iduser=UserrComments.iduser
        WHERE 
        UserPost.Active = 1
        AND Userr.Active=1
        AND UserrCommentsPost.idpost=${idpost}
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
            this.getInformationCommentPost(subcomments,resultsubcomments);
            array.push(subcomments);
         }
         pool.close();
         return array;
     }
     static getIfExistsSubComentsOfCommentsVideo=async(idvideo)=>
     {
        let array=[];
        let query=
        `
        IF NOT EXISTS (SELECT idusercomment  from --I check if the video has comments with subcomments
            (
                SELECT 
                UserrComments.idusercomment
                FROM 
                UserrComments
                inner join UserrCommentsVideo on UserrCommentsVideo.idusercomment = UserrComments.idusercomment
                inner join  UserVideos on UserVideos.iduservideos=UserrCommentsVideo.iduservideos
                inner join  UserrSubComments on UserrSubComments.idusercomment=UserrComments.idusercomment
                inner join Userr on Userr.iduser=UserrComments.iduser
                WHERE 
                UserVideos.Active = 1
                AND Userr.Active=1
                AND UserrCommentsVideo.iduservideos=${idvideo}

            ) AS commentsubcomentvideo

    )
    BEGIN --if there are no subcomments then list all comments without subcomments

        SELECT 	
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsVideo.idusercommentvideo,
        UserrCommentsVideo.iduservideos,

        0 as idsubusercomment,
        0 as likessubcomment,
        '' as textsubcomment,
        0 as datepublishsubcomment,

        0 as idsubcommentuser,
        '' as namesubcommentuser,
        '' as nicksubcommentuser,
        '' as usernamesubcommentuser,
        '' as imagesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        Userr.imagee as imagecommentuser,

        0 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsVideo on UserrCommentsVideo.idusercomment = UserrComments.idusercomment
        inner join  UserVideos on UserVideos.iduservideos=UserrCommentsVideo.iduservideos
        inner join Userr  on Userr.iduser=UserrComments.iduser
        WHERE 
        UserVideos.Active = 1
        AND Userr.Active=1
        AND UserrCommentsVideo.iduservideos=${idvideo}
    END  
    ELSE 
    BEGIN --if there are subcomments then query all comments with subcomments
        
        SELECT
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsVideo.idusercommentvideo,
        UserrCommentsVideo.iduservideos,

        UserrSubComments.idsubusercomment as idsubusercomment  ,
        UserrSubComments.likes as likessubcomment,
        UserrSubComments.textt as textsubcomment,
        UserrSubComments.datepublish as datepublishsubcomment,

        Usersubcomment.iduser as idsubcommentuser,
        Usersubcomment.name as namesubcommentuser,
        Usersubcomment.nick as nicksubcommentuser,
        Usersubcomment.userrname as usernamesubcommentuser,
        Usersubcomment.imagee as imagesubcommentuser,

        Usercomment.iduser as idcommentuser,
        Usercomment.name as namecommentuser,
        Usercomment.nick as nickcommentuser,
        Usercomment.userrname as usernamecommentuser,
        Usercomment.imagee as imagecommentuser,
        1 as withsubcomments
        FROM 
        UserrComments
        inner join UserrCommentsVideo on UserrCommentsVideo.idusercomment = UserrComments.idusercomment
        inner join  UserVideos on UserVideos.iduservideos=UserrCommentsVideo.iduservideos
        inner join  UserrSubComments on UserrComments.idusercomment=UserrSubComments.idusercomment
        inner join Userr as Usercomment on Usercomment.iduser=UserrComments.iduser
        inner join Userr as Usersubcomment on Usersubcomment.iduser=UserrSubComments.iduser
        WHERE 
        UserVideos.Active = 1
        AND Usercomment.Active=1
        AND Usersubcomment.Active=1
        AND UserrCommentsVideo.iduservideos=${idvideo}

        union all

        SELECT 
        UserrComments.idusercomment,
        UserrComments.textt as textcomment,
        UserrComments.likes as likescomment,
        UserrComments.datepublish as datepublishcomment,

        UserrCommentsVideo.idusercommentvideo,
        UserrCommentsVideo.iduservideos,

        0 as idsubusercomment,
        0 as likessubcomment,
        '' as textsubcomment,
        0 as datepublishsubcomment,


        0 as idsubcommentuser,
        '' as namesubcommentuser,
        '' as nicksubcommentuser,
        '' as usernamesubcommentuser,
        '' as imagesubcommentuser,

        Userr.iduser as idcommentuser,
        Userr.name as namecommentuser,
        Userr.nick as nickcommentuser,
        Userr.userrname as usernamecommentuser,
        Userr.imagee as imagecommentuser,
        0 as withsubcomments
        FROM 
         UserrComments
        inner join UserrCommentsVideo on UserrCommentsVideo.idusercomment = UserrComments.idusercomment
        inner join  UserVideos on UserVideos.iduservideos=UserrCommentsVideo.iduservideos
        inner join Userr  on Userr.iduser=UserrComments.iduser
        WHERE 
        UserVideos.Active = 1
        AND Userr.Active=1
        AND UserrCommentsVideo.iduservideos=${idvideo}
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
            this.getInformationCommentVideo(subcomments,resultsubcomments);
            array.push(subcomments);
         }
         pool.close();
         return array;
     }
    //#endregion
    //#region OTHERS

    static  NumberOfSubComments=async(idcomment)=>
    { 
            let query = 
            `
            SELECT 
            COUNT(*) as numbersubcomments
            FROM 
            UserrSubComments
            WHERE 
            UserrSubComments.idusercomment=${idcomment}
            `;
        let pool = await Conection.conection();
        const result = await pool.request()
       .query(query)
        let numbersubcomments = result.recordset[0].numbersubcomments;
        pool.close();
        return numbersubcomments;
        
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
        subcomment.imagesubcommentuser = result.imagesubcommentuser;  

        
        subcomment.idcommentuser = result.idcommentuser; 
        subcomment.namecommentuser = result.namecommentuser; 
        subcomment.nickcommentuser = result.nickcommentuser; 
        subcomment.usernamecommentuser = result.usernamecommentuser; 
        subcomment.imagecommentuser = result.imagecommentuser; 

        subcomment.withsubcomments = result.withsubcomments; 
       

        
    }
    static getInformationCommentPost(subcomment, result) {
      
        subcomment.idsubusercomment = result.idsubusercomment; 
        subcomment.textsubcomment = result.textsubcomment; 
        subcomment.likessubcomment = result.likessubcomment; 
        subcomment.datepublishsubcomment = result.datepublishsubcomment; 

        subcomment.idusercomment = result.idusercomment; 
        subcomment.textcomment = result.textcomment; 
        subcomment.likescomment = result.likescomment; 
        subcomment.datepublishcomment = result.datepublishcomment; 

        subcomment.idusercommentpost = result.idusercommentpost; 
        subcomment.idpost = result.idpost; 

        subcomment.idsubcommentuser = result.idsubcommentuser; 
        subcomment.namesubcommentuser = result.namesubcommentuser; 
        subcomment.nicksubcommentuser = result.nicksubcommentuser; 
        subcomment.usernamesubcommentuser = result.usernamesubcommentuser;
        subcomment.imagesubcommentuser = result.imagesubcommentuser;  

        
        subcomment.idcommentuser = result.idcommentuser; 
        subcomment.namecommentuser = result.namecommentuser; 
        subcomment.nickcommentuser = result.nickcommentuser; 
        subcomment.usernamecommentuser = result.usernamecommentuser; 
        subcomment.imagecommentuser = result.imagecommentuser; 

        subcomment.withsubcomments = result.withsubcomments; 
       

        
    }
    static getInformationCommentVideo(subcomment, result) {
      
        subcomment.idsubusercomment = result.idsubusercomment; 
        subcomment.textsubcomment = result.textsubcomment; 
        subcomment.likessubcomment = result.likessubcomment; 
        subcomment.datepublishsubcomment = result.datepublishsubcomment; 

        subcomment.idusercomment = result.idusercomment; 
        subcomment.textcomment = result.textcomment; 
        subcomment.likescomment = result.likescomment; 
        subcomment.datepublishcomment = result.datepublishcomment; 

        subcomment.idusercommentvideo = result.idusercommentvideo; 
        subcomment.iduservideos = result.iduservideos; 

        subcomment.idsubcommentuser = result.idsubcommentuser; 
        subcomment.namesubcommentuser = result.namesubcommentuser; 
        subcomment.nicksubcommentuser = result.nicksubcommentuser; 
        subcomment.usernamesubcommentuser = result.usernamesubcommentuser;
        subcomment.imagesubcommentuser = result.imagesubcommentuser;  

        
        subcomment.idcommentuser = result.idcommentuser; 
        subcomment.namecommentuser = result.namecommentuser; 
        subcomment.nickcommentuser = result.nickcommentuser; 
        subcomment.usernamecommentuser = result.usernamecommentuser; 
        subcomment.imagecommentuser = result.imagecommentuser; 

        subcomment.withsubcomments = result.withsubcomments; 
       

        
    }


    static getInformationSubComment(subcomment, result) {
      
        subcomment.idsubusercomment = result.idsubusercomment; 
        subcomment.textsubcomment = result.textsubcomment; 
        subcomment.likessubcomment = result.likessubcomment; 
        subcomment.datepublishsubcomment = result.datepublishsubcomment; 

        subcomment.idusercomment = result.idusercomment; 
        subcomment.textcomment = result.textcomment; 
        subcomment.likescomment = result.likescomment; 
        subcomment.datepublishcomment = result.datepublishcomment; 

   

        subcomment.idsubcommentuser = result.idsubcommentuser; 
        subcomment.namesubcommentuser = result.namesubcommentuser; 
        subcomment.nicksubcommentuser = result.nicksubcommentuser; 
        subcomment.usernamesubcommentuser = result.usernamesubcommentuser;
        subcomment.imagesubcommentuser = result.imagesubcommentuser;  

        
        subcomment.idcommentuser = result.idcommentuser; 
        subcomment.namecommentuser = result.namecommentuser; 
        subcomment.nickcommentuser = result.nickcommentuser; 
        subcomment.usernamecommentuser = result.usernamecommentuser; 
        subcomment.imagecommentuser = result.imagecommentuser; 

        subcomment.withsubcomments = result.withsubcomments; 
       

        
    }
  
//#endregion
}
module.exports = { DataSubComment };