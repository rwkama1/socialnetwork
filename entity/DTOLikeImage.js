const { DTOPhoto } = require("./DTOPhoto");
const { DTOUser } = require("./DTOUser");

class DTOLikeImage
{
     idlikeimage=0;
     user=new DTOUser();
     image=new DTOPhoto();
}
module.exports = { DTOLikeImage };