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
	IdUserCommentVideo int NOT NULL PRIMARY KEY Identity(1,1) ,
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


			SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrSubComments.idsubusercomment,
			UserrSubComments.likes as likessubcomment,
			UserrSubComments.textt as textsubcomment,
			UserrSubComments.datepublish as datepublishsubcomment,
			Userr.*
            FROM 
            UserrComments
			inner join  UserrSubComments on UserrSubComments.idusercomment=UserrComments.idusercomment
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			 Userr.Active=1
            AND UserrComments.idusercomment=7 


     IF NOT EXISTS ( SELECT * FROM UserrCommentsImage WHERE idusercomment=2 and iduserimages=1)
        BEGIN
            select -1 as notexistcommentimage
        END
        ELSE
        BEGIN
            IF NOT EXISTS ( SELECT * FROM UserImages WHERE iduserimages=1 and Active=1)
            BEGIN
                select -2 as notexistimage
            END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=4 and Active=1)
                BEGIN
                    select -3 as notexistuser
                END
                ELSE
                BEGIN
                    IF NOT EXISTS ( SELECT * FROM UserrComments WHERE IdUser=4 and idusercomment=2)
                    BEGIN
                        select -4 as notexistcomment
                    END
                    ELSE
                    BEGIN
                            BEGIN TRANSACTION  
                            IF EXISTS ( SELECT * FROM UserrSubComments WHERE  idusercomment=1)
                            BEGIN
                                delete from UserrSubComments where idusercomment=2
                            END
                            delete from UserrCommentsImage where idusercomment=2
                            delete from UserrComments where idusercomment=2 and iduser=4
                            select 1 as commentimagedeleted
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
         END



 		 SELECT 
         COUNT(*) as numberlikes
		 FROM 
          LikeImage
         inner join UserImages on UserImages.iduserimages = LikeImage.iduserimages
		WHERE 
          UserImages.Active = 1
		 and LikeImage.iduserimages=1



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


select * from UserrComments
select * from UserrCommentsPost
select * from UserrSubComments


select * from  LikeImage
select * from  UserPost
select * from  UserImages
select * from UserrCommentsImage

select * from  LikePost
select * from  LikeVideo
select * from  LikeComment
select * from  LikeSubComment

  UPDATE UserImages SET Likes = 1 where iduserimages=2
   UPDATE UserImages SET Likes = 1 where iduserimages=3
    UPDATE UserImages SET Likes = 1 where iduserimages=4
	 UPDATE UserImages SET Likes = 1 where iduserimages=5
	  UPDATE UserImages SET Likes = 1 where iduserimages=6
	   UPDATE UserImages SET Likes = 1 where iduserimages=7
	    UPDATE UserImages SET Likes = 1 where iduserimages=8
		 UPDATE UserImages SET Likes = 1 where iduserimages=9


		  UPDATE UserImages SET Visibility ='Public' where iduserimages=1
		  UPDATE UserImages SET Visibility ='Public' where iduserimages=2

  select * from  UserImages
select * from UserrComments
select * from UserrCommentsVideo
select * from  UserVideos

select * from UserrSubComments

select * from likesubcomment

insert into LikeImage values (3,2)
insert into LikeImage values (3,3)
insert into LikeImage values (3,4)
insert into LikeImage values (3,5)
insert into LikeImage values (3,6)
insert into LikeImage values (3,7)
insert into LikeImage values (3,8)
insert into LikeImage values (3,9)



insert into LikeSubComment values (1,21)
insert into LikeSubComment values (3,21)
insert into LikeSubComment values (4,21)
insert into LikeSubComment values (5,21)
insert into LikeSubComment values (6,21)

insert into LikeComment values (4,7)
insert into LikeComment values (1,7)
insert into LikeComment values (5,7)
insert into LikeComment values (6,7)
insert into LikeComment values (7,7)
insert into LikeComment values (8,7)
insert into LikeComment values (9,7)

  
		 SELECT 
          UserPost.*, 
          Userr.Name, 
          Userr.Nick, 
          Userr.Email, 
          Userr.Imagee 
          FROM 
          LikeImage 
          inner join UserPost on UserPost.idpost = LikePost.idpost 
          inner join Userr on Userr.IdUser = UserPost.IdUser
          WHERE 
          Userr.Active = 1 
          and UserPost.Active = 1 
          and LikePost.iduser=1
    
            UserrSubComments.idusercomment=14



delete from userrsubcomments where idsubusercomment=20

