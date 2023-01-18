
---------------------------------------------
----TABLES
CREATE TABLE Userr(
	IdUser int NOT NULL PRIMARY KEY Identity(1,1) ,
	Name varchar(20) NOT NULL,
	Nick varchar(20) NOT NULL,
	UserrName varchar(30) not null,
	Passwordd varchar(1000) NOT NULL,
	Hashh varchar(1000) NOT NULL,
	BirthDate Date NOT NULL,
	DateEntry Date NOT NULL,
	Active bit NOT NULL,
	Email varchar(60) NOT NULL,
	Addresss varchar(50)  NULL,
	Occupation varchar(50)  NULL,
	MartailStatus varchar(50)  NULL,
	WebSite varchar(50)  NULL,
	Gender varchar(50)  NULL,
	City varchar(20)  NULL,
	Province varchar(20)  NULL,
	Descriptionn varchar(100)  NULL,
	Country varchar(40)  NULL,
	Statee varchar(200)  NULL,
	Imagee varchar(200)  NULL,
	UrlFacebook varchar(200)  NULL,
	UrlTwitter varchar(200)  NULL,
	UrlInstagram varchar(200)  NULL,
	UrlLinkedin varchar(200)  NULL,
	Coverphoto varchar(200)  NULL,
	Visibility varchar(20) NULL
) 
go


CREATE TABLE UserrRelations(
	IdUserRelation int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdFriend int not null Foreign Key References Userr(IdUser),
	Statee varchar(20) not null 
)
go


CREATE TABLE AlbumUserImages(
	IdAlbumImages int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	Title varchar(50) NOT NULL,
	Active bit not null

)
go
CREATE TABLE UserImages(
	IdUserImages int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdAlbumImages int not null Foreign Key References AlbumUserImages(IdAlbumImages),
	Title varchar(50) NOT NULL,
	Descriptionn varchar(700) NOT NULL,
	Likes int NOT NULL,
	Urlimage varchar(100) NOT NULL,
	Visibility varchar(20) not null,
	DatePublish DateTime  not null,
	
	Active bit not null,
)
go
CREATE TABLE UserPost(
	IdPost int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	Title varchar(50) NOT NULL,
	Descriptionn varchar(700) NOT NULL,
	Likes int NOT NULL,
	Visibility varchar(20) not null,
	DatePublish DateTime  not null,
	Active bit not null,
)
go

CREATE TABLE AlbumUserVideos(
	IdAlbumVideos int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	Title varchar(50) NOT NULL,
	Active bit not null

)
go
CREATE TABLE UserVideos(
	IdUserVideos int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdAlbumVideos int not null Foreign Key References AlbumUserVideos(IdAlbumVideos),
	Title varchar(50) NOT NULL,
	Likes int NOT NULL,
	Descriptionn varchar(100) NOT NULL,
	Urlvideos varchar(100) NOT NULL,
	Visibility varchar(20) not null,
    DatePublish DateTime  not null,
	Active bit not null,
)
go


CREATE TABLE UserrComments(
	IdUserComment int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	Textt varchar(500) NOT NULL,
	Likes int NOT NULL,
	DatePublish DateTime  not null,
	Visibility varchar(20) not null
)
go
CREATE TABLE UserrCommentsImage(
	IdUserCommentImg int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
	IdUserImages int not null Foreign Key References UserImages(IdUserImages)
)
go
CREATE TABLE UserrCommentsPost(
	IdUserCommentPost int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
	IdPost int not null Foreign Key References UserPost(IdPost)
)
go
CREATE TABLE UserrCommentsVideo(
	IdUserCommentVideo int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
	IdUserVideos int not null Foreign Key References UserVideos(IdUserVideos)
)
go



CREATE TABLE UserrSubComments(
	IdSubUserComment int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
   IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
   	Likes int NOT NULL,
	Textt varchar(700) NOT NULL,
    DatePublish DateTime  not null
)
go

CREATE TABLE LikeImage(
	IdLikeImage int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdUserImages int not null Foreign Key References UserImages(IdUserImages),
)
go
CREATE TABLE LikeVideo(
	IdLikeVideo int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdUserVideos int not null Foreign Key References UserVideos(IdUserVideos),
)
go
CREATE TABLE LikePost(
	IdLikePost int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdPost int not null Foreign Key References UserPost(IdPost),
)
go

