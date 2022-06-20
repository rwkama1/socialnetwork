const { DTOComment } = require("./DTOComment");

const { DTOPhoto } = require("./DTOPhoto");

class DTOCommentImage

{
    IdUserCommentImg=0;
    comment=new DTOComment();
    image=new DTOPhoto();

     constructor()
     {

     }
}
module.exports = { DTOCommentImage };