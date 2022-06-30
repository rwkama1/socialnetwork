

class DTOMessage 

{
  
	idusermessages=0;
	title="";
	textt="";
	dateetime=new Date();
	seen=false;
	answered=false;

	 //User Received

     iduserreceived=0;
     namereceived="";
     nickreceived="";
     userrnamereceived="";
     imageereceived="";

     //User Sender

     idusersender=0;
     namesender="";
     nicksender="";
     userrnamesender="";
     imageesender="";

     constructor()
     {
          
     }
}
module.exports = { DTOMessage };