

const { VarChar,Int ,Date} = require("mssql");
const { DTOUser } = require("../entity/DTOUser");

const { Conection } = require("./Connection");
const { DataUser } = require("./DataUser");


class DataFollowers 
{


static  addFollower=async(iduserlogin,iduserfollowed)=>
{

    let resultquery=0;
    let queryinsert = `
  
	IF NOT EXISTS ( SELECT iduser FROM Userr WHERE IdUser=@IdUserLogin and Active=1)
  BEGIN
  select -1 as notexistuser
  END
ELSE
BEGIN
  IF NOT EXISTS ( SELECT iduser FROM Userr WHERE IdUser=@IdUserFollowed and Active=1)
  BEGIN
    select -2 as noexistfollower
  END
  ELSE
  BEGIN
    IF  EXISTS ( SELECT IdFollow FROM Followers WHERE IdFollowerUser=@IdUserLogin
         and 
        IdFollowedUser=@IdUserFollowed)
    BEGIN
      select -3 as existduplicate
    END
    ELSE
    BEGIN
     
      insert into Followers values (@IdUserLogin,@IdUserFollowed) 
      
      select 1 as insertsuccess
     
    END 
  END
  END

    `;

      let pool = await Conection.conection();
      const result = await pool.request()
        .input('IdUserLogin', Int, iduserlogin)
        .input('IdUserFollowed', Int,iduserfollowed)
        .query(queryinsert)
        resultquery = result.recordset[0].notexistuser;
        if(resultquery===undefined)
        {
         resultquery = result.recordset[0].noexistfollower;
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

static unFollow=async(iduserlogin,iduserfollowed)=>
{
let resultquery;
    let query = `
    IF NOT EXISTS ( SELECT IdFollow FROM Followers 
        WHERE IdFollowerUser=@IdUserLogin and 
         IdFollowedUser=@IdUserFollowed)
    BEGIN
    select -1 as notexistfollow
    END
	ELSE
	BEGIN 
		delete from Followers where IdFollowerUser=@IdUserLogin
         and IdFollowedUser=@IdUserFollowed
		
		select 1 as deletedsuccess

	END 

    `
    let pool = await Conection.conection();
  
    const result = await pool.request()
    .input('IdUserLogin', Int, iduserlogin)
    .input('IdUserFollowed', Int,iduserfollowed)
    .query(query)
    resultquery = result.recordset[0].notexistfollow;
    if(resultquery===undefined)
    {
     resultquery = result.recordset[0].deletedsuccess;
    
   }   
    pool.close();
    return resultquery;
    
}

    //#region Exists

    static existFollow=async(iduserfollower,iduserfollowed)=>
    {
       
         let querysearch=`
   
         SELECT
         CASE WHEN EXISTS (
             SELECT 1 FROM Followers
             WHERE idfolloweduser = @IdUserFollowed  AND
              idfolloweruser = @IdUserFollower
         ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS Exist

         `;
            let pool = await Conection.conection();   
           const result = await pool.request()
           .input('IdUserFollower', Int, iduserfollower)
           .input('IdUserFollowed', Int, iduserfollowed)
           .query(querysearch)
           let exist = result.recordset[0].Exist;
           pool.close();
           return exist;
        
    
     }

    //#endregion
    
    //#region GETS

   
    static getFollowersByUser=async(iduser)=>
    {
        let arrayuser=[];
            let querysearch=`

            declare @iduser int=${iduser}

              SELECT u.*,   
                (SELECT COUNT(*) FROM Followers 
                WHERE IdFollowedUser = u.IdUser) 
                AS numberfollowers
              FROM Followers f
              INNER JOIN Userr u ON u.IdUser = f.IdFollowerUser
              WHERE f.IdFollowedUser = @iduser
          
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


    //#endregion
    //#region  Others

    static  NumberOfFollowers=async(iduser)=>
{

        let query = `
        SELECT COUNT(*) AS num_followers
        FROM Followers
        WHERE IdFollowedUser = @IdUser
        `;
    let pool = await Conection.conection();
    const result = await pool.request()
    .input('IdUser', Int, iduser)
   .query(query)
   let numberfollowers = result.recordset[0].num_followers;
    pool.close();
    return numberfollowers;
    
}

    //#endregion
  
}
module.exports = { DataFollowers };