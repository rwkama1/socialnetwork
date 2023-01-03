const { DataUser } = require("../data/DataUser");
const { DataLoginUser } = require("../data/DataLoginUser");

const { HashPassword } = require("./hashPassword");

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
       
       
        let loginuser = await DataLoginUser.loginUser(username,password)
        if (loginuser===-1)
            {
                    throw new Error("User is already logged in");
             }
             if (loginuser===-2)
            {
                    throw new Error("Incorrect username and/or password");
             }
       this.userlogin=loginuser;
      
       return this.userlogin;
    }
    
     static  getuserlogin()
    {
        if(this.userlogin!=null)
        {
            return this.userlogin;
             
        }
        else
        {
            throw new Error("There is no User logged in");
        }
    }
     static async logoutUser()
    {
        if(this.userlogin!=null)
        {
            let logout=await DataLoginUser.logout(this.userlogin.iduser);
            if(logout===-1)
            {
                throw new Error("There is no User logged in")
            }
            this.userlogin=null;
            return true;
            
        }
        else
        {
            return false;
        }
    }
    //#endregion

}
module.exports = { LoginUser };

    