insert into UserrComments values (1,'VideoCommentText',0,getutcdate(),'Public')
insert into UserrCommentsVideo values (19,1)


insert into UserrSubComments values(1,14,0,'SubCommentText',getutcdate())
insert into UserrSubComments values(1,14,0,'SubCommentText',getutcdate())
insert into UserrSubComments values(1,14,0,'SubCommentText',getutcdate())
insert into UserrSubComments values(1,14,0,'SubCommentText',getutcdate())
insert into UserrSubComments values(1,14,0,'SubCommentText',getutcdate())
insert into UserrSubComments values(1,14,0,'SubCommentText',getutcdate())

insert into UserrSubComments values(1,7,0,'SubCommentText',getutcdate())

select * from  UserVideos
select * from  UserPost
select * from userrrelations where iduser=1
select * from uservideos

select * from  LikeImage
select * from  LikePost
select * from  LikeVideo
select * from  LikeComment




       SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrCommentsPost.idusercommentpost,
		    UserrCommentsPost.idpost,
			Userr.*
            FROM 
            UserrComments
            inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
			inner join  UserPost on UserPost.idpost=UserrCommentsPost.idusercommentpost
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			UserPost.Active = 1
			AND Userr.Active=1
            AND UserrCommentsPost.idpost=1




select * from  LikeImag

		SELECT 
         UserImages.*, 
         AlbumUserImages.Title as AlbumTitle, 
         Userr.Name, 
         Userr.Nick, 
         Userr.Email, 
         Userr.Imagee 
         FROM 
         LikeImage 
         inner join UserImages on UserImages.iduserimages = LikeImage.iduserimages 
         inner join AlbumUserImages on AlbumUserImages.IdAlbumImages = UserImages.IdAlbumImages  
         inner join Userr on Userr.IdUser = AlbumUserImages.IdUser
		 WHERE 
		  Userr.Active = 1 
          and AlbumUserImages.Active = 1 
          and UserImages.Active = 1 
		  and LikeImage.iduser=3


select * from  UserImages


