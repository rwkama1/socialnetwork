
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DTONotification } = require("../entity/DTONotification");

class DataNotification {


  static deleteNotiCommentsByUser=async(iduser)=>
    {
        let resultquery;
        let querydelete = 
        `
        IF NOT EXISTS (SELECT IdUser FROM Userr
           WHERE IdUser=@iduser and Active=1)
        BEGIN
             select -1 as notexistuser  
        END
        ELSE
        BEGIN
            BEGIN TRANSACTION  


            DELETE FROM NotificationCommentImage
            WHERE IdUserReceived=@iduser

            DELETE FROM NotificationCommentPost
             WHERE IdUserReceived=@iduser

            DELETE FROM NotificationCommentVideo 
            WHERE IdUserReceived=@iduser

            DELETE FROM NotificationSubComment WHERE
            IdUserReceived=@iduser       

            select 1 deletenotifications

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
       .input('iduser', Int,iduser)
       .query(querydelete)
       resultquery = result.recordset[0].notexistuser;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].deletenotifications;
       }
        pool.close();
        return resultquery;
        
    }

    static deleteNotiMessagesByUser=async(iduser)=>
    {
        let resultquery;
        let querydelete = 
        `
        IF NOT EXISTS (SELECT IdUser FROM Userr
           WHERE IdUser=@iduser and Active=1)
        BEGIN
             select -1 as notexistuser  
        END
        ELSE
        BEGIN
            DELETE FROM NotificationMessage
            WHERE IdUserReceived=@iduser

            select 1 deletenotifications
         END   
    
        `
        let pool = await Conection.conection();
        const result = await pool.request()
       .input('iduser', Int,iduser)
       .query(querydelete)
       resultquery = result.recordset[0].notexistuser;
       if(resultquery===undefined)
       {
         resultquery = result.recordset[0].deletenotifications;
       }
        pool.close();
        return resultquery;
        
    }



     //#region  GETS

     static getNotificationCommentsByUser=async(iduserlogin,IdUser)=>
     {
         
         let arrayn=[];
         let querysearch=
         `        
       
         declare @iduserlogin int = ${iduserlogin};

        SELECT 
        nsc.IdNotiSubComment as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender,  
        COALESCE(up.IdPost, ui.IdUserImages, uv.IdUserVideos) as IdImagePostVideo, 
        COALESCE(up.Title, ui.Title, uv.Title) as TitleImagePostVideo, 
        CASE 
            WHEN up.IdPost IS NOT NULL THEN 'P' 
            WHEN ui.IdUserImages IS NOT NULL THEN 'I' 
            WHEN uv.IdUserVideos IS NOT NULL THEN 'V' 
            ELSE 'Not Found'
        END as Typee,
        nsc.DateeTime

        FROM 
        NotificationSubComment nsc 
        JOIN Userr u ON nsc.IdUserSender = u.IdUser 
        JOIN UserrComments uc ON nsc.IdUserComment = uc.IdUserComment 
        LEFT JOIN UserrCommentsPost ucp ON uc.IdUserComment = ucp.IdUserComment
        LEFT JOIN UserPost up ON ucp.IdPost = up.IdPost
        LEFT JOIN UserrCommentsImage uci ON uc.IdUserComment = uci.IdUserComment
        LEFT JOIN UserImages ui ON uci.IdUserImages = ui.IdUserImages
        LEFT JOIN UserrCommentsVideo ucv ON uc.IdUserComment = ucv.IdUserComment
        LEFT JOIN UserVideos uv ON ucv.IdUserVideos = uv.IdUserVideos
        WHERE 
        nsc.IdUserReceived = @IdUser 
        AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
          WHERE IdUserBlocker = @iduserlogin 
          AND IdUserBlocked = u.IdUser)

        UNION 