CREATE TABLE LikeComment(
	IdLikeComment int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
)
go
CREATE TABLE LikeSubComment(
	IdLikeSubComment int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdSubUserComment int not null Foreign Key References UserrSubComments(IdSubUserComment),
)
go

CREATE TABLE LoginUser(
	IdLoginUser int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	LoginDateAndTime DateTime  not null,
)
go
CREATE TABLE Logs(
	IdLog int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	LogDateAndTime DateTime  not null,
	DetailLog varchar(30) not null
)
go
CREATE TABLE Followers(
	IdFollow int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdFollowerUser int not null Foreign Key References Userr(IdUser),
	IdFollowedUser int not null Foreign Key References Userr(IdUser),
)
go
CREATE TABLE ChatRoom(
	IdRoom int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdUserSender int not null Foreign Key References Userr(IdUser),
)
go
CREATE TABLE UserrMessage(
	IdUserMessages int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdSender int not null Foreign Key References Userr(IdUser),
	IdRoom int not null Foreign Key References ChatRoom(IdRoom),
	Title varchar(50) NOT NULL,
	Textt varchar(200) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null,
	Answered bit not null
)
go



-- NOTIFICATIONS


CREATE TABLE NotificationCommentImage(
	IdNotiCoImage int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdUserSender int not null Foreign Key References Userr(IdUser),
	IdUserImages int not null Foreign Key References UserImages(IdUserImages),
	Messagee varchar(50) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null,
)
go
CREATE TABLE NotificationCommentPost(
	IdNotiCoPost int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdUserSender int not null Foreign Key References Userr(IdUser),
	IdPost int not null Foreign Key References UserPost(IdPost),
	Messagee varchar(50) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null,
)
go
CREATE TABLE NotificationCommentVideo(
	IdNotiCoVideo int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdUserSender int not null Foreign Key References Userr(IdUser),
	IdUserVideos int not null Foreign Key References UserVideos(IdUserVideos),
	Messagee varchar(50) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null
)
go
CREATE TABLE NotificationSubComment(
	IdNotiSubComment int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdUserSender int not null Foreign Key References Userr(IdUser),
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
	Messagee varchar(50) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null
)
go
CREATE TABLE NotificationMessage(
	IdNotiUser int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserReceived int not null Foreign Key References Userr(IdUser),
	IdUserSender int not null Foreign Key References Userr(IdUser),
	IdUserMessages int not null Foreign Key References UserrMessage(IdUserMessages),
	Messagee varchar(50) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null
)
go

--drop table NotificationCommentImage
--drop table NotificationCommentPost
--drop table NotificationCommentVideo
--drop table NotificationSubComment
--drop table NotificationMessage

--drop table UserrMessage
--drop table ChatRoom

--drop table Followers
--drop table Log
--drop table LoginUser
--drop table LikeSubComment
--drop table LikeComment
--drop table LikePost
--drop table LikeVideo
--drop table LikeImage


--drop table UserrSubComments
--drop table UserrCommentsImage

--drop table UserrCommentsVideo
--drop table UserrCommentsPost
--drop table UserrComments

--drop table UserPost




--drop table UserVideos
--drop table UserImages
--drop table AlbumUserVideos
--drop table AlbumUserImages

--drop table UserrRelations
--drop table Userr


select * from UserrMessage
select * from ChatRoom

select * from NotificationCommentImage
select * from NotificationCommentPost
select * from NotificationCommentVideo
select * from NotificationSubComment
select * from NotificationMessage


select * from AlbumUserImages
select * from AlbumUserVideos
select * from UserImages
select * from UserVideos
select * from UserPost
select * from UserrRelations

select * from Followers
select * from Logs
select * from LoginUser


select * from LikePost
select * from LikeVideo
select * from LikeImage
select * from LikeSubComment
select * from LikeComment
 
select * from Userr
select * from UserrCommentsImage
select * from UserrCommentsPost
select * from  UserrCommentsVideo
select * from UserrComments
select * from UserrSubComments
select * from UserrMessage



delete from LoginUser
delete from Logs
delete from UserImages
 delete from Followers
 
delete from ChatRoom








DECLARE @iduserlogin INT;
SET @iduserlogin = 2;
	

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

