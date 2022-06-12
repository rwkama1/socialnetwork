

const { VarChar,Int ,Date} = require("mssql");
const { DTOUser } = require("../entity/DTOUser");
const { Conection } = require("./Connection");
const { DataUser } = require("./DataUser");


class DataUserRelation 
{
//#region CRUD
// static  addUserRelation=async(dtousderelation)=>
// {

//     let queryinsert = `insert into UserrRelations values 
//     (@IdUser,@IdFriend,'Pending')`

//     let pool = await Conection.conection();

//     const result = await pool.request()
//         .input('IdUser', Int, dtousderelation.user.iduser)
//         .input('IdFriend', Int,dtousderelation.friend.iduser)
//         .query(queryinsert)
//     pool.close();
//     return true;
    
// }
static  addUserRelation=async(dtousderelation)=>
{

    let resultquery=0;
    let queryinsert = `
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdUser and Active=1)
    BEGIN
    select -1 as notexistuser
    END
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdFriend and Active=1)
    BEGIN
    select -2 as notexistfriend
    END
    IF  EXISTS ( SELECT * FROM UserrRelations WHERE IdUser=@IdUser and IdFriend=@IdFriend)
    BEGIN
    select -3 as existduplicate
    END
    ELSE
    BEGIN
    BEGIN TRANSACTION  
    insert into UserrRelations values (@IdUser,@IdFriend,'Pending') 
    insert into UserrRelations values (@IdFriend,@IdUser,'Pending') 
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
                    resultquery = result.recordset[0].insertsuccess;
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
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=${iduser} and Active=1)
    BEGIN
    select -1 as notexistuser
    END
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=${idfriend} and Active=1)
    BEGIN
    select -2 as notexistfriend
    END
    IF  NOT EXISTS ( SELECT * FROM UserrRelations WHERE IdUser=${iduser} and IdFriend=${idfriend})
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

    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdUser and Active=1)
    BEGIN
    select -1 as notexistuser
    END
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdFriend and Active=1)
    BEGIN
    select -2 as notexistfriend
    END
    IF  NOT EXISTS ( SELECT * FROM UserrRelations WHERE IdUser=@IdUser and IdFriend=@IdFriend)
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

static  blockFriend=async(iduser,idfriend)=>
{
  let resultquery;
    let query = `
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=${iduser} and Active=1)
    BEGIN
    select -1 as notexistuser
    END
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=${idfriend} and Active=1)
    BEGIN
    select -2 as notexistfriend
    END
    IF  NOT EXISTS ( SELECT * FROM UserrRelations WHERE IdUser=${iduser} and IdFriend=${idfriend})
    BEGIN
    select -3 as notexistduplicate
    END
    ELSE
    BEGIN
   BEGIN TRANSACTION 
    update UserrRelations set Statee='Blocked' where IdUser=${iduser} and IdFriend=${idfriend}
    update UserrRelations set Statee='Blocked' where IdUser=${idfriend} and IdFriend=${iduser}
    select 1 as blockedsuccess
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
        .query(query)
       resultquery = result.recordset[0].notexistuser;
        if(resultquery===undefined)
        {
         resultquery = result.recordset[0].notexistfriend;
          if (resultquery===undefined) {
                  resultquery = result.recordset[0].notexistduplicate;
                  if (resultquery===undefined) {
                    resultquery = result.recordset[0].blockedsuccess;
                  }
          }
       }   
    pool.close();
    return resultquery;
    
}

    //#region Exists
static  ExistDuplicateUserFriend=async(iduser,idfriend)=>
{

    let query = `
    SELECT 
    CASE WHEN EXISTS (
      SELECT 
        * 
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
    //#endregion
    //#region GETS
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
     
      static getConfirmedFriendsbyUser=async(iduser)=>
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
              and UserrRelations.Statee = 'Confirmed' 
            order by 
              UserrRelations.IdUserRelation desc
            
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
          
      static getPendingFriendsbyUser=async(iduser)=>
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
    //#region GetInformation
  
    //#endregion
}
module.exports = { DataUserRelation };