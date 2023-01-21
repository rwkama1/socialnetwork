
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");
const { DTONotification } = require("../entity/DTONotification");

class DataNotification {


     //#region  GETS

     static getNotificationCommentsByUser=async(IdUser)=>
     {
         
         let arrayn=[];
         let querysearch=
         `        
       
      
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
      ORDER BY 
        DateeTime DESC


         `;
  
       let pool = await Conection.conection();
       const result = await pool.request()
         .input('IdUser', Int,IdUser)
         .query(querysearch)
       for (var re of result.recordset) {
         let notification = new DTONotification();   
         this.getInformation(notification,re);
         arrayn.push(notification);
      }
      pool.close();
      return arrayn;
     }
 
 
     //#endregion
//#endregion GETINFORMATON

     static getInformation(notification,result)
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
   

//#endregion
}

module.exports = { DataNotification };