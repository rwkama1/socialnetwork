const { DTOComment } = require("./DTOComment");
const { DTOCommentImage } = require("./DTOCommentImage");
const { DTOCommentPost } = require("./DTOCommentPost");
const { DTOCommentVideo } = require("./DTOCommentVideo");
const { DTOUser } = require("./DTOUser");

class DTOSubComment

{
     IdSubUserComment=0;
     user=new DTOUser();
     imagecomment=new DTOCommentImage();
     videocomment=new DTOCommentVideo();
     postcomment=new DTOCommentPost();
     Textt="";
     Likes=0;
     DatePublish=new Date();
  

     constructor()
     {

     }
}
module.exports = { DTOSubComment };