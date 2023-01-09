const { DTOPhotoPostVideo } = require("../entity/DTOPhotoPostVideo");
const { Conection } = require("./Connection");
const { VarChar,Int ,Date} = require("mssql");

class DataPhotoPostVideo {

//#region GETS

static getPhotoPostVideoByIdAndType=async(id,type)=>
 {
         
         let querysearch = 
			` 
				SELECT * FROM
				 (
						SELECT 	
							UserImages.iduserimages as id, 
							UserImages.idalbumimages as idalbum,
							AlbumUserImages.title as albumtitle, 
							UserImages.iduser, 
							UserImages.title, 
							UserImages.descriptionn, 
							UserImages.likes,
							UserImages.urlimage as url,
							UserImages.visibility,
							UserImages.datepublish, 
							UserImages.active, 
							Userr.Name as nameuser, 
							Userr.Nick as nickuser, 
							Userr.Email as emailuser, 
							Userr.Imagee as imageuser,
							Userr.Country as countryuser, 
							'I' as typee 
							FROM 
							UserImages 
							inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
							inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
							WHERE 
							Userr.Active = 1 
							and AlbumUserImages.Active = 1 
							and UserImages.Active = 1 
						
						
		
							UNION 
		
		
							SELECT 
							UserVideos.iduservideos, 
							UserVideos.idalbumvideos,
							AlbumUserVideos.title, 
							UserVideos.iduser, 
							UserVideos.title, 
							UserVideos.descriptionn, 
							UserVideos.likes,
							UserVideos.urlvideos,
							UserVideos.visibility,
							UserVideos.datepublish, 
							UserVideos.active, 
							Userr.Name, 
							Userr.Nick, 
							Userr.Email, 
							Userr.Imagee,
							Userr.Country,
							'V' as typee 
							from 
							UserVideos 
							inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
							inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
							where 
							Userr.Active = 1 
							and AlbumUserVideos.Active = 1 
							and UserVideos.Active = 1 
								
				
							UNION 
		
		
							SELECT 
							UserPost.idpost, 
							0,
							'',
							UserPost.iduser, 
							UserPost.title, 
							UserPost.descriptionn, 
							UserPost.likes,
							'',
							UserPost.visibility,
							UserPost.datepublish, 
							UserPost.active, 
							Userr.Name, 
							Userr.Nick, 
							Userr.Email, 
							Userr.Imagee,
							Userr.Country,
							'P' as typee  
							 from 
							UserPost 
							inner join Userr on Userr.IdUser = UserPost.IdUser 
							where 
							Userr.Active = 1 
							and UserPost.Active = 1 
						
					
				)
				AS searchquery
			    WHERE id=@id and typee=@typee
		
         `  
         let pool = await Conection.conection();
         const result = await pool.request()
		 .input('id', Int, id)
		 .input('typee', VarChar, type)
         .query(querysearch)
         let photopostvideo = new DTOPhotoPostVideo();   
        this.getinformation(photopostvideo,result);
        pool.close();
        return photopostvideo;
 }
 
