
class DTOSubComment

{
    idsubusercomment=0;
    textsubcomment="";
     likessubcomment=0;
     datepublishsubcomment=new Date();
     withsubcomments=0;

    //Comment

    idusercomment=0;
    textcomment="";
    likescomment=0;
    datepublishcomment=new Date();
    
    //time elapsed since publication date  comment
    
    diffsecondcomment=0;
    diffminutescomment=0;
    diffhourcomment=0;
    diffdayscomment=0;
    diffmonthcomment=0;
    diffyearscomment=0;
    stringpostedagocomment="";

     //User SubComment

     idsubcommentuser=0;
     namesubcommentuser="";
     nicksubcommentuser="";
     usernamesubcommentuser="";
     imagesubcommentuser="";

     //User Comment

     idcommentuser=0;
     namecommentuser="";
     nickcommentuser="";
     usernamecommentuser="";
     imagecommentuser="";

     //Comment Image

     idusercommentimg=0;
     iduserimages=0;

    //Comment Post

    idusercommentpost=0;
    idpost=0;

     //Comment Video

    idusercommentvideo=0;
    iduservideos=0;

     //time elapsed since publication date sub comment
    
     diffsecondsubcomment=0;
     diffminutessubcomment=0;
     diffhoursubcomment=0;
     diffdayssubcomment=0;
     diffmonthsubcomment=0;
     diffyearsubcomment=0;
     stringpostedagosubcomment="";
 
     DiffDatePublishDateNowSubComment()
     {
           let localdate=this.datepublishsubcomment;
           let dateutcpublish=new Date(localdate.getUTCFullYear(),
           localdate.getUTCMonth(),localdate.getUTCDate(),localdate.getUTCHours()
         ,localdate.getUTCMinutes(),localdate.getUTCSeconds(),localdate.getUTCMilliseconds())
 
           let now=new Date();
           let nowutc=new Date(now.getUTCFullYear(),
         now.getUTCMonth(),now.getUTCDate(),now.getUTCHours()
         ,now.getUTCMinutes(),now.getUTCSeconds(),now.getUTCMilliseconds()
         )
       
       let difmiliseconds=nowutc-dateutcpublish
       this.diffsecondsubcomment=Math.floor((difmiliseconds)/1000);
       this.diffminutessubcomment=Math.floor(this.diffsecondsubcomment/60);
       this.diffhoursubcomment=Math.floor(this.diffminutessubcomment/60);
       this.diffdayssubcomment=Math.floor(this.diffhoursubcomment/24);
       this.diffmonthsubcomment=Math.floor(this.diffdayssubcomment/31);
       this.diffyearsubcomment=Math.floor(this.diffmonthsubcomment/12);
      
     }
     showDiffDatePublishDateNowSubComment()
     {
       if(this.diffsecondsubcomment<60)
       {
         this.stringpostedagosubcomment= `Posted ${this.diffsecondsubcomment} seconds ago`
       }
       else if(this.diffsecondsubcomment>=60&&this.diffminutessubcomment<60)
       {
         this.stringpostedagosubcomment= `Posted ${this.diffminutessubcomment} minutes ago`
       }
       else if(this.diffminutessubcomment>=60&&this.diffhoursubcomment<24)
       {
         this.stringpostedagosubcomment= `Posted ${this.diffhoursubcomment} hours ago`
       }
       else if(this.diffhoursubcomment>=24&&this.diffdayssubcomment<31)
       {
         this.stringpostedagosubcomment= `Posted ${this.diffdayssubcomment} days ago`
       }
       else if(this.diffdayssubcomment>=31&&this.diffmonthsubcomment<12)
       {
         this.stringpostedagosubcomment= `Posted ${this.diffmonthsubcomment} month ago`
       }
       else if(this.diffmonthsubcomment>=12)
       {
         this.stringpostedagosubcomment= `Posted ${this.diffyearsubcomment} years ago`
       }
     }



     DiffDatePublishDateNowComment()
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
       this.diffsecondcomment=Math.floor((difmiliseconds)/1000);
       this.diffminutescomment=Math.floor(this.diffsecondcomment/60);
       this.diffhourcomment=Math.floor(this.diffminutescomment/60);
       this.diffdayscomment=Math.floor(this.diffhourcomment/24);
       this.diffmonthcomment=Math.floor(this.diffdayscomment/31);
       this.diffyearcomment=Math.floor(this.diffmonthcomment/12);
      
     }
     showDiffDatePublishDateNowComment()
     {
       if(this.diffsecondcomment<60)
       {
         this.stringpostedagocomment= `Posted ${this.diffsecondcomment} seconds ago`
       }
       else if(this.diffsecondcomment>=60&&this.diffminutescomment<60)
       {
         this.stringpostedagocomment= `Posted ${this.diffminutescomment} minutes ago`
       }
       else if(this.diffminutescomment>=60&&this.diffhourcomment<24)
       {
         this.stringpostedagocomment= `Posted ${this.diffhourcomment} hours ago`
       }
       else if(this.diffhourcomment>=24&&this.diffdayscomment<31)
       {
         this.stringpostedagocomment= `Posted ${this.diffdayscomment} days ago`
       }
       else if(this.diffdayscomment>=31&&this.diffmonthcomment<12)
       {
         this.stringpostedagocomment= `Posted ${this.diffmonthcomment} month ago`
       }
       else if(this.diffmonthcomment>=12)
       {
         this.stringpostedagocomment= `Posted ${this.diffyearscomment} years ago`
       }
     }
     constructor()
     {

     }
}
module.exports = { DTOSubComment };