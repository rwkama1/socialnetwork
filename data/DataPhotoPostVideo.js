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

// if the user has friends and followers, I get all the images, publications and images of the 
//friends and followers
// of the registered user,
// then I get everything according to the country of the logged in user 



//  If the user does not have friends and followers
// then I get all the images,
//  videos and publications according to the country of the logged in user and then 
//  I get all the images,
//   publications and videos of all users

static getPhotoPostVideoMainPage=async(iduserlogin)=>
 {
         
         let array=[];
         let querysearch = 
		 `  

		 IF EXISTS (
			
			SELECT 
			Userr.IdUser
			FROM 
			UserrRelations 
			INNER JOIN Userr on Userr.IdUser = UserrRelations.IdFriend 
			WHERE 
			Userr.Active = 1 
			and UserrRelations.IdUser = @iduserlogin
			and UserrRelations.Statee = 'Confirmed'

			UNION

			SELECT 
			Userr.IdUser
			FROM 
			Followers 
			INNER JOIN Userr on Userr.IdUser = Followers.IdFollowedUser 
			WHERE 
			Userr.Active = 1 
			and Followers.IdFollowerUser = @iduserlogin
		  )


		 BEGIN
	   
		 WITH

		friendsquery AS
			( 

		SELECT DISTINCT 
		p.idpost as id,
		0 as idalbum,
		'' as albumtitle,
		p.iduser,
		p.title,
		p.descriptionn,
		p.likes,
		'' as url,
		p.visibility,
		p.datepublish,
		p.active,
		u.Name as nameuser ,
		u.Nick as nickuser ,
		u.Email as emailuser,
		u.Imagee as imageuser,
		u.Country as countryuser,
		'P' as typee
		FROM UserPost p
		JOIN UserrRelations r ON p.IdUser = r.IdFriend
		JOIN Userr u on p.IdUser = u.IdUser
		WHERE 
		u.Active = 1
		AND p.Active = 1
		AND r.IdUser = @iduserlogin
		AND r.Statee = 'Confirmed'

		GROUP BY 
		p.idpost ,	
		p.iduser,
		p.title,
		p.descriptionn,
		p.likes,
		p.visibility,
		p.datepublish,
		p.active,
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee,
		u.Country 

		UNION

		SELECT DISTINCT
		i.iduserimages as id,
		i.idalbumimages as idalbum,
		ai.title as albumtitle,
		i.iduser,
		i.title,
		i.descriptionn,
		i.likes,
		i.urlimage as url,
		i.visibility,
		i.datepublish,
		i.active,
		u.Name as nameuser,
		u.Nick as nickuser,
		u.Email as emailuser,
		u.Imagee as imageuser,
		u.Country as countryuser,
		'I' as typee	
		FROM UserImages i
		JOIN UserrRelations r ON i.IdUser = r.IdFriend
		JOIN Userr u on i.IdUser = u.IdUser
		JOIN AlbumUserImages ai on i.idalbumimages = ai.idalbumimages
		WHERE
		 u.Active = 1
		 AND ai.Active=1
		 AND i.Active = 1
		 AND r.IdUser = @iduserlogin
		 AND r.Statee = 'Confirmed'

		 GROUP BY

		i.iduserimages,
		i.idalbumimages,
		ai.title ,
		i.iduser,
		i.title,
		i.descriptionn,
		i.likes,
		i.urlimage,
		i.visibility,
		i.datepublish,
		i.active,
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee ,
		u.Country 

		UNION

		SELECT DISTINCT 
		v.iduservideos as id,
		v.idalbumvideos as idalbum ,
		av.title as albumtitle,
		v.iduser,
		v.title,
		v.descriptionn,
		v.likes,
		v.urlvideos as url,
		v.visibility,
		v.datepublish,
		v.active,
		
		u.Name as nameuser,
		u.Nick as nickuser,
		u.Email as emailuser,
		u.Imagee as imageuser,
		u.Country as countryuser,
		'V' as typee
		FROM UserVideos v
		JOIN UserrRelations r ON v.IdUser = r.IdFriend
		JOIN Userr u on v.IdUser = u.IdUser
		JOIN AlbumUserVideos av on v.idalbumvideos = av.idalbumvideos
		WHERE 
		u.Active = 1
		AND av.Active=1
		AND v.Active = 1	
		AND r.IdUser = @iduserlogin 
		AND r.Statee = 'Confirmed'
			
		 GROUP BY
		v.iduservideos ,
		v.idalbumvideos  ,
		av.title ,
		v.iduser,
		v.title,
		v.descriptionn,
		v.likes,
		v.urlvideos ,
		v.visibility,
		v.datepublish,
		v.active,
		
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee ,
		u.Country 
		  ),



	followerquery as
		(

		SELECT distinct *
		FROM friendsquery

		UNION

		SELECT DISTINCT 
		p.idpost as id,
		0 as idalbum,
		'' as albumtitle,
		p.iduser,
		p.title,
		p.descriptionn,
		p.likes,
		'' as url,
		p.visibility,
		p.datepublish,
		p.active,
		u.Name as nameuser ,
		u.Nick as nickuser ,
		u.Email as emailuser,
		u.Imagee as imageuser,
		u.Country as countryuser,
		'P' as typee
		FROM UserPost p
		JOIN Followers f ON p.IdUser = f.IdFollowedUser
		JOIN Userr u on p.IdUser = u.IdUser
		WHERE
		u.Active = 1
		AND p.Active = 1
		AND f.IdFollowerUser = @iduserlogin 
		GROUP BY 
		p.idpost ,	
		p.iduser,
		p.title,
		p.descriptionn,
		p.likes,
		p.visibility,
		p.datepublish,
		p.active,
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee,
		u.Country 

		UNION

		SELECT DISTINCT
		i.iduserimages as id,
		i.idalbumimages as idalbum,
		ai.title as albumtitle,
		i.iduser,
		i.title,
		i.descriptionn,
		i.likes,
		i.urlimage as url,
		i.visibility,
		i.datepublish,
		i.active,
		
		u.Name as nameuser,
		u.Nick as nickuser,
		u.Email as emailuser,
		u.Imagee as imageuser,
		u.Country as countryuser,
		'I' as typee	
		FROM UserImages i
		JOIN Followers f ON i.IdUser = f.IdFollowedUser
		JOIN Userr u on i.IdUser = u.IdUser
		JOIN AlbumUserImages ai on i.idalbumimages = ai.idalbumimages
		WHERE 
		u.Active = 1
		AND i.Active = 1
		AND ai.Active = 1
		AND f.IdFollowerUser = @iduserlogin
		
		 GROUP BY

		i.iduserimages,
		i.idalbumimages,
		ai.title ,
		i.iduser,
		i.title,
		i.descriptionn,
		i.likes,
		i.urlimage,
		i.visibility,
		i.datepublish,
		i.active,
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee ,
		u.Country 

		UNION

		SELECT DISTINCT
		v.iduservideos as id,
		v.idalbumvideos as idalbum ,
		av.title as albumtitle,
		v.iduser,
		v.title,
		v.descriptionn,
		v.likes,
		v.urlvideos as url,
		v.visibility,
		v.datepublish,
		v.active,
	
		u.Name as nameuser,
		u.Nick as nickuser,
		u.Email as emailuser,
		u.Imagee as imageuser,
		u.Country as countryuser,
		'V' as typee
		FROM UserVideos v
		JOIN Followers f ON v.IdUser = f.IdFollowedUser
		JOIN Userr u on v.IdUser = u.IdUser
		JOIN AlbumUserVideos av on v.idalbumvideos = av.idalbumvideos
		WHERE
		u.Active = 1
		AND v.Active = 1
		AND av.Active = 1
		AND f.IdFollowerUser = @iduserlogin 
			
		 GROUP BY
		v.iduservideos ,
		v.idalbumvideos  ,
		av.title ,
		v.iduser,
		v.title,
		v.descriptionn,
		v.likes,
		v.urlvideos ,
		v.visibility,
		v.datepublish,
		v.active,
		
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee ,
		u.Country 

		)

	
		
	select distinct * from followerquery 
   
	order by datepublish desc
	
	  END


	ELSE

	BEGIN				
		

  WITH allquery as
   (

	SELECT DISTINCT
	p.idpost as id,
	0 as idalbum,
	'' as albumtitle,
	p.iduser,
	p.title,
	p.descriptionn,
	p.likes,
	'' as url,
	p.visibility,
	p.datepublish,
	p.active,
	u.Name as nameuser ,
	u.Nick as nickuser ,
	u.Email as emailuser,
	u.Imagee as imageuser,
	u.Country as countryuser,
	'P' as typee
	FROM UserPost p
	JOIN Userr u on p.IdUser = u.IdUser
	WHERE p.iduser <> @iduserlogin
	AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
	WHERE IdUserBlocker = @iduserlogin 
	AND IdUserBlocked = u.IdUser)

		GROUP BY 
		p.idpost ,	
		p.iduser,
		p.title,
		p.descriptionn,
		p.likes,
		p.visibility,
		p.datepublish,
		p.active,
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee,
		u.Country 


	UNION

	SELECT DISTINCT 
	i.iduserimages as id,
	i.idalbumimages as idalbum,
	ai.title as albumtitle,
	i.iduser,
	i.title,
	i.descriptionn,
	i.likes,
	i.urlimage as url,
	i.visibility,
	i.datepublish,
	i.active,
	
	u.Name as nameuser,
	u.Nick as nickuser,
	u.Email as emailuser,
	u.Imagee as imageuser,
	u.Country as countryuser,
	'I' as typee	
	FROM UserImages i
	JOIN Userr u on i.IdUser = u.IdUser
	JOIN AlbumUserImages ai on i.idalbumimages = ai.idalbumimages
	WHERE i.iduser <> @iduserlogin
	AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
	WHERE IdUserBlocker = @iduserlogin 
	AND IdUserBlocked = u.IdUser)

	 GROUP BY
		i.iduserimages,
		i.idalbumimages,
		ai.title ,
		i.iduser,
		i.title,
		i.descriptionn,
		i.likes,
		i.urlimage,
		i.visibility,
		i.datepublish,
		i.active,
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee ,
		u.Country 


	UNION

	SELECT DISTINCT
	
	v.iduservideos as id,
	v.idalbumvideos as idalbum ,
	av.title as albumtitle,
	v.iduser,
	v.title,
	v.descriptionn,
	v.likes,
	v.urlvideos as url,
	v.visibility,
	v.datepublish,
	v.active,

	u.Name as nameuser,
	u.Nick as nickuser,
	u.Email as emailuser,
	u.Imagee as imageuser,
	u.Country as countryuser,
	'V' as typee
	FROM UserVideos v
	JOIN Userr u on v.IdUser = u.IdUser
	JOIN AlbumUserVideos av on v.idalbumvideos = av.idalbumvideos
	WHERE v.iduser <> @iduserlogin
	AND NOT EXISTS (SELECT IdUserBlocker FROM BlockedUser
	WHERE IdUserBlocker = @iduserlogin 
	AND IdUserBlocked = u.IdUser)
	
		 GROUP BY
		v.iduservideos ,
		v.idalbumvideos  ,
		av.title ,
		v.iduser,
		v.title,
		v.descriptionn,
		v.likes,
		v.urlvideos ,
		v.visibility,
		v.datepublish,
		v.active,		
		u.Name ,
		u.Nick ,
		u.Email ,
		u.Imagee ,
		u.Country 
   )

	select distinct   * from allquery
	order by datepublish desc

	END      

         `  
         let pool = await Conection.conection();
         const result = await pool.request()
         .input('iduserlogin', Int, iduserlogin)
         .query(querysearch)
         for (var resu of result.recordset) {
            let photopostvideo = new DTOPhotoPostVideo();   
            this.getinformationList(photopostvideo,resu);
            array.push(photopostvideo);
           }
       
        pool.close();
        return array;
 }

 static getPhotoPostVideoSearch=async(searchtext="")=>
 {
         
         let array=[];
         let querysearch = 
		 	` 
					 
			 SELECT 
			 u.IdUser as id, 
			 u.Name as nameortitle, 
			 u.Imagee as url,
			 'U' as typee
			 FROM Userr u
			 WHERE
			 u.Active=1	
			 AND
			 u.Name LIKE '%${searchtext}%'  
			 
			 UNION
			 
			 SELECT
			 p.idpost as id, 
			 p.title as nameortitle,
			 '' as url,
			 'P' as typee
			 FROM UserPost p
			 WHERE
			 p.Active=1	
			 AND
			 (p.title LIKE '%${searchtext}%'  
			 OR p.descriptionn LIKE '%${searchtext}%')  
			 
			 UNION
			 
			 SELECT
			 v.iduservideos as id,
			 v.title as nameortitle,
			 v.urlvideos as url,	
			 'V' as typee
			 FROM UserVideos v
			 WHERE
			 v.Active=1	
			 AND
			 v.title LIKE '%${searchtext}%'  
			 OR v.descriptionn LIKE '%${searchtext}%' 
			 
			 UNION
			 
			 SELECT 
			 i.iduserimages as id, 
			 i.title as nameortitle, 
			 i.urlimage as url, 
			 'I' as typee
			 FROM UserImages i
			 WHERE
			 i.Active=1	
			 AND
			 i.title  LIKE '%${searchtext}%'
			 OR i.descriptionn LIKE '%${searchtext}%'

         `  
         let pool = await Conection.conection();
         const result = await pool.request()
	
         .query(querysearch)
         for (var resu of result.recordset) {
            let photopostvideo = new DTOPhotoPostVideo();   
            this.getinformationSearch(photopostvideo,resu);
            array.push(photopostvideo);
           }
       
        pool.close();
        return array;
 }


 static getPhotoPostVideoByUser=async(iduserlogin,iduser)=>
 {
         
         let array=[];
		 let resultquery;
         let querysearch = 
		 ` 

		 IF  EXISTS ( 
			SELECT IdUserBlocker FROM BlockedUser WHERE
			IdUserBlocker = @iduserlogin AND IdUserBlocked = @iduser
			 )
		 BEGIN
		   select -1 as userblocked
		 END

		 ELSE
		 BEGIN
			SELECT
			UserPost.idpost as id,
			0 as idalbum,
			'' as albumtitle,
			UserPost.iduser,
			UserPost.title,
			UserPost.descriptionn,
			UserPost.likes,
			'' as url,
			UserPost.visibility,
			UserPost.datepublish,
			UserPost.active,
			Userr.Name as nameuser ,
			Userr.Nick as nickuser ,
			Userr.Email as emailuser,
			Userr.Imagee as imageuser,
			Userr.Country as countryuser,
			'P' as typee
			FROM UserPost
			INNER JOIN Userr ON Userr.IdUser = UserPost.IdUser
			WHERE Userr.Active = 1
			AND UserPost.Active = 1
			AND UserPost.IdUser = @iduser
			
			
			UNION
			
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
			
			FROM UserImages
			INNER JOIN AlbumUserImages ON AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages
			INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser
			WHERE Userr.Active = 1
			AND AlbumUserImages.Active = 1
			AND UserImages.Active = 1
			AND UserImages.IdUser = @iduser
			
			
			UNION
			
			SELECT
			UserVideos.iduservideos as id,
			UserVideos.idalbumvideos as idalbum ,
			AlbumUserVideos.title as albumtitle,
			UserVideos.iduser,
			UserVideos.title,
			UserVideos.descriptionn,
			UserVideos.likes,
			UserVideos.urlvideos as url,
			UserVideos.visibility,
			UserVideos.datepublish,
			UserVideos.active,
			
			Userr.Name as nameuser,
			Userr.Nick as nickuser,
			Userr.Email as emailuser,
			Userr.Imagee as imageuser,
			Userr.Country as countryuser,
			'V' as typee
			FROM UserVideos
			INNER JOIN AlbumUserVideos ON AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos
			INNER JOIN Userr ON Userr.IdUser = AlbumUserVideos.IdUser
			WHERE Userr.Active = 1
			AND AlbumUserVideos.Active = 1
			AND UserVideos.Active = 1
			AND UserVideos.IdUser = @iduser
			ORDER BY datepublish desc
		 END 

         `  
         let pool = await Conection.conection();
         const result = await pool.request()
		 .input('iduser', Int, iduser)  
		 .input('iduserlogin', Int, iduserlogin)   
         .query(querysearch)
		 resultquery = result.recordset[0].userblocked;
		 if(resultquery===undefined)
		 {
			for (var resu of result.recordset) {
				let photopostvideo = new DTOPhotoPostVideo();   
				this.getinformationList(photopostvideo,resu);
				array.push(photopostvideo);
				
			}
			resultquery=array;
		 }
        pool.close();
        return resultquery;
 }//TIMELINE USER 

 static getPhotoPostVideoUserLikes=async(iduser)=>
 {
         
         let array=[];
         let querysearch = 
		 ` 
		declare @iduser int= ${iduser};

		 SELECT 
		 UserPost.idpost as id, 
		 0 as idalbum,
		 '' as albumtitle,
		 UserPost.iduser, 
		 UserPost.title, 
		 UserPost.descriptionn, 
		 UserPost.likes,
		 '' as url,
		 UserPost.visibility,
		 UserPost.datepublish, 
		 UserPost.active, 
		 Userr.Name as nameuser , 
		 Userr.Nick as nickuser , 
		 Userr.Email as emailuser, 
		 Userr.Imagee as imageuser,
		 Userr.Country as countryuser, 
		 'P' as typee  
		 FROM LikePost 
		 INNER JOIN UserPost ON UserPost.IdPost = LikePost.IdPost 
		 INNER JOIN Userr ON Userr.IdUser = UserPost.IdUser
		 WHERE Userr.Active = 1 
		 AND UserPost.Active = 1 
		 AND LikePost.IdUser = @iduser
		 
		 UNION

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

		 FROM LikeImage
		 INNER JOIN UserImages ON UserImages.IdUserImages = LikeImage.IdUserImages
		 INNER JOIN AlbumUserImages ON AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages  
		 INNER JOIN Userr ON Userr.IdUser = AlbumUserImages.IdUser
		 WHERE Userr.Active = 1 
		 AND AlbumUserImages.Active = 1 
		 AND UserImages.Active = 1 
		 AND LikeImage.IdUser = @iduser
		 UNION
   					SELECT 
					UserVideos.iduservideos as id, 
					UserVideos.idalbumvideos as idalbum ,
					AlbumUserVideos.title as albumtitle, 
					UserVideos.iduser, 
					UserVideos.title, 
					UserVideos.descriptionn, 
					UserVideos.likes,
					UserVideos.urlvideos as url,
					UserVideos.visibility,
					UserVideos.datepublish, 
				    UserVideos.active, 
					
					Userr.Name as nameuser, 
					Userr.Nick as nickuser, 
					Userr.Email as emailuser, 
					Userr.Imagee as imageuser, 
					Userr.Country as countryuser,
					'V' as typee 
					FROM LikeVideo
					INNER JOIN UserVideos ON UserVideos.IdUserVideos = LikeVideo.IdUserVideos
					INNER JOIN AlbumUserVideos ON AlbumUserVideos.IdAlbumVideos = UserVideos.IdAlbumVideos  
					INNER JOIN Userr ON Userr.IdUser = AlbumUserVideos.IdUser
					WHERE Userr.Active = 1 
					AND AlbumUserVideos.Active = 1 
					AND UserVideos.Active = 1 
					AND LikeVideo.IdUser = @iduser
					order by datepublish desc

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
 }//Get all  that the user gave like

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
  static  getinformationSearch(photopostvideo,result) {
    
    photopostvideo.id = result.id; 
  
    photopostvideo.nameortitle = result.nameortitle;
   
    photopostvideo.url = result.url;
  
    photopostvideo.type = result.typee;
  
   
  
  }
  //#endregion
}
module.exports = { DataPhotoPostVideo };