 //-------------------------------------------------------------------------

// if the user has friends, I get all the images, publications and images of the friends
// of the registered user,
// then I get everything according to the country of the logged in user and finally
//  I get all the images, videos and publications of all users


//  If the user does not have friends then I get all the images,
//  videos and publications according to the country of the logged in user and then 
//  I get all the images,
//   publications and videos of all users

static getPhotoPostVideoMainPage=async(iduserlogin,country)=>
 {
         
         let array=[];
         let querysearch = 
		 `  

         IF EXISTS (
				SELECT 
				UserrRelations.IdFriend
				FROM 
				UserrRelations 
				INNER JOIN Userr on Userr.IdUser = UserrRelations.IdFriend 
				WHERE 
				Userr.Active = 1 
				and UserrRelations.IdUser =${iduserlogin}
				and UserrRelations.Statee = 'Confirmed'
              )
         ----------------------------------------------------------------------
        
--if the user has friends, I get all the images, publications and images of the friends of the registered user,
 --then I get everything according to the country of the logged in user and finally
 -- I get all the images, videos and publications of all users

         	BEGIN
           
        	 WITH
			friendsquery AS
					( 
					SELECT 
					UserImages.iduserimages as id, 
					UserImages.idalbumimages as idalbum,
					AlbumUserImages.title as albumtitle, 
					UserImages.iduser, 
					UserImages.title, 
					UserImages.descriptionn, 
					UserImages.likes,
					UserImages.urlimage as url,
					UserImages.visibility,
					UserImages.datepublish, 
				    UserImages.active, 
					Userr.Name as nameuser, 
					Userr.Nick as nickuser, 
					Userr.Email as emailuser, 
					Userr.Imagee as imageuser, 
					Userr.Country as countryuser, 
					'I' as typee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
					where 	 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and (UserImages.Visibility='Public' or UserImages.Visibility='Friend') 
					and UserrRelations.IdUser = ${iduserlogin}
					
					UNION 

					SELECT 
					UserVideos.iduservideos, 
					UserVideos.idalbumvideos,
					AlbumUserVideos.title, 
					UserVideos.iduser, 
					UserVideos.title, 
					UserVideos.descriptionn, 
					UserVideos.likes,
					UserVideos.urlvideos,
					UserVideos.visibility,
					UserVideos.datepublish, 
				    UserVideos.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee,
					Userr.Country as countryuser, 
					'V' as typee 
					 from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserrRelations.Statee = 'Confirmed' 
					and (UserVideos.Visibility='Public' or UserVideos.Visibility='Friend') 
					and UserrRelations.IdUser = ${iduserlogin}
											
					UNION 

					SELECT 
					UserPost.idpost, 
					0,
					'',
					UserPost.iduser, 
					UserPost.title, 
					UserPost.descriptionn, 
					UserPost.likes,
					'',
					UserPost.visibility,
					UserPost.datepublish, 
				    UserPost.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
				    Userr.Imagee,
					Userr.Country as countryuser, 
					'P' as typee  
				 	 from 
                    UserPost 
                    inner join Userr on Userr.IdUser = UserPost.IdUser 
                    inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                    where 
                    Userr.Active = 1 
                    and UserPost.Active = 1 
                    and UserrRelations.Statee = 'Confirmed' 
                    and (UserPost.Visibility='Public' or UserPost.Visibility='Friend') 
                    and UserrRelations.IdUser =${iduserlogin}
					),

			 countryquery AS
				( 
					SELECT 	
					UserImages.iduserimages as id, 
					UserImages.idalbumimages as idalbum,
					AlbumUserImages.title as albumtitle, 
					UserImages.iduser, 
					UserImages.title, 
					UserImages.descriptionn, 
					UserImages.likes,
					UserImages.urlimage as url,
					UserImages.visibility,
					UserImages.datepublish, 
				    UserImages.active, 
					Userr.Name as nameuser, 
					Userr.Nick as nickuser, 
					Userr.Email as emailuser, 
					Userr.Imagee as imageuser,
					Userr.Country as countryuser, 
					'I' as typee 
					FROM 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					WHERE 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
					and Userr.Country=@Country


					UNION 


					SELECT 
					UserVideos.iduservideos, 
					UserVideos.idalbumvideos,
					AlbumUserVideos.title, 
					UserVideos.iduser, 
					UserVideos.title, 
					UserVideos.descriptionn, 
					UserVideos.likes,
					UserVideos.urlvideos,
					UserVideos.visibility,
					UserVideos.datepublish, 
				    UserVideos.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee,
					Userr.Country as countryuser,
					'V' as typee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
					and Userr.Country=@Country


					UNION 


					SELECT 
					UserPost.idpost, 
					0,
					'',
					UserPost.iduser, 
					UserPost.title, 
					UserPost.descriptionn, 
					UserPost.likes,
					'',
					UserPost.visibility,
					UserPost.datepublish, 
				    UserPost.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
				    Userr.Imagee,
					Userr.Country as countryuser,
					'P' as typee  
					 from 
					UserPost 
					inner join Userr on Userr.IdUser = UserPost.IdUser 
					where 
					Userr.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Visibility='Public'
					and Userr.Country=@Country
			    ),


			publicquery as
			(
				SELECT 	
					UserImages.iduserimages as id, 
					UserImages.idalbumimages as idalbum,
					AlbumUserImages.title as albumtitle, 
					UserImages.iduser, 
					UserImages.title, 
					UserImages.descriptionn, 
					UserImages.likes,
					UserImages.urlimage as url,
					UserImages.visibility,
					UserImages.datepublish, 
				    UserImages.active, 
					Userr.Name as nameuser, 
					Userr.Nick as nickuser, 
					Userr.Email as emailuser, 
					Userr.Imagee as imageuser,
					Userr.Country as countryuser, 
					'I' as typee 
					FROM 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					WHERE 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
				

					UNION 


					SELECT 
					UserVideos.iduservideos, 
					UserVideos.idalbumvideos,
					AlbumUserVideos.title, 
					UserVideos.iduser, 
					UserVideos.title, 
					UserVideos.descriptionn, 
					UserVideos.likes,
					UserVideos.urlvideos,
					UserVideos.visibility,
					UserVideos.datepublish, 
				    UserVideos.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee,
					Userr.Country,
					'V' as typee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
					
        
					UNION 


					SELECT 
					UserPost.idpost, 
					0,
					'',
					UserPost.iduser, 
					UserPost.title, 
					UserPost.descriptionn, 
					UserPost.likes,
					'',
					UserPost.visibility,
					UserPost.datepublish, 
				    UserPost.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
				    Userr.Imagee,
					Userr.Country,
					'P' as typee  
					 from 
					UserPost 
					inner join Userr on Userr.IdUser = UserPost.IdUser 
					where 
					Userr.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Visibility='Public'
			)
        select  * from friendsquery 
        union all 
        select  * from countryquery
        union all
        select   * from publicquery
        
      	END
  
         -- If the user does not have friends then I get all the images,
         --  videos and publications according to the country of the logged in user and then 
         -- I get all the images,
          -- publications and videos of all users
        ELSE

	    BEGIN				
			
		WITH
		countryquery AS
		   ( 
			   SELECT 	
			   UserImages.iduserimages as id, 
			   UserImages.idalbumimages as idalbum,
			   AlbumUserImages.title as albumtitle, 
			   UserImages.iduser, 
			   UserImages.title, 
			   UserImages.descriptionn, 
			   UserImages.likes,
			   UserImages.urlimage as url,
			   UserImages.visibility,
			   UserImages.datepublish, 
			   UserImages.active, 
			   Userr.Name as nameuser, 
			   Userr.Nick as nickuser, 
			   Userr.Email as emailuser, 
			   Userr.Imagee as imageuser,
			   Userr.Country as countryuser, 
			   'I' as typee 
			   FROM 
			   UserImages 
			   inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
			   inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
			   WHERE 
			   Userr.Active = 1 
			   and AlbumUserImages.Active = 1 
			   and UserImages.Active = 1 
			   and UserImages.Visibility='Public'
			   and Userr.Country=@Country

			   UNION 

			   SELECT 
			   UserVideos.iduservideos, 
			   UserVideos.idalbumvideos,
			   AlbumUserVideos.title, 
			   UserVideos.iduser, 
			   UserVideos.title, 
			   UserVideos.descriptionn, 
			   UserVideos.likes,
			   UserVideos.urlvideos,
			   UserVideos.visibility,
			   UserVideos.datepublish, 
			   UserVideos.active, 
			   Userr.Name, 
			   Userr.Nick, 
			   Userr.Email, 
			   Userr.Imagee,
			   Userr.Country as countryuser,
			   'V' as typee 
			   from 
			   UserVideos 
			   inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
			   inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
			   where 
			   Userr.Active = 1 
			   and AlbumUserVideos.Active = 1 
			   and UserVideos.Active = 1 
			   and UserVideos.Visibility='Public'
			   and Userr.Country=@Country

			   UNION 

			   SELECT 
			   UserPost.idpost, 
			   0,
			   '',
			   UserPost.iduser, 
			   UserPost.title, 
			   UserPost.descriptionn, 
			   UserPost.likes,
			   '',
			   UserPost.visibility,
			   UserPost.datepublish, 
			   UserPost.active, 
			   Userr.Name, 
			   Userr.Nick, 
			   Userr.Email, 
			   Userr.Imagee,
			   Userr.Country as countryuser,
			   'P' as typee  
				from 
			   UserPost 
			   inner join Userr on Userr.IdUser = UserPost.IdUser 
			   where 
			   Userr.Active = 1 
			   and UserPost.Active = 1 
			   and UserPost.Visibility='Public'
			   and Userr.Country=@Country
		   ),
	   publicquery as
	   (
		   SELECT 	
			   UserImages.iduserimages as id, 
			   UserImages.idalbumimages as idalbum,
			   AlbumUserImages.title as albumtitle, 
			   UserImages.iduser, 
			   UserImages.title, 
			   UserImages.descriptionn, 
			   UserImages.likes,
			   UserImages.urlimage as url,
			   UserImages.visibility,
			   UserImages.datepublish, 
			   UserImages.active, 
			   Userr.Name as nameuser, 
			   Userr.Nick as nickuser, 
			   Userr.Email as emailuser, 
			   Userr.Imagee as imageuser,
			   Userr.Country as countryuser, 
			   'I' as typee 
			   FROM 
			   UserImages 
			   inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
			   inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
			   WHERE 
			   Userr.Active = 1 
			   and AlbumUserImages.Active = 1 
			   and UserImages.Active = 1 
			   and UserImages.Visibility='Public'
		   
			   UNION 

			   SELECT 
			   UserVideos.iduservideos, 
			   UserVideos.idalbumvideos,
			   AlbumUserVideos.title, 
			   UserVideos.iduser, 
			   UserVideos.title, 
			   UserVideos.descriptionn, 
			   UserVideos.likes,
			   UserVideos.urlvideos,
			   UserVideos.visibility,
			   UserVideos.datepublish, 
			   UserVideos.active, 
			   Userr.Name, 
			   Userr.Nick, 
			   Userr.Email, 
			   Userr.Imagee,
			   Userr.Country,
			   'V' as typee 
			   from 
			   UserVideos 
			   inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
			   inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
			   where 
			   Userr.Active = 1 
			   and AlbumUserVideos.Active = 1 
			   and UserVideos.Active = 1 
			   and UserVideos.Visibility='Public'
			   
			   UNION 

			   SELECT 
			   UserPost.idpost, 
			   0,
			   '',
			   UserPost.iduser, 
			   UserPost.title, 
			   UserPost.descriptionn, 
			   UserPost.likes,
			   '',
			   UserPost.visibility,
			   UserPost.datepublish, 
			   UserPost.active, 
			   Userr.Name, 
			   Userr.Nick, 
			   Userr.Email, 
			   Userr.Imagee,
			   Userr.Country,
			   'P' as typee  
				from 
			   UserPost 
			   inner join Userr on Userr.IdUser = UserPost.IdUser 
			   where 
			   Userr.Active = 1 
			   and UserPost.Active = 1 
			   and UserPost.Visibility='Public'
	   )
   
		select  * from countryquery
		union all
		select   * from publicquery

        END      

         `  
         let pool = await Conection.conection();
         const result = await pool.request()
         .input('Country', VarChar, country)
         .query(querysearch)
         for (var resu of result.recordset) {
            let photopostvideo = new DTOPhotoPostVideo();   
            this.getinformationList(photopostvideo,resu);
            array.push(photopostvideo);
           }
       
        pool.close();
        return array;
 }
 
