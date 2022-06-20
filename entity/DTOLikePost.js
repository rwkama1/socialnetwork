const { DTOPost } = require("./DTOPost");
const { DTOUser } = require("./DTOUser");

class DTOLikePost
//this class is not used but it can be used
// to list likes in the future
{
     idlikepost=0;
     user=new DTOUser();
     post=new DTOPost();
     constructor()
     {
          
     }
}
module.exports = { DTOLikePost };