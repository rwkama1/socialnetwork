use socialnetwork
go


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

CREATE TABLE UserrMessage(
	IdUserMessages int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdSender int not null Foreign Key References Userr(IdUser),
	Title varchar(50) NOT NULL,
	Textt varchar(200) NOT NULL,
	DateeTime DateTime NOT NULL,
	Seen bit not null,
	Answered bit not null
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
CREATE TABLE UserEvent(
	IdUserEvent int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	Typee varchar(50) NOT NULL,
	Descriptionn varchar(500) NOT NULL,
	DatePublish Date  not null,
	DateEvent DateTime  not null
)
go
CREATE TABLE UserEventInvitation(

	IdUserEventInv int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserEvent int not null Foreign Key References UserEvent(IdUserEvent),
	IdFriend int not null Foreign Key References Userr(IdUser),
	Statee varchar(50) not null

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
	IdUserCommentImg int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
	IdUserVideos int not null Foreign Key References UserVideos(IdUserVideos)
)
go
CREATE TABLE UserrCommentsEvent(
	IdUserCommentImg int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
	IdUserEvent int not null Foreign Key References UserEvent(IdUserEvent)
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
CREATE TABLE UserrImageTags(
	IdUserTag int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdFriend int not null Foreign Key References Userr(IdUser),
	IdUserImages int not null Foreign Key References UserImages(IdUserImages),
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
CREATE TABLE LikeEvent(
	IdLikeEvent int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdUser int not null Foreign Key References Userr(IdUser),
	IdUserEvent int not null Foreign Key References UserEvent(IdUserEvent),
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

--drop table LikeSubComment
--drop table LikeComment
--drop table LikePost
--drop table LikeVideo
--drop table LikeImage
--drop table LikeEvent

--drop table UserrSubComments
--drop table UserrCommentsImage
--drop table UserrCommentsEvent
--drop table UserrCommentsVideo
--drop table UserrCommentsPost
--drop table UserrComments

--drop table UserPost
--drop table UserrImageTags


--drop table UserrMessage
--drop table UserEventInvitation
--drop table UserEvent

--drop table UserVideos
--drop table UserImages
--drop table AlbumUserVideos
--drop table AlbumUserImages

--drop table UserrRelations
--drop table Userr

    select 
            UserrRelations.* 
          from 
            UserrRelations 
            inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
          where 
            Userr.Active = 1 
            and UserrRelations.IdUser = 34

select getutcdate()
select * from userr
 where iduser=6
select * from AlbumUserImages
select * from AlbumUserVideos
select * from  UserImages

select * from  UserVideos
select * from  UserPost
select * from userrrelations where iduser=1
select * from uservideos



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
					and UserrRelations.IdUser = 1
					
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
					and UserrRelations.IdUser = 1
									
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
                    and UserrRelations.IdUser = 1
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
					and Userr.Country='USA'

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
					and Userr.Country='USA'

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
					and Userr.Country='USA'
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
		
		
		 select distinct  * from friendsquery 
		 union  
		 select distinct * from countryquery
		 union all
		 select  distinct * from publicquery
		
		















































--friends query 
				
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
					and UserrRelations.IdUser = 25
					
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
					and UserrRelations.IdUser = 25
									
			

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
                    and UserrRelations.IdUser = 25


					UNION all
--user same country query
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
					and Userr.Country='USA'

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
					and Userr.Country='USA'

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
					and Userr.Country='USA'
--all users query
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
					
					order by  desc
				

				select * from userr where iduser=9
					












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
					and Userr.Country='United Kingdom'
------------------------------------------------------------------------
----I get all the images, publications and images of the friends of the logged user

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
					'V' as typee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.idalbumvideos = UserVideos.idalbumvideos 
					inner join Userr on Userr.IdUser = AlbumUserVideos.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserVideos.Active = 1 
					and UserVideos.Active = 1 
					and Userr.Country='United Kingdom')

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
					'P' as typee  
					from 
					UserPost 
					inner join Userr on Userr.IdUser = UserPost.IdUser 
					where 
				    Userr.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Visibility='Public'
					
					ORDER BY datepublish DESC















					
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
					'I' as typee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
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
					'V' as typee 
					from 
					UserVideos 
					inner join AlbumUserVideos on AlbumUserVideos.idalbumvideos = UserVideos.idalbumvideos 
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
					'P' as typee  
					from 
					UserPost 
					inner join Userr on Userr.IdUser = UserPost.IdUser 
					where 
				    Userr.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Active = 1 
					and UserPost.Visibility='Public'
					
					ORDER BY datepublish DESC















					 
				SELECT 
                 UserPost.* FROM 
                 UserPost 

                 Userr.Name, 
                 Userr.Nick, 
                 Userr.Email, 
                 Userr.Imagee 
                
                 INNER JOIN  Userr on Userr.IdUser = UserPost.IdUser 
                 WHERE 
                 Userr.Active = 1 
                 AND UserPost.Active = 1 
                 AND UserPost.IdPost = 4



SELECT  * FROM  UserrRelations WHERE IdUser =1 And IdFriend =2

  select 
              UserrRelations.* 
            from 
              UserrRelations 
              inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
            where 
              Userr.Active = 1 
              and UserrRelations.IdUser =34 
             and UserrRelations.IdFriend = 33

update userr  set active=0  where iduser=34
	IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=${iduser} and Active=1)
    BEGIN
    select -1 as notexistuser
    END
	ELSE
	BEGIN 
		 IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=${idfriend} and Active=1)
		BEGIN
		select -2 as notexistfriend
		END
		ELSE
		BEGIN 
			IF  NOT EXISTS ( SELECT * FROM UserrRelations WHERE IdUser=${iduser} and IdFriend=${idfriend})
			BEGIN
			select -3 as notexistduplicate
			END
			ELSE
			BEGIN		 
				BEGIN TRANSACTION 
				delete from UserrRelations where IdUser=${iduser} and IdFriend=${idfriend} 
				delete from UserrRelations where IdUser=${idfriend} and IdFriend=${iduser} 
				select 1 as deletedsuccess
				IF(@@ERROR > 0)  
				BEGIN  
					ROLLBACK TRANSACTION  
				END  
				ELSE  
				BEGIN  
				  COMMIT TRANSACTION  
				END  
			END
		END 
	END 
   
   





   
    IF  EXISTS ( SELECT * FROM UserrRelations WHERE IdUser=@IdUser and IdFriend=@IdFriend)
    BEGIN
    select -3 as existduplicate
    END
    ELSE
    BEGIN
    BEGIN TRANSACTION  
    insert into UserrRelations values (@IdUser,@IdFriend,'Pending') 
    insert into UserrRelations values (@IdFriend,@IdUser,'Pending') 
    select 1 as insertsuccess
      IF(@@ERROR > 0)  
      BEGIN  
          ROLLBACK TRANSACTION  
      END  
      ELSE  
      BEGIN  
        COMMIT TRANSACTION  
      END 
    END 


  select 
        Count(Userr.IdUser) as NumberFriend 
      from 
        UserrRelations 
        inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
      where 
        Userr.Active = 1 
        and UserrRelations.IdUser = ${iduser} 
        and UserrRelations.Statee = 'Confirmed'

--ALTER TABLE UserImages
--  alter column  Likes int not NULL 
--insert into Userr values('User','Nick1','UserName1','Password1','asfasfasfasfaf','1989-05-02',1,'email1@gmail.com','','','','','','','','','','','')

--update Userr set Name='UserUpdate',Nick='Nickupdate',UserrName='Usernameupdate'
----delete from Userr where iduser=1


--	delete from Userr 
 


select * from userr

update userr set Active=1

			SELECT userr.*
		FROM   userrrelations
			   INNER JOIN userr
					   ON userr.iduser = userrrelations.idfriend
			WHERE  userr.active = 1
				   AND userrrelations.iduser = 25
				   AND userrrelations.statee = 'Confirmed' 



	--select * from UserImages
	--delete from userrrelations
	--select UserImages.*,AlbumUserImages.Title as TitleAlbum,Userr.Name as NameUser,Userr.UserrName,Userr.Imagee as UserImage,Userr.Email as UserEmail from UserImages inner join AlbumUserImages on AlbumUserImages.IdAlbumImages=UserImages.IdAlbumImages
	--inner join Userr on Userr.IdUser=AlbumUserImages.IdUser where Userr.Active=1 and AlbumUserImages.Active=1 and Userimages.Active=1
	--and UserImages.IdUserImages=2 

	select 
  Count(Userr.IdUser) as NumberFriend 
from 
  UserrRelations 
  inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
where 
  Userr.Active = 1 
  and UserrRelations.IdUser = 15 









  delete from UserrRelations
	 
	--update Userr set Active=1 where IdUser=3

	--insert into AlbumUserImages values(3,'AlbumImageUser3',1)
	  SELECT * FROM UserrRelations as urel1 
                 INNER JOIN  UserrRelations as urel2
                 ON urel2.IdFriend=urel1.IdFriend and urel2.IdUser=14 and urel2.IdFriend!=10
                 INNER JOIN Userr as u on u.IdUser=urel2.IdFriend 
                 WHERE urel1.IdUser=10 and urel2.IdFriend!=14 
				 --and  urel1.Statee='Confirmed' and urel2.Statee='Confirmed'  


	
	select * from AlbumUserImages
	select * from UserImages
	select * from UserrRelations
	select * from userr
	select * from userpost

	select * from UserImages where iduser=3

select * from userr

 update Userr set Country='United Kingdom' where iduser between 1 and 29

  update UserImages set Visibility='Friend' where iduserimages in (25,30)
	select * from UserrRelations
	select * from userr
			
			-- 45 no tiene amigos
					

		IF EXISTS (
				select 
				  UserrRelations.*
				from 
				  UserrRelations 
				  inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
				where 
				  Userr.Active = 1 
				  and UserrRelations.IdUser =60
				  and UserrRelations.Statee = 'Confirmed'
				  )

		BEGIN
			    SELECT 
                UserImages.*, 
                AlbumUserImages.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                inner join UserrRelations on UserrRelations.IdFriend = Userr.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserrRelations.Statee = 'Confirmed' 
                and (UserImages.Visibility='Public' or UserImages.Visibility='Friend') 
                and UserrRelations.IdUser = 60
				
				union
				SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
					and Userr.Country = 'United Kingdom'
					ORDER BY DATEPUBLISH DESC
		END
		ELSE
		BEGIN
						
			IF EXISTS (
				SELECT 
                UserImages.*
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserImages.Visibility='Public'
				and Userr.Country = 'USAA'
				)
			BEGIN			
					SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
					and Userr.Country = 'USA'
		    END
            ELSE 
			BEGIN
				SELECT 
					UserImages.*, 
					AlbumUserImages.Title as AlbumTitle, 
					Userr.Name, 
					Userr.Nick, 
					Userr.Email, 
					Userr.Imagee 
					from 
					UserImages 
					inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
					inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
					where 
					Userr.Active = 1 
					and AlbumUserImages.Active = 1 
					and UserImages.Active = 1 
					and UserImages.Visibility='Public'
			END 		  
		END















				SELECT 
                UserImages.*, 
                AlbumUserImages.Title as AlbumTitle, 
                Userr.Name, 
                Userr.Nick, 
                Userr.Email, 
                Userr.Imagee 
                from 
                UserImages 
                inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
                inner join Userr on Userr.IdUser = AlbumUserImages.IdUser 
                where 
                Userr.Active = 1 
                and AlbumUserImages.Active = 1 
                and UserImages.Active = 1 
                and UserImages.Visibility='Public'
				and Userr.Country = 'USA'
               


			select * from userimages where userimages.iduser=26
		

			select * from userr  where country='USA' 

				select * from userr  where iduser=
				  
				  update 




		--IF EXISTS ( SELECT UserrRelations.* FROM  UserrRelations 
		--				 INNER JOIN Userr ON Userr.IdUser = UserrRelations.IdFriend 
		--				WHERE 
		--				 Userr.Active = 1 
		--			     AND UserrRelations.IdUser =1
		--				 AND UserrRelations.IdFriend =2
		--				 AND UserrRelations.Statee = 'Confirmed' 
		--		  )
		--BEGIN
		--	SELECT 
  --           UserImages.*, 
  --           AlbumUserImages.Title as AlbumTitle, 
  --           Userr.Name, 
  --           Userr.Nick, 
  --           Userr.Email, 
  --           Userr.Imagee 
  --           FROM 
  --           UserImages 
  --           INNER JOIN AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
  --           INNER JOIN Userr on Userr.IdUser = AlbumUserImages.IdUser 
  --           WHERE 
  --           Userr.Active = 1 
  --           AND AlbumUserImages.Active = 1 
  --           AND UserImages.Active = 1 
		--	 AND  (UserImages.Visibility='Friend' OR UserImages.Visibility='Public')
  --           AND UserImages.IdUser = 2
		--END
		--ELSE
		--BEGIN
		--	SELECT 
		--		 UserImages.*, 
		--		 AlbumUserImages.Title as AlbumTitle, 
		--		 Userr.Name, 
		--		 Userr.Nick, 
		--		 Userr.Email, 
		--		 Userr.Imagee 
		--		 FROM 
		--		 UserImages 
		--		 INNER JOIN AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages 
		--		 INNER JOIN Userr on Userr.IdUser = AlbumUserImages.IdUser 
		--		 WHERE 
		--		 Userr.Active = 1 
		--		 AND AlbumUserImages.Active = 1 
		--		 AND UserImages.Active = 1 
		--		 AND  UserImages.Visibility='Public'
		--		 AND UserImages.IdUser = 2
		--END








	