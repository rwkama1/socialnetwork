const { DataUser } = require("../data/DataUser");
const { DataLoginUser } = require("../data/DataLoginUser");



 class LoginUser
{

    //#region Propieties
     static _userlogin = null;
     static get userlogin() {
         return LoginUser._userlogin;
     }
     static set userlogin(value) {
        LoginUser._userlogin = value;
     }
    
    
    //#endregion
  //#region Login
      static loginUser=async(username,password)=>
    {
       
       
        let loginuser = await DataLoginUser.loginUser(username,password);
        
       if (loginuser===-2)
            {
            throw new Error("Incorrect username and/or password");
             }
        else
        {

          
            return loginuser;
        }
    
      
       
    }
    
     static  async existLoginUser(iduser,username)
    {

          let existLoginUser = await DataLoginUser.existLoginUser
          (iduser,username);
            if(existLoginUser)
            {         
                return true;        
            }
            else
            {
                throw new Error("There is no User logged in");
            }
    }
     static async logoutUser(iduser)
    {
       
            let logout=await DataLoginUser.logout(iduser);
            if(logout===-1)
            {
                throw new Error("There is no User logged in");
            }
            
            return true;
            
       
    }
    //#endregion

}
module.exports = { LoginUser };

    