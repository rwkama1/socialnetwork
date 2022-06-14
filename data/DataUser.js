const { Conection } = require("./Connection");

const { VarChar,Int ,Date} = require("mssql");
const { DTOUser } = require("../entity/DTOUser");
class DataUser {
//#region CRUD
 static  registerUser=async(dtuser)=>
{
    let resultquery=0;
    let queryinsert = `
    IF EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
    BEGIN
    select -1 as existusername
    END
    else
    begin
        insert into Userr values (@Name,@Nick,@UserrName,@Passwordd,@Hashh,@BirthDate,getutcdate(),1,@Email,'','','','','','','','',@Country,'','','','','','','Public')
        select 1 insertsuccess
    end
    `
    let pool = await Conection.conection();
    const result = await pool.request()
        .input('Name', VarChar, dtuser.name)
        .input('Nick', VarChar, dtuser.nick)
        .input('UserrName', VarChar, dtuser.userrname)
        .input('Passwordd', VarChar, dtuser.password)
        .input('Hashh', VarChar, dtuser.hash)
        .input('BirthDate', Date, dtuser.datebirth)
        .input('Email', VarChar, dtuser.email)
        .input('Country', VarChar, dtuser.country)
        .query(queryinsert)
        resultquery = result.recordset[0].existusername;
         if(resultquery===undefined)
         {
            resultquery = result.recordset[0].insertsuccess;
         }
        pool.close();
    return resultquery;
    
}
 static  deleteUser=async(iduser)=>
    {
        let resultquery=0;
        let deletequery = `
        IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser = @IdUser and Active=1 )
        BEGIN
        select -1 as notexistuser  
        END
        else
        begin
        update Userr set Active=0 where IdUser=@IdUser
        select 1 as deleteusersuccess
        end

        `
        let pool = await Conection.conection();
 
        const result = await pool.request()    
        .input('IdUser', Int, iduser)
        .query(deletequery)
        resultquery = result.recordset[0].notexistuser;
        if(resultquery===undefined)
        {
           resultquery = result.recordset[0].deleteusersuccess;
        }
        pool.close();
        return resultquery;
        
    }
     static updateUser=async(dtuser)=>
    {
    let resultquery=0;
        let queryupdate = `
    IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser = @IdUser and Active=1 )
    BEGIN
    select -1 as notexistuser  
    END
    ELSE
    BEGIN
    UPDATE Userr  SET 
        Name = @Name, 
        Nick = @Nick, 
        BirthDate = @BirthDate, 
        Email = @Email, 
        Addresss = @Addresss, 
        Occupation = @Occupation, 
        MartailStatus = @MartailStatus, 
        WebSite = @WebSite, 
        Gender = @Gender, 
        UrlFacebook = @UrlFacebook, 
        UrlInstagram = @UrlInstagram, 
        UrlLinkedin = @UrlLinkedin, 
        UrlTwitter = @UrlTwitter, 
        City = @City, 
        Province = @Province, 
        Descriptionn = @Descriptionn, 
        Country = @Country 
      WHERE 
        IdUser = @IdUser
        SELECT 1 as updatesuccess
     END 
      `
        let pool = await Conection.conection();
   
        const result = await pool.request()
          
            .input('Name', VarChar, dtuser.name)
            .input('Nick', VarChar, dtuser.nick)
            .input('BirthDate', Date, dtuser.datebirth)
            .input('Email', VarChar, dtuser.email)
            .input('Addresss', VarChar, dtuser.address)
            .input('Occupation', VarChar, dtuser.ocupattion)
            .input('MartailStatus', VarChar, dtuser.martialstatus)
            .input('WebSite', VarChar, dtuser.website)
            .input('Gender', VarChar, dtuser.gender)
            .input('UrlFacebook', VarChar, dtuser.urlfacebook)
            .input('UrlInstagram', VarChar, dtuser.urlinstagram)
            .input('UrlLinkedin', VarChar, dtuser.urllinkedin)
            .input('UrlTwitter', VarChar, dtuser.urltwitter)
            .input('City', VarChar, dtuser.city)
            .input('Province', VarChar, dtuser.province)
            .input('Descriptionn', VarChar, dtuser.description)
            .input('Country', VarChar, dtuser.country)
            .input('IdUser', Int, dtuser.iduser)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistuser;
            if(resultquery===undefined)
            {
               resultquery = result.recordset[0].updatesuccess;
            }
        pool.close();
        return resultquery;
      
        
    }
     static updateUserNamePassword=async(username,password,hash,iduser)=>
    {
  
        let resultquery=0;
        let queryupdate = `
        IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser = @IdUser and Active=1 )
        BEGIN
        select -1 as notexistuser  
        END
        IF EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
        BEGIN
        select -2 as existusername
        END
        ELSE
        BEGIN
        Update Userr Set UserrName=@UserrName,Passwordd=@Passwordd,Hashh=@Hashh where IdUser=@IdUser
        select 1 as updatesuccess
        END
        `;
   
    
        //  where IDCard=@IDCard";
        let pool = await Conection.conection();
    //   let sqltools=Conection.sqlserver();
        const result = await pool.request()        
            .input('UserrName', VarChar, username)
            .input('Passwordd', VarChar, password)
            .input('Hashh', VarChar, hash)
            .input('IdUser', Int, iduser)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistuser;
            if(resultquery===undefined)
            {
            resultquery = result.recordset[0].existusername;
                if (resultquery===undefined) {
                    resultquery = result.recordset[0].updatesuccess;
                }
            
            }
        pool.close();
        return resultquery;
      
        
    }
     static updateStateUser=async(state,username)=>
    {  
        let resultquery=0;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
        BEGIN
        select -1 as notexistusername
        END
        ELSE
        BEGIN
        Update Userr Set Statee=@Statee where UserrName=@UserrName
        select 1 as updatesuccess
        END
        `
        //  where IDCard=@IDCard";
        let pool = await Conection.conection();
    //   let sqltools=Conection.sqlserver();
        const result = await pool.request()    
            .input('Statee', VarChar, state)
            .input('UserrName', VarChar, username)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistusername;
            if (resultquery===undefined) {
                resultquery = result.recordset[0].updatesuccess;
            }
        pool.close();
        return resultquery;    
        
    }
     static updateVisibilityUser=async(visibility,username)=>
    {  
        let resultquery=0;
        let queryupdate =`
        IF NOT EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
        BEGIN
        select -1 as notexistusername
        END
        ELSE
        BEGIN
        Update Userr Set Visibility=@Visibility where UserrName=@UserrName
        select 1 as updatesuccess
        END
        `
    
        let pool = await Conection.conection();
 
        const result = await pool.request()    
            .input('Visibility', VarChar, visibility)
            .input('UserrName', VarChar, username)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistusername;
            if (resultquery===undefined) {
                resultquery = result.recordset[0].updatesuccess;
            }
          pool.close();
        return resultquery;    
        
    }
     static insertProfilePicture=async(imagee,username)=>
    {  
        let resultquery=0;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
        BEGIN
        select -1 as notexistusername
        END
        ELSE
        BEGIN
        Update Userr Set Imagee=@Imagee where UserrName=@UserrName
        select 1 as updatesuccess
        END
        `
 
        let pool = await Conection.conection();

        const result = await pool.request()    
            .input('Imagee', VarChar, imagee)
            .input('UserrName', VarChar, username)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistusername;
            if (resultquery===undefined) {
                resultquery = result.recordset[0].updatesuccess;
            }
        pool.close();
        return resultquery;    
        
    }
     static deleteProfilePicture=async(username)=>
    {  
        let resultquery=0;
        let queryupdate = `
        IF NOT EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
        BEGIN
        select -1 as notexistusername
        END
        ELSE
        BEGIN
        Update Userr Set Imagee='' where UserrName=@UserrName
        select 1 as deleteprofilesuccess
        END
        `
     
        let pool = await Conection.conection();
        const result = await pool.request()    
            .input('UserrName', VarChar, username)
            .query(queryupdate)
            resultquery = result.recordset[0].notexistusername;
            if (resultquery===undefined) {
                resultquery = result.recordset[0].deleteprofilesuccess;
            }
        pool.close();
        return resultquery;    
        
    }
  
