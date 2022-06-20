const { DTOUser } = require("./DTOUser");
const { DTOVideo } = require("./DTOVideo");

class DTOLikeVideo 
//this class is not used but it can be used
// to list likes in the future
{
     idlikevideo=0;
     user=new DTOUser();
     video=new DTOVideo();
     
     constructor()
     {
          
     }
}
module.exports = { DTOLikeVideo };