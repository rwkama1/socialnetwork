

class DTOCommentPost 

{
    IdUserCommentPost=0;
  

     //Comment

     idusercomment=0;
     textcomment="";
     likescomment=0;
     datepublishcomment=new Date();

     
    //Post

    idpost=0;

    //User 

    idcommentuser=0;
    namecommentuser="";
    nickcommentuser="";
    usernamecommentuser="";
    imagecommentuser="";

       //time elapsed since publication date
    
       diffsecond=0;
       diffminutes=0;
       diffhour=0;
       diffdays=0;
       diffmonth=0;
       diffyear=0;
       stringpostedago="";
   
       DiffDatePublishDateNow()
       {
             let localdate=this.datepublishcomment;
             let dateutcpublish=new Date(localdate.getUTCFullYear(),
             localdate.getUTCMonth(),localdate.getUTCDate(),localdate.getUTCHours()
           ,localdate.getUTCMinutes(),localdate.getUTCSeconds(),localdate.getUTCMilliseconds())
   
             let now=new Date();
             let nowutc=new Date(now.getUTCFullYear(),
           now.getUTCMonth(),now.getUTCDate(),now.getUTCHours()
           ,now.getUTCMinutes(),now.getUTCSeconds(),now.getUTCMilliseconds()
           )
         
         let difmiliseconds=nowutc-dateutcpublish
         this.diffsecond=Math.floor((difmiliseconds)/1000);
         this.diffminutes=Math.floor(this.diffsecond/60);
         this.diffhour=Math.floor(this.diffminutes/60);
         this.diffdays=Math.floor(this.diffhour/24);
         this.diffmonth=Math.floor(this.diffdays/31);
         this.diffyear=Math.floor(this.diffmonth/12);
        
       }
       showDiffDatePublishDateNow()
       {
         if(this.diffsecond<60)
         {
           this.stringpostedago= `Posted ${this.diffsecond} seconds ago`
         }
         else if(this.diffsecond>=60&&this.diffminutes<60)
         {
           this.stringpostedago= `Posted ${this.diffminutes} minutes ago`
         }
         else if(this.diffminutes>=60&&this.diffhour<24)
         {
           this.stringpostedago= `Posted ${this.diffhour} hours ago`
         }
         else if(this.diffhour>=24&&this.diffdays<31)
         {
           this.stringpostedago= `Posted ${this.diffdays} days ago`
         }
         else if(this.diffdays>=31&&this.diffmonth<12)
         {
           this.stringpostedago= `Posted ${this.diffmonth} month ago`
         }
         else if(this.diffmonth>=12)
         {
           this.stringpostedago= `Posted ${this.diffyear} years ago`
         }
       }

     constructor()
     {

     }
}
module.exports = { DTOCommentPost };