select * from UserrComments
select * from UserrCommentsPost
select * from UserrSubComments
	
		IF NOT EXISTS (SELECT idusercomment  from --I check if the image has comments with subcomments
				(
					SELECT 
					UserrComments.idusercomment
					FROM 
					UserrComments
					inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
					inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
					inner join  UserrSubComments on UserrSubComments.idusercomment=UserrComments.idusercomment
					inner join Userr on Userr.iduser=UserrComments.iduser
					WHERE 
					UserPost.Active = 1
					AND Userr.Active=1
					AND UserrCommentsPost.idpost=1

				) AS commentsubcomentpost

		)
		BEGIN --if there are no subcomments then list all comments without subcomments

			SELECT 	
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,

			UserrCommentsPost.idusercommentpost,
		    UserrCommentsPost.idpost,

			0 as idsubusercomment,
			0 as likessubcomment,
			'' as textsubcomment,
			0 as datepublishsubcomment,

			0 as idsubcommentuser,
			'' as namesubcommentuser,
			'' as nicksubcommentuser,
			'' as usernamesubcommentuser,
			'' as imagesubcommentuser,

			Userr.iduser as idcommentuser,
			Userr.name as namecommentuser,
			Userr.nick as nickcommentuser,
			Userr.userrname as usernamecommentuser,
			Userr.imagee as imagecommentuser,

			0 as withsubcomments
            FROM 
            UserrComments
            inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
			inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
			inner join Userr  on Userr.iduser=UserrComments.iduser
		      WHERE 
			UserPost.Active = 1
			AND Userr.Active=1
            AND UserrCommentsPost.idpost=1
		END  
		ELSE 
		BEGIN --if there are subcomments then query all comments with subcomments
			
			SELECT
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,

			UserrCommentsPost.idusercommentpost,
		    UserrCommentsPost.idpost,

			UserrSubComments.idsubusercomment as idsubusercomment  ,
			UserrSubComments.likes as likessubcomment,
			UserrSubComments.textt as textsubcomment,
			UserrSubComments.datepublish as datepublishsubcomment,

			Usersubcomment.iduser as idsubcommentuser,
			Usersubcomment.name as namesubcommentuser,
			Usersubcomment.nick as nicksubcommentuser,
			Usersubcomment.userrname as usernamesubcommentuser,
			Usersubcomment.imagee as imagesubcommentuser,

			Usercomment.iduser as idcommentuser,
			Usercomment.name as namecommentuser,
			Usercomment.nick as nickcommentuser,
			Usercomment.userrname as usernamecommentuser,
			Usercomment.imagee as imagecommentuser,
			1 as withsubcomments
            FROM 
            UserrComments
            inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
			inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
			inner join  UserrSubComments on UserrComments.idusercomment=UserrSubComments.idusercomment
			inner join Userr as Usercomment on Usercomment.iduser=UserrComments.iduser
			inner join Userr as Usersubcomment on Usersubcomment.iduser=UserrSubComments.iduser
            WHERE 
			UserPost.Active = 1
			AND Usercomment.Active=1
			AND Usersubcomment.Active=1
			AND UserrCommentsPost.idpost=1

			union all

			SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,

			UserrCommentsPost.idusercommentpost,
		    UserrCommentsPost.idpost,

			0 as idsubusercomment,
			0 as likessubcomment,
			'' as textsubcomment,
			0 as datepublishsubcomment,


			0 as idsubcommentuser,
			'' as namesubcommentuser,
			'' as nicksubcommentuser,
			'' as usernamesubcommentuser,
			'' as imagesubcommentuser,

			Userr.iduser as idcommentuser,
			Userr.name as namecommentuser,
			Userr.nick as nickcommentuser,
			Userr.userrname as usernamecommentuser,
			Userr.imagee as imagecommentuser,
			0 as withsubcomments
            FROM 
             UserrComments
            inner join UserrCommentsPost on UserrCommentsPost.idusercomment = UserrComments.idusercomment
			inner join  UserPost on UserPost.idpost=UserrCommentsPost.idpost
			inner join Userr  on Userr.iduser=UserrComments.iduser
            WHERE 
			UserPost.Active = 1
			AND Userr.Active=1
            AND UserrCommentsPost.idpost=1
			AND NOT EXISTS
			(
				SELECT idsubusercomment,idusercomment FROM UserrSubComments
				WHERE UserrComments.idusercomment=UserrSubComments.idusercomment
			) 
		END
		












		 SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrCommentsImage.idusercommentimg,
		    UserrCommentsImage.iduserimages,
			Userr.*
            FROM 
            UserrComments
            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			UserImages.Active = 1
			AND Userr.Active=1
            AND UserrCommentsImage.iduserimages=1









			Select  * from
			(
			SELECT
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrCommentsImage.idusercommentimg,
		    UserrCommentsImage.iduserimages,
			UserrSubComments.idsubusercomment as idsubusercomment  ,
			UserrSubComments.likes as likessubcomment,
			UserrSubComments.textt as textsubcomment,
			UserrSubComments.datepublish as datepublishsubcomment,
			Userr.*
            FROM 
            UserrComments
            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
			inner join  UserrSubComments on UserrSubComments.idusercomment=UserrComments.idusercomment
			inner join Userr on Userr.iduser=UserrComments.iduser

            WHERE 
			UserImages.Active = 1
			AND Userr.Active=1
            AND UserrCommentsImage.iduserimages=1

			union all

			SELECT 
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrCommentsImage.idusercommentimg,
		    UserrCommentsImage.iduserimages,
			0 as idsubusercomment,
			0 as likessubcomment,
			'' as textsubcomment,
			0 as datepublishsubcomment,
			Userr.*
            FROM 
            UserrComments
            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
			inner join Userr on Userr.iduser=UserrComments.iduser
            WHERE 
			UserImages.Active = 1
			AND Userr.Active=1
            AND UserrCommentsImage.iduserimages=1
			) as commentwithsubcomments
			where commentwithsubcomments exists
			 (
			 SELECT 
			
			UserrComments.idusercomment,
			UserrComments.textt as textcomment,
			UserrComments.likes as likescomment,
			UserrComments.datepublish as datepublishcomment,
			UserrCommentsImage.idusercommentimg,
		    UserrCommentsImage.iduserimages,
			0 as idsubusercomment,
			0 as likessubcomment,
			'' as textsubcomment,
			0 as datepublishsubcomment,
			Userr.*
            FROM 
            UserrComments
            inner join UserrCommentsImage on UserrCommentsImage.idusercomment = UserrComments.idusercomment
			inner join  UserImages on UserImages.iduserimages=UserrCommentsImage.iduserimages
			inner join Userr on Userr.iduser=UserrComments.iduser
			
            WHERE 
			UserImages.Active = 1
			AND Userr.Active=1
            AND UserrCommentsImage.iduserimages=1
			)