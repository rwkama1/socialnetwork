
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DTOMessage } = require("../entity/DTOMessage");

class DataMessage {

    //#region CRUD

    static addMessage=async(iduserreceived,idusersender,title,text)=>
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
                INSERT INTO UserrMessage values (@iduserreceived,@idusersender,@title,@text,getutcdate(),0,0)
                select 1 insertsuccess
            END
        END   
        `
             let pool = await Conection.conection();
             const result = await pool.request()
             .input('iduserreceived', Int,iduserreceived)
             .input('idusersender', Int,idusersender)
             .input('title', VarChar,title)
             .input('text', VarChar, text)  
             .query(queryinsert)
            resultquery = result.recordset[0].notexistuserreceived;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistusersender;
              if(resultquery===undefined)
              {
                resultquery = result.recordset[0].insertsuccess;
               
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
    static markallMessagesasreadbyUser=async(iduserlogin)=>
    {
        let resultquery;
        let queryupdate = 
        `
        IF NOT EXISTS (SELECT IdUser FROM Userr WHERE IdUser=@iduserlogin and Active=1 )
        BEGIN
             select -1 as notexistuserreceived  
        END
        ELSE
        BEGIN
            UPDATE UserrMessage SET seen=1 WHERE IdUser=@iduserlogin
            select 1 updatemessage      
        END
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduserlogin', Int,iduserlogin)
       .query(queryupdate)
       resultquery = result.recordset[0].notexistuserreceived;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].updatemessage;
         
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

    static getMessageMarkRead=async(idmessage)=>
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

				UPDATE UserrMessage set seen=1 where idusermessages=${idmessage}
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

  

//********************************************** */

    static getMessagesByUserReceived=async(iduserlogin)=>
    {
        
        let array=[];
        let querysearch=
        `
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
        Userreceived.iduser=${iduserlogin}

        ORDER BY dateetime desc
        `;
 
      let pool = await Conection.conection();
      const result = await pool.request()
      .query(querysearch)
      for (var recordsetresult of result.recordset) {
             let message = new DTOMessage(); 
            this.getInformation(message, recordsetresult);
            array.push(message);
           }
     pool.close();
     return array;
    }

    static getSearchNameMessagesByUserReceived=async(iduserlogin,name="")=>
    {
        
        let array=[];
        let querysearch=
        `
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
        Usersender.name LIKE '%${name}%' and
        Userreceived.iduser=${iduserlogin}
        ORDER BY dateetime desc
        `;
 
      let pool = await Conection.conection();
      const result = await pool.request()
      .query(querysearch)
      for (var recordsetresult of result.recordset) {
             let message = new DTOMessage(); 
            this.getInformation(message, recordsetresult);
            array.push(message);
           }
     pool.close();
     return array;
    }

    static getMessagesByUserSender=async(iduserlogin)=>
    {
        
        let array=[];
        let querysearch=
        `
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
        Usersender.iduser=${iduserlogin}
        `;
 
      let pool = await Conection.conection();
      const result = await pool.request()
      .query(querysearch)
      for (var recordsetresult of result.recordset) {
        let message = new DTOMessage(); 
       this.getInformation(message, recordsetresult);
       array.push(message);
      }
     pool.close();
     return array;
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