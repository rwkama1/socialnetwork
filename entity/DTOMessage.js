

class DTOMessage 

{
  
	idusermessages=0;
  idroom=0;
	title="";
	textt="";
	dateetime=new Date();
	seen=false;
	answered=false;

	 //User Login

     iduserlogin=0;
     nameuserlogin="";
    
     imageuserlogin="";

     //User2

     iduser2=0;
     nameuser2="";
     imageuser2="";


   

     constructor()
     {
          
     }
}
module.exports = { DTOMessage };