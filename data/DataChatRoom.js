
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
       
        let querysearch=
        `
        SELECT 
        c.IdRoom, 
        u1.IdUser,
        u1.Name , 
        u1.Imagee , 
        um.IdUserMessages,
        MAX(um.Textt) AS LastMessage, 
        MAX(um.DateeTime) AS LastMessageDate
        
        FROM ChatRoom c
        JOIN Userr u1 ON (c.IdUserReceived = u1.IdUser OR c.IdUserSender = u1.IdUser)
        JOIN UserrMessage um ON c.IdRoom = um.IdRoom
        
        WHERE (c.IdUserReceived = @iduser OR c.IdUserSender = @iduser) 
        AND u1.IdUser!= @iduser
    
        GROUP BY c.IdRoom,
        u1.IdUser,
        u1.Name, 
        u1.Imagee,
        um.IdUserMessages
    
        ORDER BY MAX(um.DateeTime) DESC
        `;
 
      let pool = await Conection.conection();
      const result = await pool.request()
      .input('iduser', Int,iduser)
      .query(querysearch)
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
        chatroom.iduser1=result.IdUser;
        chatroom.nameuser1=result.Name;
        chatroom.profileimage1=result.Imagee;
        chatroom.idmessage=result.IdUserMessages;
        chatroom.textmessage=result.LastMessage;
        chatroom.datetimemessage=result.LastMessageDate;

    
    }

    //#endregion
}

module.exports = { DataChatRoom };