 //-----------------------------------------------------------------------------------------

 static getPhotoPostVideoFriendUser=async(iduserlogin)=>
 {
         
         let array=[];
         let querysearch = 
		 ` 

        	WITH
			friendsquery AS
					( 
					SELECT 
					UserImages.iduserimages as id, 
					UserImages.idalbumimages as idalbum,
					AlbumUserImages.title as albumtitle, 
					UserImages.iduser, 
					UserImages.title, 
					UserImages.descriptionn, 
					UserImages.likes,
					UserImages.urlimage as url,
					UserImages.visibility,
					UserImages.datepublish, 
				    UserImages.active, 
					Userr.Name as nameuser, 
					Userr.Nick as nickuser, 
					Userr.Email as emailuser, 
					Userr.Imagee as imageuser, 
					Userr.Country as countryuser, 
					'I' as typee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
					where 	 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and (UserImages.Visibility='Public' or UserImages.Visibility='Friend') 
					and UserrRelations.IdUser = ${iduserlogin}
					
					UNION 

					SELECT 
					UserVideos.iduservideos, 
					UserVideos.idalbumvideos,
					AlbumUserVideos.title, 
					UserVideos.iduser, 
					UserVideos.title, 
					UserVideos.descriptionn, 
					UserVideos.likes,
					UserVideos.urlvideos,
					UserVideos.visibility,
					UserVideos.datepublish, 
				    UserVideos.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee,
					Userr.Country as countryuser, 
					'V' as typee 
					 from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserrRelations.Statee = 'Confirmed' 
					and (UserVideos.Visibility='Public' or UserVideos.Visibility='Friend') 
					and UserrRelations.IdUser = ${iduserlogin}
											
					UNION 

					SELECT 
					UserPost.idpost, 
					0,
					'',
					UserPost.iduser, 
					UserPost.title, 
					UserPost.descriptionn, 
					UserPost.likes,
					'',
					UserPost.visibility,
					UserPost.datepublish, 
				    UserPost.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
				    Userr.Imagee,
					Userr.Country as countryuser, 
					'P' as typee  
				 	 from 
                    UserPost 
                    inner join Userr on Userr.IdUser = UserPost.IdUser 
                    inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                    where 
                    Userr.Active = 1 
                    and UserPost.Active = 1 
                    and UserrRelations.Statee = 'Confirmed' 
                    and (UserPost.Visibility='Public' or UserPost.Visibility='Friend') 
                    and UserrRelations.IdUser =${iduserlogin}
				)

        select  * from friendsquery 

         `  
         let pool = await Conection.conection();
         const result = await pool.request()
       
         .query(querysearch)
         for (var resu of result.recordset) {
            let photopostvideo = new DTOPhotoPostVideo();   
            this.getinformationList(photopostvideo,resu);
            array.push(photopostvideo);
           }
       
        pool.close();
        return array;
 }