      //#region Exists

    static existUserById=async(iduser)=>
   {
      
        let querysearch=`	SELECT 
        CASE WHEN EXISTS (
        SELECT *
        FROM Userr
        WHERE IdUser = ${iduser} and Active=1 )
     THEN CAST( 1 as bit)
     ELSE CAST(0 AS BIT) END as Exist
        `;
           let pool = await Conection.conection();   
               const result = await pool.request()
               .query(querysearch)
        let exist = result.recordset[0].Exist;
          pool.close();
          return exist;
       
  
    }
     static existUserByUserName=async(username)=>
    {
      
         let querysearch=`
         SELECT 
         CASE WHEN EXISTS (
         SELECT *
         FROM Userr
         WHERE UserrName =@UserrName and Active=1 )
     THEN CAST( 1 as bit)
     ELSE CAST(0 AS BIT) END as Exist     
         `;
            let pool = await Conection.conection();   
                const result = await pool.request()
                .input('UserrName', VarChar, username)
                .query(querysearch)
         let exist = result.recordset[0].Exist;
           pool.close();
           return exist;
      
   
     }

//#endregion
//#region GETS
 static getUser=async(iduser)=>
{
    let resultquery=0;
        let querysearch = `
        IF NOT EXISTS (SELECT *FROM Userr WHERE IdUser = @IdUser and Active=1 )
        BEGIN
        select -1 as notexistuser  
        END
        ELSE
        BEGIN
        select * from Userr where IdUser=@iduser and Active=1
        END
        `

        let pool = await Conection.conection();
   
            const result = await pool.request()
            .input('IdUser', Int, iduser)
            .query(querysearch)
        resultquery = result.recordset[0].notexistuser; 
        if (resultquery===undefined) {
       let userr = new DTOUser();
       DataUser.getinformation(userr, result);
       resultquery=userr
        }
       pool.close();
       return resultquery;
  

 }
  
