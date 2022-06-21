const { DTOComment } = require("./DTOComment");
const { DTOUser } = require("./DTOUser");

class DTOSubComment

{
    IdSubUserComment=0;
     user=new DTOUser();
     comment=new DTOComment();
     Textt="";
     Likes=0;
     DatePublish=new Date();
  

     constructor()
     {

     }
}
module.exports = { DTOSubComment };