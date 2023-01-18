
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DTOMessage } = require("../entity/DTOMessage");

class DataMessage {

    //#region CRUD

  
    static addMessage=async(iduserreceived,idusersender,text)=>
    {
       let resultquery;

        let queryinsert = 
        `
        IF NOT EXISTS (SELECT IdUser FROM Userr WHERE IdUser=@iduserreceived and Active=1)
        BEGIN
             select -1 as notexistuserreceived  
        END
        ELSE
        BEGIN
            IF NOT EXISTS (SELECT IdUser FROM Userr WHERE IdUser=@idusersender and Active=1)
            BEGIN
                select -2 as notexistusersender 
            END
            ELSE
            BEGIN
                IF NOT EXISTS (SELECT IdUserReceived FROM ChatRoom WHERE 
                 IdUserReceived=@iduserreceived and IdUserSender=@idusersender )
                BEGIN
                        select -3 as notexistchatroom 
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  

                    INSERT INTO UserrMessage values 
                    (@iduserreceived,@idusersender,
                    (SELECT IdRoom FROM ChatRoom WHERE 
                    IdUserReceived=@iduserreceived and IdUserSender=@idusersender),
                    '',@text,getutcdate(),0,0)
                    
                    DECLARE @lastIdMessage INT = SCOPE_IDENTITY()

                    insert into NotificationMessage values
                    (@iduserreceived,
                    @idusersender,@lastIdMessage,'',getutcdate(),0)

                    select 1 insertsuccess

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
             .input('iduserreceived', Int,iduserreceived)
             .input('idusersender', Int,idusersender)
             .input('text', VarChar, text)  
             .query(queryinsert)
            resultquery = result.recordset[0].notexistuserreceived;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistusersender;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].notexistchatroom; 
                if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].insertsuccess; 
                    }
              }
            }
        pool.close();
        return resultquery;
        
    }
    
    static deleteMessage=async(iduserreceived,idusersender,idmessage)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS (SELECT IdUser FROM Userr WHERE IdUser = @iduserreceived and Active=1 )
        BEGIN
             select -1 as notexistuserreceived  
        END
        ELSE
        BEGIN
            IF NOT EXISTS (SELECT IdUser FROM Userr WHERE IdUser=@idusersender and Active=1 )
            BEGIN
                select -2 as notexistusersender 
            END
            ELSE
            BEGIN
                IF NOT EXISTS (SELECT IdUserMessages  FROM UserrMessage WHERE IdUserMessages=@IdUserMessages and IdUser=@iduserreceived  
                    and IdSender=@idusersender  )
                BEGIN
                    select -3 as notexistmessage 
                END
                ELSE
                BEGIN
                    DELETE FROM UserrMessage WHERE IdUserMessages=@IdUserMessages
                    select 1 deletemessage
                END
              
            END
        END
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduserreceived', Int,iduserreceived)
       .input('idusersender', Int, idusersender) 
       .input('IdUserMessages', Int, idmessage) 
       .query(queryupdate)
       resultquery = result.recordset[0].notexistuserreceived;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].notexistusersender;
         if(resultquery===undefined)
         {
           resultquery = result.recordset[0].notexistmessage;
           if(resultquery===undefined)
           {
               resultquery = result.recordset[0].deletemessage;
            }
         }
       }
        pool.close();
        return resultquery;
        
    }
   
    //#endregion
    //#region  GETS

    static getMessage=async(idmessage)=>
    {
        
        let resultquery;
        let querysearch=
        `
        IF NOT EXISTS 
		(
				SELECT 
				Userreceived.iduser as iduserreceived,
				Userreceived.name as namereceived,
				Userreceived.nick as nickreceived,
				Userreceived.userrname as userrnamereceived,
				Userreceived.imagee as imageereceived,
  
				Usersender.iduser as idusersender,
				Usersender.name as namesender,
				Usersender.nick as nicksender,
				Usersender.userrname as userrnamesender,
				Usersender.imagee as imageesender,
  
				UserrMessage.idusermessages,
				UserrMessage.title,
				UserrMessage.textt,
				UserrMessage.dateetime,
				UserrMessage.seen,
				UserrMessage.answered
  
				FROM 
				Userr as Userreceived
				inner join UserrMessage on Userreceived.iduser = UserrMessage.iduser
				inner join Userr  as Usersender on UserrMessage.idsender = Usersender.iduser
				WHERE 
				Usersender.Active=1 and
				Userreceived.Active=1 and 
				UserrMessage.idusermessages=${idmessage}
		)
        BEGIN
             select -1 as notexistmessage  
        END
        ELSE
        BEGIN
				 SELECT 
				Userreceived.iduser as iduserreceived,
				Userreceived.name as namereceived,
				Userreceived.nick as nickreceived,
				Userreceived.userrname as userrnamereceived,
				Userreceived.imagee as imageereceived,
  
				Usersender.iduser as idusersender,
				Usersender.name as namesender,
				Usersender.nick as nicksender,
				Usersender.userrname as userrnamesender,
				Usersender.imagee as imageesender,
  
				UserrMessage.idusermessages,
				UserrMessage.title,
				UserrMessage.textt,
				UserrMessage.dateetime,
				UserrMessage.seen,
				UserrMessage.answered
  
				FROM 
				Userr as Userreceived
				inner join UserrMessage on Userreceived.iduser = UserrMessage.iduser
				inner join Userr  as Usersender on UserrMessage.idsender = Usersender.iduser
				WHERE 
				Usersender.Active=1 and
				Userreceived.Active=1 and 
				UserrMessage.idusermessages=${idmessage}
        END   
        `;
 
      let pool = await Conection.conection();
      const result = await pool.request()
      .query(querysearch)
      resultquery = result.recordset[0].notexistmessage; 
        if (resultquery===undefined) {
             let message = new DTOMessage(); 
            this.getInformation(message, result.recordset[0]);
            resultquery=message
           }
     pool.close();
     return resultquery;
    }


    //#endregion
 

    //#region  GetInformation

    static getInformation(message, result) {

        message.iduserreceived = result.iduserreceived; 
        message.namereceived = result.namereceived; 
        message.nickreceived = result.nickreceived; 
        message.userrnamereceived = result.userrnamereceived; 
        message.imageereceived = result.imageereceived;

        message.idusersender = result.idusersender; 
        message.namesender = result.namesender; 
        message.nicksender = result.nicksender; 
        message.userrnamesender = result.userrnamesender; 
        message.imageesender = result.imageesender; 

        message.idusermessages = result.idusermessages; 
        message.title = result.title; 
        message.textt = result.textt; 
        message.dateetime = result.dateetime; 
        message.seen = result.seen; 
        message.answered = result.answered; 
    }

    //#endregion
}
module.exports = { DataMessage };