 static getPhotoPostVideoCountryUser=async(country)=>
 {
         
         let array=[];
         let querysearch = 
		 ` 
        	WITH
			countryquery AS
				( 
					SELECT 	
					UserImages.iduserimages as id, 
					UserImages.idalbumimages as idalbum,
					AlbumUserImages.title as albumtitle, 
					UserImages.iduser, 
					UserImages.title, 
					UserImages.descriptionn, 
					UserImages.likes,
					UserImages.urlimage as url,
					UserImages.visibility,
					UserImages.datepublish, 
				    UserImages.active, 
					Userr.Name as nameuser, 
					Userr.Nick as nickuser, 
					Userr.Email as emailuser, 
					Userr.Imagee as imageuser,
					Userr.Country as countryuser, 
					'I' as typee 
					FROM 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					WHERE 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
					and Userr.Country=@Country


					UNION 


					SELECT 
					UserVideos.iduservideos, 
					UserVideos.idalbumvideos,
					AlbumUserVideos.title, 
					UserVideos.iduser, 
					UserVideos.title, 
					UserVideos.descriptionn, 
					UserVideos.likes,
					UserVideos.urlvideos,
					UserVideos.visibility,
					UserVideos.datepublish, 
				    UserVideos.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee,
					Userr.Country as countryuser,
					'V' as typee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and UserVideos.Visibility='Public'
					and Userr.Country=@Country


					UNION 


					SELECT 
					UserPost.idpost, 
					0,
					'',
					UserPost.iduser, 
					UserPost.title, 
					UserPost.descriptionn, 
					UserPost.likes,
					'',
					UserPost.visibility,
					UserPost.datepublish, 
				    UserPost.active, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
				    Userr.Imagee,
					Userr.Country as countryuser,
					'P' as typee  
					 from 
					UserPost 
					inner join Userr on Userr.IdUser = UserPost.IdUser 
					where 
					Userr.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Visibility='Public'
					and Userr.Country=@Country
				)

        select  * from countryquery 
		
         `  
         let pool = await Conection.conection();
         const result = await pool.request()
         .input('Country', VarChar, country)
         .query(querysearch)
         for (var resu of result.recordset) {
            let photopostvideo = new DTOPhotoPostVideo();   
            this.getinformationList(photopostvideo,resu);
            array.push(photopostvideo);
           }
       
        pool.close();
        return array;
 }
 
