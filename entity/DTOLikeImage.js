const { DTOPhoto } = require("./DTOPhoto");
const { DTOUser } = require("./DTOUser");

class DTOLikeImage
//this class is not used but it can be used
// to list likes in the future
{
     idlikeimage=0;
     user=new DTOUser();
     image=new DTOPhoto();
     constructor()
     {

     }
}
module.exports = { DTOLikeImage };