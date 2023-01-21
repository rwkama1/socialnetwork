class DTONotification

{
     IdNotification=0;
     DateeTime=new Date();

     //USERS
     
     IdUserSender=0;
     NameSender="";
     ImageSender="";

     // IMAGE POST VIDEOS
 
     IdImagePostVideo=0;
     TitleImagePostVideo="";
     Typee="";


  //time elapsed since NOTIFICATION date


  diffsecond=0;
  diffminutes=0;
  diffhour=0;
  diffdays=0;
  diffmonth=0;
  diffyear=0;
  stringnotificationago="";




       DiffDateNotificationDateNow()
       {
             let localdate=this.DateeTime;
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
       
       showDiffDateNotificationDateNow()
       {
         if(this.diffsecond<60)
         {
           this.stringnotificationago= ` ${this.diffsecond} seconds ago`
         }
         else if(this.diffsecond>=60&&this.diffminutes<60)
         {
           this.stringnotificationago= ` ${this.diffminutes} minutes ago`
         }
         else if(this.diffminutes>=60&&this.diffhour<24)
         {
           this.stringnotificationago= ` ${this.diffhour} hours ago`
         }
         else if(this.diffhour>=24&&this.diffdays<31)
         {
           this.stringnotificationago= ` ${this.diffdays} days ago`
         }
         else if(this.diffdays>=31&&this.diffmonth<12)
         {
           this.stringnotificationago= ` ${this.diffmonth} month ago`
         }
         else if(this.diffmonth>=12)
         {
           this.stringnotificationago= ` ${this.diffyear} years ago`
         }
       }
  
  

     constructor()
     {
          
     }
}
module.exports = { DTONotification };