const { DTOCommentImage } = require("../entity/DTOCommentImage");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DataUser } = require("./DataUser");

class DataCommentImage {
    //#region CRUD

    static CommentImage=async(iduser,idimage,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT IdUserImages FROM UserImages WHERE iduserimages=@iduserimages and Active=1)
        BEGIN
            select -1 as notexistimage
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
                        insert into UserrCommentsImage values (@@identity,@iduserimages)
                        select 1 as commentimageadded
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
            .input('iduserimages', Int, idimage)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistimage;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistuser;
              if(resultquery===undefined)
              {
                    resultquery = result.recordset[0].commentimageadded;
              }
            }
        pool.close();
        return resultquery;
        
    }
    static UpdateTextCommentImage=async(iduser,idcomment,idimage,text)=>
    {
       let resultquery;
        let queryinsert = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrCommentsImage WHERE idusercomment=@idusercomment 
            and iduserimages=@iduserimages)
        BEGIN
            select -1 as notexistcommentimage
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT iduserimages FROM UserImages WHERE iduserimages=@iduserimages and Active=1)
            BEGIN
                select -2 as notexistimage
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
            .input('iduserimages', Int, idimage)
            .input('text', VarChar, text)  
            .query(queryinsert)
            resultquery = result.recordset[0].notexistcommentimage;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistimage;
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
    static deleteCommentImage=async(iduser,idcomment,idimage)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS ( SELECT idusercomment FROM UserrCommentsImage WHERE idusercomment=@idcomment and iduserimages=@idimage)
        BEGIN
            select -1 as notexistcommentimage
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT iduserimages FROM UserImages WHERE iduserimages=@idimage and Active=1)
            BEGIN
                select -2 as notexistimage
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
                            delete from UserrCommentsImage where idusercomment=@idcomment
                            delete from UserrComments where idusercomment=@idcomment and iduser=@iduser
                            select 1 as commentimagedeleted
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
       .input('idimage', Int, idimage) 
       .input('iduser', Int, iduser) 
       .query(queryupdate)
         resultquery = result.recordset[0].notexistcommentimage;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistimage;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].notexistuser;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].notexistcomment;
                        if(resultquery===undefined)
                        {
                            resultquery = result.recordset[0].commentimagedeleted;
                        }
                      
                    }
                   
                }
            }
        pool.close();
        return resultquery;
        
    }

    //#endregion
    //#region  GETS
      
    static getsCommentsImage=async(idimage)=>
    {
      
            let arraycomment=[];
              let querysearch=
              `             
            SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,

			UserrCommentsImage.idusercommentimg,
		    UserrCommentsImage.iduserimages,

            Userr.iduser as idcommentuser,
            Userr.name as namecommentuser,
            Userr.nick as nickcommentuser,
            Userr.userrname as usernamecommentuser,
            Userr.imagee as imagecommentuser

            FROM 

            UserrComments

            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
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
                   let commentimg = new DTOCommentImage(); 
                    this.getinformationListImageComment(commentimg,resultcommentimg);
                    arraycomment.push(commentimg);
                 }
           pool.close();
           return arraycomment;
       
     }
    //#endregion
    //#region OTHERS

    static  NumberOfCommentImage=async(idimage)=>
    {
    
            let query = `

            SELECT 
            COUNT(*) as numbercomment
            FROM 
            UserrComments
            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
            WHERE 
            UserImages.Active = 1
            AND UserrCommentsImage.iduserimages=${idimage}

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
    static getinformationListImageComment(imagecomment, result) {
      
        imagecomment.IdUserComment = result.idusercomment; 
        imagecomment.Textt = result.textcomment; 
        imagecomment.Likes = result.likescomment; 
        imagecomment.datepublishcomment = result.datepublishcomment; 

        imagecomment.IdUserCommentImg = result.idusercommentimg; 
        imagecomment.iduserimages = result.iduserimages; 
    
        imagecomment.idcommentuser = result.idcommentuser; 
        imagecomment.namecommentuser = result.namecommentuser; 
        imagecomment.nickcommentuser = result.nickcommentuser; 
        imagecomment.usernamecommentuser = result.usernamecommentuser; 
        imagecomment.imagecommentuser = result.imagecommentuser;
    
    
    }
    //#endregion
}
module.exports = { DataCommentImage };