        SELECT 
        nci.IdNotiCoImage as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender,  
        ui.IdUserImages as IdImagePostVideo, 
        ui.title as TitleImagePostVideo, 
        'I' as Typee,
        nci.DateeTime 
        FROM 
        NotificationCommentImage nci 
        JOIN Userr u ON nci.IdUserSender = u.IdUser 
        JOIN UserImages ui ON nci.IdUserImages = ui.IdUserImages 
        WHERE 
        nci.IdUserReceived = @IdUser
        AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
          WHERE IdUserBlocker = @iduserlogin 
          AND IdUserBlocked = u.IdUser)

        UNION 

        SELECT 
        ncp.IdNotiCoPost as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender,
        up.IdPost as IdImagePostVideo, 
        up.title as TitleImagePostVideo, 
        'P' as Typee, 
        ncp.DateeTime
        FROM 
        NotificationCommentPost ncp 
        JOIN Userr u ON ncp.IdUserSender = u.IdUser 
        JOIN UserPost up ON ncp.IdPost = up.IdPost 
        WHERE 
        ncp.IdUserReceived = @IdUser 
    AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
          WHERE IdUserBlocker = @iduserlogin 
          AND IdUserBlocked = u.IdUser)

      UNION 

      SELECT 
        ncv.IdNotiCoVideo as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender, 
        uv.IdUserVideos as IdImagePostVideo, 
        uv.title as TitleImagePostVideo, 
        'V' as Typee, 
        ncv.DateeTime
      FROM 
        NotificationCommentVideo ncv 
        JOIN Userr u ON ncv.IdUserSender = u.IdUser 
        JOIN UserVideos uv ON ncv.IdUserVideos = uv.IdUserVideos 
      WHERE 
        ncv.IdUserReceived = @IdUser 
         AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
          WHERE IdUserBlocker = @iduserlogin 
          AND IdUserBlocked = u.IdUser)
      ORDER BY 
        DateeTime DESC


         `;
  
       let pool = await Conection.conection();
       const result = await pool.request()
         .input('IdUser', Int,IdUser)
         .query(querysearch)
       for (var re of result.recordset) {
         let notification = new DTONotification();   
         this.getInformationNotiComments(notification,re);
         arrayn.push(notification);
      }
      pool.close();
      return arrayn;
     }
 
 
     static getNotificationMessagesByUser=async(iduserlogin,IdUser)=>
    {
        
        let arrayn=[];
        let querysearch=
        `

      declare @iduserlogin int = ${iduserlogin}

        SELECT 
        NM.IdNotiUser as IdNotification, 
        U1.IdUser as IdUserSender,
        U1.Name as NameSender , 
        U1.Imagee as ImageSender , 
        UM.Textt AS LastMessage,
        UM.DateeTime AS LastMessageDate
        
       FROM 
       userr U1 
       JOIN (
         SELECT 
           IdUserReceived, 
           IdUserSender,
           MAX(DateeTime) as max_date
         FROM 
           NotificationMessage 
         GROUP BY 
           IdUserReceived,
           IdUserSender
       ) T ON T.IdUserSender = U1.iduser
       JOIN NotificationMessage NM ON NM.IdUserReceived = T.IdUserReceived 
       AND NM.IdUserSender = T.IdUserSender
       AND NM.DateeTime = T.max_date
       JOIN UserrMessage UM ON UM.IdUserMessages = NM.IdUserMessages
     WHERE 
       NM.IdUserReceived = @iduser
       AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
        WHERE IdUserBlocker = @iduserlogin 
        AND IdUserBlocked = U1.IdUser)
      
     ORDER BY NM.DateeTime desc
 
 
        `;
 
      let pool = await Conection.conection();
      const result = await pool.request()
        .input('IdUser', Int,IdUser)
      .query(querysearch)
      for (var re of result.recordset) {
        let notification = new DTONotification();   
        this.getInformationNotiMessage(notification,re);
        arrayn.push(notification);
     }
     pool.close();
     return arrayn;
    }
     //#endregion
//#endregion GETINFORMATON

     static getInformationNotiComments(notification,result)
     {
      notification.IdNotification = result.IdNotification;
      notification.IdUserSender = result.IdUserSender;
      notification.NameSender = result.NameSender;
      notification.ImageSender = result.ImageSender;
      notification.IdImagePostVideo = result.IdImagePostVideo;
      notification.TitleImagePostVideo = result.TitleImagePostVideo;
      notification.Typee = result.Typee;
      notification.DateeTime = result.DateeTime;
      
     }
   
     static getInformationNotiMessage(notification,result)
     {
      notification.IdNotification = result.IdNotification;
      notification.IdUserSender = result.IdUserSender;
      notification.NameSender = result.NameSender;
      notification.ImageSender = result.ImageSender;
      notification.Message = result.LastMessage;
      notification.DateeTime = result.LastMessageDate;
    
      
     }
   

//#endregion
}

module.exports = { DataNotification };