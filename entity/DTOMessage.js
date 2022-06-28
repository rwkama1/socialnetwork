const { DTOUser } = require("./DTOUser");

class DTOMessage 

{
  
    IdUserMessages=0;

	UserReceived=new DTOUser();

	UserSender=new DTOUser();

	Textt="";
	DateeTime=new Date();
	Seen=false;
	Answered=false;



     constructor()
     {
          
     }
}
module.exports = { DTOMessage };