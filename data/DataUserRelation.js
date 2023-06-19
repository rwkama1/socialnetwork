

const { VarChar,Int ,Date} = require("mssql");
const { DTOUser } = require("../entity/DTOUser");
const { DTOUserRelation } = require("../entity/DTOUserRelation");
const { Conection } = require("./Connection");
const { DataUser } = require("./DataUser");


class DataUserRelation 
{
//#region CRUD

static  addUserRelation=async(dtousderelation)=>
{

    let resultquery=0;
    let queryinsert = `
  
	IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@IdUser and Active=1)
  BEGIN
  select -1 as notexistuser
  END
ELSE
BEGIN
  IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@IdFriend and Active=1)
  BEGIN
    select -2 as notexistfriend
  END
  ELSE
  BEGIN
    IF  EXISTS ( SELECT IdUser FROM UserrRelations WHERE IdUser=@IdUser
       and IdFriend=@IdFriend and UserrRelations.statee='Confirmed' )
    BEGIN
      select -3 as existduplicate
    END
    ELSE
    BEGIN
        IF  EXISTS ( SELECT IdUser FROM UserrRelations WHERE IdUser=@IdUser
              and IdFriend=@IdFriend and UserrRelations.statee='Pending' )
          BEGIN
            BEGIN TRANSACTION 
            update UserrRelations set Statee='Confirmed' where IdUser=@IdUser and IdFriend=@IdFriend
            update UserrRelations set Statee='Confirmed' where IdUser=@IdFriend and IdFriend=@IdUser
            select 2 as confirmfriend
            IF(@@ERROR > 0)  
            BEGIN  
                ROLLBACK TRANSACTION  
            END  
            ELSE  
            BEGIN  
              COMMIT TRANSACTION  
            END 
        
           END
      ELSE
      BEGIN
          BEGIN TRANSACTION  
          insert into UserrRelations values (@IdUser,@IdFriend,'Pending',@IdUser) 
          insert into UserrRelations values (@IdFriend,@IdUser,'Pending',@IdUser) 
          select 1 as insertsuccess
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

    `;

      let pool = await Conection.conection();
      const result = await pool.request()
        .input('IdUser', Int, dtousderelation.user.iduser)
        .input('IdFriend', Int,dtousderelation.friend.iduser)
        .query(queryinsert)
        resultquery = result.recordset[0].notexistuser;
        if(resultquery===undefined)
        {
         resultquery = result.recordset[0].notexistfriend;
          if (resultquery===undefined) {
                  resultquery = result.recordset[0].existduplicate;
                  if (resultquery===undefined) {
                    resultquery = result.recordset[0].confirmfriend;
                    if (resultquery===undefined) {
                      resultquery = result.recordset[0].insertsuccess;
                    }
            
                  }
          }
       }   
    pool.close();
    return resultquery;
    
}

static  deleteUserRelation=async(iduser,idfriend)=>
{
let resultquery;
    let query = `
    IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=${iduser} and Active=1)
    BEGIN
    select -1 as notexistuser
    END
	ELSE
	BEGIN 
		 IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=${idfriend} and Active=1)
		BEGIN
		select -2 as notexistfriend
		END
		ELSE
		BEGIN 
			IF  NOT EXISTS ( SELECT IdUser FROM UserrRelations WHERE IdUser=${iduser} and IdFriend=${idfriend})
			BEGIN
			select -3 as notexistduplicate
			END
			ELSE
			BEGIN		 
				BEGIN TRANSACTION 
				delete from UserrRelations where IdUser=${iduser} and IdFriend=${idfriend} 
				delete from UserrRelations where IdUser=${idfriend} and IdFriend=${iduser} 
				select 1 as deletedsuccess
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
    .query(query)
    resultquery = result.recordset[0].notexistuser;
    if(resultquery===undefined)
    {
     resultquery = result.recordset[0].notexistfriend;
      if (resultquery===undefined) {
              resultquery = result.recordset[0].notexistduplicate;
              if (resultquery===undefined) {
                resultquery = result.recordset[0].deletedsuccess;
              }
      }
   }   
    pool.close();
    return resultquery;
    
}
static  confirmFriend=async(iduser,idfriend)=>
{
let resultquery;
    let query = `

    IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@IdUser and Active=1)
    BEGIN
    select -1 as notexistuser
    END
    ELSE
    BEGIN
      IF NOT EXISTS ( SELECT IdUser FROM Userr WHERE IdUser=@IdFriend and Active=1)
      BEGIN
      select -2 as notexistfriend
      END
      ELSE
      BEGIN
        IF  NOT EXISTS ( SELECT IdUser FROM UserrRelations WHERE IdUser=@IdUser and IdFriend=@IdFriend)
        BEGIN
        select -3 as notexistduplicate
        END
        ELSE
        BEGIN
          BEGIN TRANSACTION 
          update UserrRelations set Statee='Confirmed' where IdUser=@IdUser and IdFriend=@IdFriend
          update UserrRelations set Statee='Confirmed' where IdUser=@IdFriend and IdFriend=@IdUser
          select 1 as updatesuccess
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
    .input('IdUser', Int, iduser)
    .input('IdFriend', Int,idfriend)
    .query(query)
    resultquery = result.recordset[0].notexistuser;
    if(resultquery===undefined)
    {
     resultquery = result.recordset[0].notexistfriend;
      if (resultquery===undefined) {
              resultquery = result.recordset[0].notexistduplicate;
              if (resultquery===undefined) {
                resultquery = result.recordset[0].updatesuccess;
              }
      }
   }   
    pool.close();
    return resultquery;
    
}

