

class DTOMessage 

{
  
	idusermessages=0;
  idroom=0;
	title="";
	textt="";
	dateetime=new Date();
	seen=false;
	answered=false;

	 //USER SENDER

     idusersender=0;
     nameusersender="";
     imageusersender="";

  //USER RECEIVER

     iduserreceiver=0;
     nameuserreceiver="";
     imageuserreceiver="";


   

     constructor()
     {
          
     }
}
module.exports = { DTOMessage };