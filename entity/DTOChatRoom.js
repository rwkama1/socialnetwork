
 class DTOChatRoom
{

    idchatroom=0;


    //MESSAGE

    idmessage=0;
    textmessage="";
    datetimemessage="";

    //USER1

     IdUser1=0;
     nameuser1="";
     profileimage1="";


       //USER2
     IdUser2=0;
     nameuser2="";
     profileimage2="";
    
 
     //time elapsed since message date
    
     diffsecond=0;
     diffminutes=0;
     diffhour=0;
     diffdays=0;
     diffmonth=0;
     diffyear=0;
     stringpostedago="";
 



     DiffDatePublishDateNow()
     {
           let localdate=this.datetimemessage;
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
     



    constructor()
    {  
        
    }
     
}
module.exports = { DTOChatRoom };