 static getPhotoPostVideoPublic=async()=>
 {
         
         let array=[];
         let querysearch = 
		 	` 
        	WITH 
			publicquery as
					(
						SELECT 	
							UserImages.iduserimages as id, 
							UserImages.idalbumimages as idalbum,
							AlbumUserImages.title as albumtitle, 
							UserImages.iduser, 
							UserImages.title, 
							UserImages.descriptionn, 
							UserImages.likes,
							UserImages.urlimage as url,
							UserImages.visibility,
							UserImages.datepublish, 
							UserImages.active, 
							Userr.Name as nameuser, 
							Userr.Nick as nickuser, 
							Userr.Email as emailuser, 
							Userr.Imagee as imageuser,
							Userr.Country as countryuser, 
							'I' as typee 
							FROM 
							UserImages 
							inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
							inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
							WHERE 
							Userr.Active = 1 
							and AlbumUserImages.Active = 1 
							and UserImages.Active = 1 
							and UserImages.Visibility='Public'
						
		
							UNION 
		
		
							SELECT 
							UserVideos.iduservideos, 
							UserVideos.idalbumvideos,
							AlbumUserVideos.title, 
							UserVideos.iduser, 
							UserVideos.title, 
							UserVideos.descriptionn, 
							UserVideos.likes,
							UserVideos.urlvideos,
							UserVideos.visibility,
							UserVideos.datepublish, 
							UserVideos.active, 
							Userr.Name, 
							Userr.Nick, 
							Userr.Email, 
							Userr.Imagee,
							Userr.Country,
							'V' as typee 
							from 
							UserVideos 
							inner join AlbumUserVideos on AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos 
							inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
							where 
							Userr.Active = 1 
							and AlbumUserVideos.Active = 1 
							and UserVideos.Active = 1 
							and UserVideos.Visibility='Public'
							
				
							UNION 
		
		
							SELECT 
							UserPost.idpost, 
							0,
							'',
							UserPost.iduser, 
							UserPost.title, 
							UserPost.descriptionn, 
							UserPost.likes,
							'',
							UserPost.visibility,
							UserPost.datepublish, 
							UserPost.active, 
							Userr.Name, 
							Userr.Nick, 
							Userr.Email, 
							Userr.Imagee,
							Userr.Country,
							'P' as typee  
							 from 
							UserPost 
							inner join Userr on Userr.IdUser = UserPost.IdUser 
							where 
							Userr.Active = 1 
							and UserPost.Active = 1 
							and UserPost.Visibility='Public'
					
				)

        select  * from publicquery 
		
         `  
         let pool = await Conection.conection();
         const result = await pool.request()
         .query(querysearch)
         for (var resu of result.recordset) {
            let photopostvideo = new DTOPhotoPostVideo();   
            this.getinformationList(photopostvideo,resu);
            array.push(photopostvideo);
           }
       
        pool.close();
        return array;
 }

//#endregion