//#endregion
    //#region Exists
  static  ExistDuplicateUserFriend=async(iduser,idfriend)=>
  {

      let query = `
      SELECT 
      CASE WHEN EXISTS (
        SELECT 
        IdUser
        FROM 
          UserrRelations 
        WHERE 
          IdUser = ${iduser} 
          and IdFriend = ${idfriend}

      ) THEN CAST(1 as bit) ELSE CAST(0 AS BIT) END as Exist  
      `;
      let pool = await Conection.conection();
      const result = await pool.request()
    .query(query)
    let exist = result.recordset[0].Exist;
      pool.close();
      return exist;
      
  }

  // check if 2 users are friends and if the logged in user
  // is the one who sent the friend request

  static  Exist_ConfirmFriend_LoginUserSender=async(iduserlogin,idfriend)=>
  {
    let resultquery;
      let query = `

      declare @iduserlogin int =${iduserlogin};
      declare @idfriend int =${idfriend};

    	  IF  EXISTS (
          SELECT 
          IdUser
          FROM 
            UserrRelations 
          WHERE 
            IdUser =@iduserlogin 
            and IdFriend = @idfriend
            and statee='Confirmed'
           )
        BEGIN
          select 1 as confirmedfriend
        END
        ELSE
        BEGIN
          IF EXISTS (
              SELECT 
              IdUser
              FROM 
                UserrRelations 
              WHERE 
                idusersender = @iduserlogin 
                and IdFriend =@idfriend
                AND statee='Pending'
            )
            BEGIN
              select 2 as loginuserissender
            END
            ELSE
            BEGIN
               select 3 as nologinuserissender
            END
        END 
     
     
      `;
      let pool = await Conection.conection();
      const result = await pool.request()
    .query(query)
    resultquery = result.recordset[0].confirmedfriend;
    if(resultquery===undefined)
    {
     resultquery = result.recordset[0].loginuserissender;
      if (resultquery===undefined) {
          resultquery = result.recordset[0].nologinuserissender;            
      }
    }   
      pool.close();
      return resultquery;
      
  }

  static  Exist_UserRelation_by_UserSender=async(idusersender,idfriend)=>
  {

      let query = `

      declare @idusersender int =${idusersender};
      declare @idfriend int =${idfriend};
      SELECT 
      CASE WHEN EXISTS (
        SELECT 
        IdUser
        FROM 
          UserrRelations 
        WHERE 
          idusersender = @idusersender 
		      and IdFriend =@idfriend
      ) THEN CAST(1 as bit) ELSE CAST(0 AS BIT) END as Exist  

      `;
      let pool = await Conection.conection();
      const result = await pool.request()
    .query(query)
    let exist = result.recordset[0].Exist;
      pool.close();
      return exist;
      
  }
    //#endregion
    //#region GETS
    static getUserRelation=async(iduser,idfriend)=>
    {
           let resultquery;
            let querysearch=`
            IF NOT EXISTS (
                      select 
                      UserrRelations.IdFriend
                from 
                  UserrRelations 
                  inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
                where 
                  Userr.Active = 1 
                  and UserrRelations.IdUser = ${iduser} 
                  and UserrRelations.IdFriend = ${idfriend}
                
              )
            BEGIN
              select -1 as notexistuser
            END
            ELSE
            BEGIN
              SELECT  * FROM  UserrRelations WHERE IdUser = ${iduser} And IdFriend = ${idfriend}
            END
              `;
            let pool = await Conection.conection();
       
                const result = await pool.request()
                .query(querysearch)
                resultquery = result.recordset[0].notexistuser; 
                if (resultquery===undefined) {
                   let dtouserrelation = new DTOUserRelation();   
                   dtouserrelation.iduserrelation = result.recordset[0].IdUserRelation;
                   dtouserrelation.user.iduser = result.recordset[0].IdUser;
                   dtouserrelation.friend.iduser = result.recordset[0].IdFriend;
                   dtouserrelation.statee = result.recordset[0].Statee;
                   resultquery=dtouserrelation
                  }
                  pool.close();
                return resultquery;
      
     }
    
    static getAllFriendsbyUser=async(iduser)=>
    {
        let arrayuser=[];
            let querysearch=`
            select 
            Userr.* 
          from 
            UserrRelations 
            inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
          where 
            Userr.Active = 1 
            and UserrRelations.IdUser = ${iduser}
          
              `;
            let pool = await Conection.conection();
       
                const result = await pool.request()
                .query(querysearch)
                for (var recorduser of result.recordset) {
                    let user = new DTOUser();   
                  DataUser.getinformationList(user, recorduser);
                  arrayuser.push(user);
                 }
           pool.close();
           return arrayuser;
      
     }

    
      static getConfirmedFriendsbyUser=async(iduserlogin,iduser)=>
      {
          let arrayuser=[];
              let querysearch=`
        

    declare @iduserlogin int= ${iduserlogin};
    declare @iduser int =${iduser};

	    select 
              u.*,

              (select 
                Count(Userr.IdUser) as NumberFriend 
              from 
                UserrRelations 
                inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
              where 
                Userr.Active = 1 
                and UserrRelations.IdUser = u.IdUser
                and UserrRelations.Statee = 'Confirmed') as numberfriends,

              (SELECT 
                    CASE WHEN EXISTS (
                      SELECT 
                      IdUser
                      FROM 
                        UserrRelations 
                      WHERE 
                      UserrRelations.IdUser = @iduserlogin
                        and UserrRelations.IdFriend = u.IdUser
                        and UserrRelations.statee='Confirmed'
                        
                  ) THEN CAST(1 as bit) ELSE CAST(0 AS BIT) END) as existloginuserfriend  

            from 
              UserrRelations as ur
              inner join Userr as u on u.IdUser = ur.IdFriend 
            where 
            u.Active = 1 
              and ur.IdUser = @iduser 
              and ur.Statee = 'Confirmed' 
            order by 
            ur.IdUserRelation desc
            
                `;
              let pool = await Conection.conection();
         
                  const result = await pool.request()
                  .query(querysearch)
                  for (var recorduser of result.recordset) {
                      let user = new DTOUser();   
                    DataUser.getinformationList2(user, recorduser);
                    arrayuser.push(user);
                   }
             pool.close();
             return arrayuser;
        
       }
        //PROFILE USER
       static getConfirmedFriendsbyUserLoginUser=async(iduserlogin)=>
       {
           let arrayuser=[];
         
           let querysearch=`

          
            DECLARE @iduserlogin int = ${iduserlogin};

            SELECT 
              u.IdUser,
              u.Name,
              u.Imagee,
              u.Descriptionn,
              CASE WHEN lu.IdLoginUser IS NOT NULL THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS existloginuser
            FROM Userr u
            INNER JOIN UserrRelations ur ON u.IdUser = ur.IdFriend
            LEFT JOIN (
              SELECT IdUser, IdLoginUser, ROW_NUMBER() OVER (PARTITION BY IdUser ORDER BY IdLoginUser DESC) AS RowNum
              FROM LoginUser
            ) lu ON u.IdUser = lu.IdUser AND lu.RowNum = 1
            WHERE ur.IdUser = @iduserlogin
              AND ur.Statee = 'Confirmed'
            ORDER BY lu.IdLoginUser DESC

             
             
                 `;
              let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
            
                   for (var recorduser of result.recordset) {
                       let user = new DTOUser();   
                     DataUser.getinformationList2(user, recorduser);
                     arrayuser.push(user);
                    }
                 
    
              pool.close();
              return arrayuser;
         
        }
         //NOTIFICATIONS
        static getPendingFriendsbyUserLoginUser=async(iduserlogin)=>
        {
            let arrayuser=[];
                let querysearch=`
 
              declare @iduserlogin int=${iduserlogin}

                SELECT u.*
                FROM Userr u
                INNER JOIN UserrRelations ur ON u.IdUser = ur.IdFriend
                WHERE ur.IdUser = @iduserlogin
                AND ur.Statee = 'Pending'
                AND  u.Active = 1
                AND ur.IdUserSender != @iduserlogin 
               
              
                  `;
                let pool = await Conection.conection();
           
                    const result = await pool.request()
                  
                    .query(querysearch)
                    for (var recorduser of result.recordset) {
                        let user = new DTOUser();   
                      DataUser.getinformationList(user, recorduser);
                      arrayuser.push(user);
                     }
               pool.close();
               return arrayuser;
          
         }
        
      static getSentPendingUsersbyUser=async(iduser)=>
      {
          let arrayuser=[];
              let querysearch=`

              select 
              Userr.* 
            from 
              UserrRelations 
              inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
            where 
              Userr.Active = 1 
              and UserrRelations.IdUser = ${iduser} 
              and UserrRelations.Statee = 'Pending'
            
                `;
              let pool = await Conection.conection();
         
                  const result = await pool.request()
                  .query(querysearch)
                  for (var recorduser of result.recordset) {
                      let user = new DTOUser();   
                    DataUser.getinformationList(user, recorduser);
                    arrayuser.push(user);
                   }
             pool.close();
             return arrayuser;
        
       }
      
       //
       static getSearchNickFriendsbyUser=async(iduser,nick)=>
       {
           let arrayuser=[];
               let querysearch=`
               select 
               Userr.* 
             from 
               UserrRelations 
               inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
             where 
               Userr.Active = 1 
               and UserrRelations.IdUser = ${iduser} 
               and Userr.Nick like '%${nick}%' 
               and UserrRelations.Statee = 'Confirmed'
                
                 `;
               let pool = await Conection.conection();
          
                   const result = await pool.request()
                   .query(querysearch)
                   for (var recorduser of result.recordset) {
                       let user = new DTOUser();   
                     DataUser.getinformationList(user, recorduser);
                     arrayuser.push(user);
                    }
              pool.close();
              return arrayuser;
         
        }
        static getSearchNameFriendsbyUser=async(iduser,name)=>
        {
            let arrayuser=[];
                let querysearch=`
                select 
                Userr.* 
              from 
                UserrRelations 
                inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
              where 
                Userr.Active = 1 
                and UserrRelations.IdUser = ${iduser} 
                and Userr.Name like '%${name}%' 
                and UserrRelations.Statee = 'Confirmed'     
                  `;
                let pool = await Conection.conection();
           
                    const result = await pool.request()
                    .query(querysearch)
                    for (var recorduser of result.recordset) {
                        let user = new DTOUser();   
                      DataUser.getinformationList(user, recorduser);
                      arrayuser.push(user);
                     }
               pool.close();
               return arrayuser;
          
         }
         static getFriendsOfFriendsUser=async(iduser)=>//Friends of Friends
        {
            let arrayuser=[];
                let querysearch=`
                select 
                distinct u.* 
              from 
                UserrRelations as urel1 
                inner join UserrRelations as urel2 on urel1.IdFriend = urel2.IdUser 
                inner join Userr as u on u.IdUser = urel2.IdFriend 
              where 
                urel1.IdUser = ${iduser} 
                and urel1.Statee = 'Confirmed' 
                and u.Active = 1         
                  `;
                let pool = await Conection.conection();
           
                    const result = await pool.request()
                    .query(querysearch)
                    for (var recorduser of result.recordset) {
                        let user = new DTOUser();   
                      DataUser.getinformationList(user, recorduser);
                      arrayuser.push(user);
                     }
               pool.close();
               return arrayuser;
          
         }

     static getFriendsOfFriendsNotFriendUser=async(iduser)=>//Friends of Friends, not user friends
        {
            let arrayuser=[];
                let querysearch=`          
                select 
                distinct u.* 
              from 
                UserrRelations as urel1 
                inner join UserrRelations as urel2 on urel1.IdFriend = urel2.IdUser 
                inner join Userr as u on u.IdUser = urel2.IdFriend 
              where 
                urel2.IdFriend not in (
                  select 
                    UserrRelations.IdFriend 
                  from 
                    UserrRelations 
                    inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
                  where 
                    Userr.Active = 1 
                    and UserrRelations.IdUser = ${iduser} 
                    and UserrRelations.Statee = 'Confirmed'
                ) 
                and urel1.IdUser = ${iduser} 
                and urel1.Statee = 'Confirmed' 
                and u.Active = 1
              
                  `;
                let pool = await Conection.conection();
           
                    const result = await pool.request()
                    .query(querysearch)
                    for (var recorduser of result.recordset) {
                        let user = new DTOUser();   
                      DataUser.getinformationList(user, recorduser);
                      arrayuser.push(user);
                     }
               pool.close();
               return arrayuser;
          
         }
      static getMutualFriendsByUsers=async(iduser1login,iduser2)=>//Mutual Friends
         {
             let arrayuser=[];
                 let querysearch=`          
                 SELECT 
                 u.* 
               FROM 
                 UserrRelations as urel1 
                 INNER JOIN UserrRelations as urel2 ON urel2.IdFriend = urel1.IdFriend 
                 and urel2.IdUser = ${iduser1login} 
                 and urel2.IdFriend != ${iduser2} 
                 INNER JOIN Userr as u on u.IdUser = urel2.IdFriend 
               WHERE 
                 urel1.IdUser = ${iduser2} 
                 and urel2.IdFriend != ${iduser1login} 
                 and urel1.Statee = 'Confirmed' 
                 and urel2.Statee = 'Confirmed'
               

                   `;
                 let pool = await Conection.conection();
            
                     const result = await pool.request()
                     .query(querysearch)
                     for (var recorduser of result.recordset) {
                         let user = new DTOUser();   
                       DataUser.getinformationList(user, recorduser);
                       arrayuser.push(user);
                      }
                pool.close();
                return arrayuser;
           
          }
       

    //#endregion
    //#region  Others

 static  NumberOfFriends=async(iduser)=>
{

        let query = `
        select 
        Count(Userr.IdUser) as NumberFriend 
      from 
        UserrRelations 
        inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
      where 
        Userr.Active = 1 
        and UserrRelations.IdUser = ${iduser} 
        and UserrRelations.Statee = 'Confirmed'
        `;
    let pool = await Conection.conection();
    const result = await pool.request()
   .query(query)
   let numberfriend = result.recordset[0].NumberFriend;
    pool.close();
    return numberfriend;
    
}
static  NumberMutualFriends=async(iduser1login,iduser2)=>
{

        let query = `
        SELECT 
        count(*) as NumberMutualFriends 
      FROM 
        UserrRelations as urel1 --Mutual Friends
        INNER JOIN UserrRelations as urel2 ON urel2.IdFriend = urel1.IdFriend 
        and urel2.IdUser = ${iduser1login} 
        and urel2.IdFriend != ${iduser2} 
      WHERE 
        urel1.IdUser = ${iduser2} 
        and urel2.IdFriend != ${iduser1login} 
        and urel1.Statee = 'Confirmed' 
        and urel2.Statee = 'Confirmed'
        `;
    let pool = await Conection.conection();
    const result = await pool.request()
   .query(query)
   let numbermutualfriend = result.recordset[0].NumberMutualFriends;
    pool.close();
    return numbermutualfriend;
    
}
    //#endregion
  
}
module.exports = { DataUserRelation };