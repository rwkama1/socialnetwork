
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




declare @IdUser Int;
set @IdUser=1;

   SELECT 
         nsc.IdNotiSubComment as IdNotification, 
         u.IdUser as IdUserSender, 
         u.Name as NameSender, 
         u.Imagee as ImageSender,  
         COALESCE(up.IdPost, ui.IdUserImages, uv.IdUserVideos) as IdImagePostVideo, 
         COALESCE(up.Title, ui.Title, uv.Title) as TitleImagePostVideo, 
         CASE 
             WHEN up.IdPost IS NOT NULL THEN 'P' 
             WHEN ui.IdUserImages IS NOT NULL THEN 'I' 
             WHEN uv.IdUserVideos IS NOT NULL THEN 'V' 
             ELSE 'Not Found'
         END as Typee,
         nsc.DateeTime
      
        FROM 
         NotificationSubComment nsc 
        JOIN Userr u ON nsc.IdUserSender = u.IdUser 
        JOIN UserrComments uc ON nsc.IdUserComment = uc.IdUserComment 
        LEFT JOIN UserrCommentsPost ucp ON uc.IdUserComment = ucp.IdUserComment
        LEFT JOIN UserPost up ON ucp.IdPost = up.IdPost
        LEFT JOIN UserrCommentsImage uci ON uc.IdUserComment = uci.IdUserComment
        LEFT JOIN UserImages ui ON uci.IdUserImages = ui.IdUserImages
        LEFT JOIN UserrCommentsVideo ucv ON uc.IdUserComment = ucv.IdUserComment
        LEFT JOIN UserVideos uv ON ucv.IdUserVideos = uv.IdUserVideos
        WHERE 
        nsc.IdUserReceived = @IdUser 
     

        UNION 

        SELECT 
        nci.IdNotiCoImage as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender,  
        ui.IdUserImages as IdImagePostVideo, 
        ui.title as TitleImagePostVideo, 
        'I' as Typee,
        nci.DateeTime 
        FROM 
        NotificationCommentImage nci 
        JOIN Userr u ON nci.IdUserSender = u.IdUser 
        JOIN UserImages ui ON nci.IdUserImages = ui.IdUserImages 
        WHERE 
        nci.IdUserReceived = @IdUser

        UNION 

        SELECT 
        ncp.IdNotiCoPost as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender,
        up.IdPost as IdImagePostVideo, 
        up.title as TitleImagePostVideo, 
        'P' as Typee, 
        ncp.DateeTime
        FROM 
        NotificationCommentPost ncp 
        JOIN Userr u ON ncp.IdUserSender = u.IdUser 
        JOIN UserPost up ON ncp.IdPost = up.IdPost 
        WHERE 
        ncp.IdUserReceived = @IdUser 

      UNION 

      SELECT 
        ncv.IdNotiCoVideo as IdNotification, 
        u.IdUser as IdUserSender, 
        u.Name as NameSender, 
        u.Imagee as ImageSender, 
        uv.IdUserVideos as IdImagePostVideo, 
        uv.title as TitleImagePostVideo, 
        'V' as Typee, 
        ncv.DateeTime
      FROM 
        NotificationCommentVideo ncv 
        JOIN Userr u ON ncv.IdUserSender = u.IdUser 
        JOIN UserVideos uv ON ncv.IdUserVideos = uv.IdUserVideos 
      WHERE 
        ncv.IdUserReceived = @IdUser 
      ORDER BY 
        DateeTime DESC