 //#region  GetInformation
  static  getinformation(photopostvideo, result) {
    
    photopostvideo.id = result.recordset[0].id; 
    photopostvideo.idalbum = result.recordset[0].idalbum;
    photopostvideo.albumtitle = result.recordset[0].albumtitle;
    photopostvideo.title = result.recordset[0].title;
    photopostvideo.description = result.recordset[0].descriptionn;
    photopostvideo.likes = result.recordset[0].likes;
    photopostvideo.url = result.recordset[0].url;
    photopostvideo.visibility = result.recordset[0].visibility;
    photopostvideo.datepublish = result.recordset[0].datepublish;
    photopostvideo.active = result.recordset[0].active;
    photopostvideo.type = result.recordset[0].typee;
    photopostvideo.user.iduser = result.recordset[0].iduser;
    photopostvideo.user.name = result.recordset[0].nameuser;
    photopostvideo.user.nick = result.recordset[0].nickuser;
    photopostvideo.user.email = result.recordset[0].emailuser;
    photopostvideo.user.image = result.recordset[0].imageuser;
    photopostvideo.user.country = result.recordset[0].countryuser;

  
  
  }
  static  getinformationList(photopostvideo,result) {
    
    photopostvideo.id = result.id; 
    photopostvideo.idalbum = result.idalbum;
    photopostvideo.albumtitle = result.albumtitle;
    photopostvideo.title = result.title;
    photopostvideo.description = result.descriptionn;
    photopostvideo.likes = result.likes;
    photopostvideo.url = result.url;
    photopostvideo.visibility = result.visibility;
    photopostvideo.datepublish = result.datepublish;
    photopostvideo.active = result.active;
    photopostvideo.type = result.typee;
    photopostvideo.user.iduser = result.iduser;
    photopostvideo.user.name = result.nameuser;
    photopostvideo.user.nick = result.nickuser;
    photopostvideo.user.email = result.emailuser;
    photopostvideo.user.image = result.imageuser;
    photopostvideo.user.country = result.countryuser;
   
  
  
   
  }
  //#endregion
}
module.exports = { DataPhotoPostVideo };