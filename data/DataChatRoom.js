
const { VarChar,Int ,Date} = require("mssql");
const { DTOChatRoom } = require("../entity/DTOChatRoom");

const { Conection } = require("./Connection");


class DataChatRoom
{
    static addChatRoom=async(iduserreceived,idusersender)=>
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
                IF  EXISTS (SELECT IdUserReceived FROM ChatRoom WHERE 
                    IdUserReceived=@iduserreceived and IdUserSender=@idusersender  )
                BEGIN
                    select -3 as existchatroom 
                END
                ELSE
                BEGIN
                    BEGIN TRANSACTION  

                    insert into ChatRoom values
                    (@iduserreceived,@idusersender)

                    
                    insert into ChatRoom values
                    (@idusersender,@iduserreceived)

                   
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
             .query(queryinsert)
            resultquery = result.recordset[0].notexistuserreceived;
            if(resultquery===undefined)
            {
              resultquery = result.recordset[0].notexistusersender;
              if(resultquery===undefined)
              {                  
                  resultquery = result.recordset[0].existchatroom;
                  if(resultquery===undefined)
                  {                  
                      resultquery = result.recordset[0].insertsuccess;
    
                  }

              }
            }
        pool.close();
        return resultquery;
        
    }
 
    static deleteChatRoom=async(iduserreceived,idusersender)=>
    {
        let resultquery;
        let queryupdate = 
        `
        
        IF NOT EXISTS (SELECT IdUserSender FROM ChatRoom WHERE
            IdUserSender=@idusersender and IdUserReceived=@iduserreceived)
         BEGIN
           select -1 as notexistchatroom 
         END
         ELSE
         BEGIN
            BEGIN TRANSACTION  

             DELETE FROM ChatRoom WHERE IdUserSender=@idusersender and IdUserReceived=@iduserreceived
             
             DELETE FROM ChatRoom WHERE IdUserSender=@iduserreceived and IdUserReceived=@idusersender 

             select 1 deletechatroom

             IF(@@ERROR > 0)  
             BEGIN  
                 ROLLBACK TRANSACTION  
             END  
             ELSE  
             BEGIN  
             COMMIT TRANSACTION  
             END
         END
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduserreceived', Int,iduserreceived)
       .input('idusersender', Int, idusersender) 
      
       .query(queryupdate)
       resultquery = result.recordset[0].notexistchatroom;
       if(resultquery===undefined)
       {
            resultquery = result.recordset[0].deletechatroom;
        
       }
        pool.close();
        return resultquery;
        
    }

    //#region GETS

    static getChatRoomsByUser=async(iduser)=>
    {
        
        let array=[];
       let querysearch2=`

       SELECT 
       CR.IdRoom, 
       U1.IdUser as iduser1,
       U1.Name as nameuser1 , 
       U1.Imagee as imageuser1 , 
       U2.IdUser as iduser2,
       U2.Name as nameuser2 , 
       U2.Imagee as imageuser2 , 
       M.IdUserMessages,
       M.Textt AS LastMessage, 
       M.DateeTime AS LastMessageDate
      FROM 
       userr U1 
       JOIN chatroom CR ON CR.idusersender = U1.iduser 
       OR CR.iduserreceived = U1.iduser 
       JOIN userr U2 ON U2.iduser = CR.idusersender 
       OR U2.iduser = CR.iduserreceived 
       AND U2.iduser != U1.iduser 
       JOIN (
         SELECT 
           idroom, 
           Max(dateetime) AS max_date 
         FROM 
           userrmessage 
         GROUP BY 
           idroom
       ) T ON T.idroom = CR.idroom 
       JOIN userrmessage M ON M.idroom = T.idroom 
       AND M.dateetime = T.max_date 
     WHERE 
       U1.iduser = @iduser
    ORDER BY M.DateeTime desc
     
       `
     
      let pool = await Conection.conection();
      const result = await pool.request()
      .input('iduser', Int,iduser)
      .query(querysearch2)
      for (var r of result.recordset) {
        let chatroom = new DTOChatRoom(); 
       this.getinformationList(chatroom,r);
         array.push(chatroom);
      }
         
     pool.close();
     return array;
    }

    



    //#endregion
    //#region GETINFORMATION

    static  getinformationList(chatroom, result) {
  
        chatroom.idchatroom = result.IdRoom;

        chatroom.iduser1=result.iduser1;
        chatroom.nameuser1=result.nameuser1;
        chatroom.profileimage1=result.imageuser1;

        chatroom.iduser2=result.iduser2;
        chatroom.nameuser2=result.nameuser2;
        chatroom.profileimage2=result.imageuser2;

        chatroom.idmessage=result.IdUserMessages;
        chatroom.textmessage=result.LastMessage;
        chatroom.datetimemessage=result.LastMessageDate;

    
    }

    //#endregion
}

module.exports = { DataChatRoom };