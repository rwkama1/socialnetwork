const { DTOUser } = require("./DTOUser");


class DTOPhotoPostVideo
{
  
    id=0;
    idalbum=0;
    albumtitle="";
    title="";
    description="";
    likes=0;
    url="";
    visibility="";
    datepublish=new Date();
    active=true;
    user=new DTOUser();
    type="";
    
    constructor()
    {  
          
    }
}
module.exports = { DTOPhotoPostVideo };