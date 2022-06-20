const { DTOUser } = require("./DTOUser");

class DTOComment

{
     IdUserComment=0;
     user=new DTOUser();
     Textt="";
     Likes=0;
     DatePublish=new Date();
     Visibility="";

     constructor()
     {

     }
}
module.exports = { DTOComment };