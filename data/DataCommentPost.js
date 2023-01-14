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

    static existCommentPost=async(iduser,idpost)=>
        {
           
             let querysearch=`
       
             IF NOT EXISTS ( 
                SELECT IdUserComment FROM UserrCommentsPost 
                WHERE IdUserComment = @IdUser AND IdPost = @IdPost
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
      
    static getsCommentsPost=async(idpost)=>
    {
      
            let arraycomment=[];
            let querysearch=
              `                   
            SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,

			UserrCommentsPost.idusercommentpost,
		    UserrCommentsPost.idpost,

			Userr.iduser as idcommentuser,
            Userr.name as namecommentuser,
            Userr.nick as nickcommentuser,
            Userr.userrname as usernamecommentuser,
            Userr.imagee as imagecommentuser
            FROM 
            UserrComments
            inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
			inner join  UserPost on UserPost.idpost=UserrCommentsPost.idusercommentpost
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			UserPost.Active = 1
			AND Userr.Active=1
            AND UserrCommentsPost.idpost=${idpost} 

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
    
    
    
    }
    //#endregion
}
module.exports = { DataCommentPost };