 static getUserbyUserName=async(username)=>
{
    
       let resultquery=0;
        let querysearch = `
        IF NOT EXISTS ( SELECT * FROM Userr WHERE UserrName =@UserrName and Active=1)
        BEGIN
        select -1 as notexistusername
        END
        ELSE
        BEGIN
        select * from Userr where UserrName=@UserrName and Active=1
        END
        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('UserrName', VarChar, username)
         .query(querysearch)
        resultquery = result.recordset[0].notexistusername; 
        if (resultquery===undefined) {
            let userr = new DTOUser();
            DataUser.getinformation(userr, result);
            resultquery=userr
        }  
     
       pool.close();
       return resultquery;
 }
  static getUserbyEmail=async(email)=>
 {
    let resultquery=0;
         let querysearch = `
         IF NOT EXISTS (  select * from Userr where Email=@Email and Active=1)
         BEGIN
         select -1 as notexistemailuser
         END
         ELSE
         BEGIN
         select * from Userr where Email=@Email and Active=1
         END
         `
         let pool = await Conection.conection();
    
             const result = await pool.request()
             .input('Email', VarChar, email)
             .query(querysearch)
        resultquery = result.recordset[0].notexistemailuser; 
             if (resultquery===undefined) {
                 let userr = new DTOUser();
                 DataUser.getinformation(userr, result);
                 resultquery=userr
             }  
        
        pool.close();
        return resultquery;
 
  }
  //*********************************** */
   static getUsers=async()=>
  {
     
          let arrayuser=[];
          let querysearch = "select * from Userr where Active=1 order by iduser desc"
          let pool = await Conection.conection();
     
              const result = await pool.request()
              .query(querysearch)
          for (var u of result.recordset) {
             let userr = new DTOUser();   
             DataUser.getinformationList(userr,u);
             arrayuser.push(userr);
          }  
         pool.close();
         return arrayuser;
     

      
   }
 static getUsersSearchs=async(name="",nick="",userrname="",email="",website="",
ocupation="",city="",country="")=>
   {
     
           let arrayuser=[];
           let querysearch=`
           SELECT 
           * 
         FROM 
           Userr 
         WHERE 
           Name LIKE '%${name}%' 
           AND Nick LIKE '%${nick}%' 
           AND UserrName LIKE '%${userrname}%' 
           AND Email LIKE '%${email}%' 
           AND WebSite LIKE '%${website}%' 
           AND Occupation LIKE '%${ocupation}%' 
           AND City LIKE '%${city}%' 
           AND Country LIKE '%${country}%' 
           AND Active = 1 
         order by 
           iduser desc         
                  `;
           let pool = await Conection.conection();
      
               const result = await pool.request()
               .query(querysearch)
           for (var u of result.recordset) {
              let userr = new DTOUser();   
              DataUser.getinformationList(userr,u);
              arrayuser.push(userr);
           }  
          pool.close();
          return arrayuser;  
    }
     
static getUsersbyBirthDate=async(datebirth1="1700-01-01",datebirth2="2200-01-01"
    )=>
        {
          
                let arrayuser=[];
                let querysearch=`SELECT *
                FROM Userr
                WHERE  BirthDate between '${datebirth1}' and '${datebirth2}'
                       AND Active=1 order by BirthDate desc`;
                let pool = await Conection.conection();
           
                    const result = await pool.request()
                    .query(querysearch)
                for (var u of result.recordset) {
                   let userr = new DTOUser();   
                   DataUser.getinformationList(userr,u);
                   arrayuser.push(userr);
                }  
               pool.close();
               return arrayuser;
           
     
            
         }
      static getUsersbyDateEntry=async(datebirth1="1700-01-01",datebirth2="2200-01-01"
    )=>
        {
           
                let arrayuser=[];
                let querysearch=`
                SELECT 
                * 
              FROM 
                Userr 
              WHERE 
                DateEntry between '${datebirth1}' 
                and '${datebirth2}' 
                AND Active = 1 
              order by 
                DateEntry desc
                       `;
                let pool = await Conection.conection();
           
                    const result = await pool.request()
                    .query(querysearch)
                for (var u of result.recordset) {
                   let userr = new DTOUser();   
                   DataUser.getinformationList(userr,u);
                   arrayuser.push(userr);
                }  
               pool.close();
               return arrayuser;
           
     
            
         }
  

//#endregion
//#region Getinformation
 static getinformation(userr, result) {
    userr.iduser = result.recordset[0].IdUser;
    userr.name = result.recordset[0].Name;
    userr.nick = result.recordset[0].Nick;
    userr.userrname = result.recordset[0].UserrName;
    userr.password = result.recordset[0].Passwordd;
    userr.hash = result.recordset[0].Hashh;
    userr.datebirth = result.recordset[0].BirthDate;
    userr.active = result.recordset[0].Active;
    userr.email = result.recordset[0].Email;
    userr.address = result.recordset[0].Addresss;
    userr.ocupattion = result.recordset[0].Occupation;
    userr.martialstatus = result.recordset[0].MartailStatus;
    userr.website = result.recordset[0].WebSite;
    userr.gender = result.recordset[0].Gender;
    userr.city = result.recordset[0].City;
    userr.province = result.recordset[0].Province;
    userr.description = result.recordset[0].Descriptionn;
    userr.country = result.recordset[0].Country;
    userr.statee = result.recordset[0].Statee;
    userr.image = result.recordset[0].Imagee;
    userr.visibility= result.recordset[0].Visibility;
    userr.urlfacebook= result.recordset[0].UrlFacebook;
    userr.urlinstagram= result.recordset[0].UrlInstagram;
    userr.urllinkedin= result.recordset[0].UrlLinkedin;
    userr.urltwitter= result.recordset[0].UrlTwitter;
    userr.dateentry= result.recordset[0].DateEntry;
}
 static getinformationList(userr,u) {

   userr.iduser = u.IdUser;
   userr.name = u.Name;
   userr.nick = u.Nick;
   userr.userrname = u.UserrName;
   userr.password = u.Passwordd;
   userr.hash = u.Hashh;
   userr.datebirth = u.BirthDate;
   userr.active = u.Active;
   userr.email = u.Email;
   userr.address = u.Addresss;
   userr.ocupattion = u.Occupation;
   userr.martialstatus = u.MartailStatus;
   userr.website = u.WebSite;
   userr.gender = u.Gender;
   userr.city = u.City;
   userr.province = u.Province;
   userr.description = u.Descriptionn;
   userr.country = u.Country;
   userr.statee = u.Statee;
   userr.image = u.Imagee;
   userr.visibility = u.Visibility;
   userr.urlfacebook= u.UrlFacebook;
   userr.urlinstagram= u.UrlInstagram;
   userr.urllinkedin= u.UrlLinkedin;
   userr.urltwitter= u.UrlTwitter;
   userr.dateentry= u.DateEntry;
}
//#endregion
}
module.exports = { DataUser };