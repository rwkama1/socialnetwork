const { DTOComment } = require("./DTOComment");
const { DTOPost } = require("./DTOPost");

class DTOCommentPost 

{
    IdUserCommentPost=0;
    comment=new DTOComment();
    post=new DTOPost();

     constructor()
     {

     }
}
module.exports = { DTOCommentPost };