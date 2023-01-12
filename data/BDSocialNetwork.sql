
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

--drop table UserrMessage


--drop table UserVideos
--drop table UserImages
--drop table AlbumUserVideos
--drop table AlbumUserImages

--drop table UserrRelations
--drop table Userr


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
		 AND UserPost.IdUser = 1
		
		 
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
		 AND UserImages.IdUser = 1
		
		 
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
		 AND UserVideos.IdUser = 1
		 ORDER BY datepublish desc

