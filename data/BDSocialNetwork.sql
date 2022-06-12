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
	IdSubUserComment int NOT NULL PRIMARY KEY ,
	IdUser int not null Foreign Key References Userr(IdUser),
   IdUserComment int not null Foreign Key References UserrComments(IdUserComment),
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

--drop table UserrRelations
--drop table UserrImageTags
--drop table UserrCommentsImage
--drop table UserrCommentsEvent
--drop table UserrCommentsVideo
--drop table UserrSubComments
--drop table UserrComments
--drop table UserEventInvitation
--drop table UserEvent
--drop table UserVideos
--drop table UserImages
--drop table AlbumUserVideos
--drop table AlbumUserImages


--drop table UserrMessage

select * from userr where iduser=6
select * from AlbumUserImages
select * from  UserImages
--drop table Userr




--ALTER TABLE UserImages
--  alter column  Likes int not NULL 
--insert into Userr values('User','Nick1','UserName1','Password1','asfasfasfasfaf','1989-05-02',1,'email1@gmail.com','','','','','','','','','','','')

--update Userr set Name='UserUpdate',Nick='Nickupdate',UserrName='Usernameupdate'
----delete from Userr where iduser=1


--	delete from Userr 
 
FROM 
  existusername


IF EXISTS (   SELECT *FROM Userr WHERE IdUser = 2 and Active=1 )
BEGIN
select -1 as existusername
 
END
else
begin
  Update 
  Userr 
Set 
  Name = @Name, 
  Nick = @Nick, 
  BirthDate = @BirthDate, 
  Email = @Email, 
  Addresss = @Addresss, 
  Occupation = @Occupation, 
  MartailStatus = @MartailStatus, 
  WebSite = @WebSite, 
  Gender = @Gender, 
  UrlFacebook = @UrlFacebook, 
  UrlInstagram = @UrlInstagram, 
  UrlLinkedin = @UrlLinkedin, 
  UrlTwitter = @UrlTwitter, 
  City = @City, 
  Province = @Province, 
  Descriptionn = @Descriptionn, 
  Country = @Country 
where 
  IdUser = @IdUser

  select 1 as insertsuccess
end 
  
  select * from userr

  delete from userr where iduser in(33,34,35,36,37,42,43,44)
	     SELECT 
         CASE WHEN EXISTS (
   
		  )
     THEN CAST( 1 as bit)
     ELSE CAST(0 AS BIT) END as Exist  


	 select  getutcdate()


select * from userr

update userr set Active=1

			SELECT userr.*
		FROM   userrrelations
			   INNER JOIN userr
					   ON userr.iduser = userrrelations.idfriend
			WHERE  userr.active = 1
				   AND userrrelations.iduser = 25
				   AND userrrelations.statee = 'Confirmed' 

SELECT 
  userimages.*, 
  --Gets images of friends user
  albumuserimages.title AS AlbumTitle, 
  userr.NAME, 
  userr.nick, 
  userr.email, 
  userr.imagee 
FROM 
  userimages 
  INNER JOIN albumuserimages ON albumuserimages.idalbumimages = userimages.idalbumimages 
  INNER JOIN userr ON userr.iduser = albumuserimages.iduser 
  INNER JOIN userrrelations ON userrrelations.idfriend = userr.iduser 
WHERE 
  userr.active = 1 
  AND albumuserimages.active = 1 
  AND userimages.active = 1 
  AND userrrelations.statee = 'Confirmed' 
  AND userrrelations.iduser = 26


		SELECT userimages.*,
       albumuserimages.title AS AlbumTitle,
       userr.NAME,
       userr.nick,
       userr.email,
       userr.imagee
		FROM   userimages
       INNER JOIN albumuserimages
               ON albumuserimages.idalbumimages = userimages.idalbumimages
       INNER JOIN userr
               ON userr.iduser = albumuserimages.iduser
		WHERE  userr.active = 1
       AND albumuserimages.active = 1
       AND userimages.active = 1
       AND userimages.iduser = 26
	   

SELECT 
  userr.* 
FROM 
  userrrelations 
  INNER JOIN userr ON userr.iduser = userrrelations.idfriend 
WHERE 
  userr.active = 1 
  AND userrrelations.iduser = 26
  AND userrrelations.statee = 'Confirmed'


	select * from userr

	select* from AlbumUserImages 

	select * from UserImages
	select * from UserrRelations

BEGIN TRANSACTION  
    insert into UserrRelations values (1,29,'Pending') 
    insert into UserrRelations values (50,1,'Pending')  

IF(@@ERROR > 0)  
BEGIN  
    ROLLBACK TRANSACTION  
END  
ELSE  
BEGIN  
   COMMIT TRANSACTION  
END   

select * from userrrelations
delete from userrrelations 
		select AlbumUserImages.*,Userr.Name,Userr.UserrName,Userr.Imagee,Userr.Email
	from AlbumUserImages inner join Userr on Userr.IdUser=AlbumUserImages.IdUser
	 where Userr.Active=1 and AlbumUserImages.Active=1 and AlbumUserImages.Title like '%%'
	 order by IdAlbumImages 

			SELECT *
              FROM Userr
              WHERE  
                 BirthDate between '' and '1980-06-02'  
                   

					 	SELECT *
              FROM Userr
              WHERE  Name = 'User0'
                     or Nick = ''
                     or UserrName = ''
                     or Email = ''
                     or WebSite = ''
                     or Occupation = ''
                     or Active=1;
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


select 
  distinct u.*, 
  urel2.Statee --Friends of Friends, not my friends 
from 
  UserrRelations as urel1 
  inner join UserrRelations as urel2 on urel1.IdFriend = urel2.IdUser 
  inner join Userr as u on u.IdUser = urel2.IdFriend 
where 
  urel2.IdFriend not in (
    select 
      UserrRelations.IdFriend 
    from 
      UserrRelations 
      inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
    where 
      Userr.Active = 1 
      and UserrRelations.IdUser = 14 
      and UserrRelations.Statee = 'Confirmed'
  ) 
  and urel1.IdUser = 14 
  and urel1.Statee = 'Confirmed' 
  and u.Active = 1 


SELECT 
  count(*) as NumberMutualFriends 
FROM 
  UserrRelations as urel1 --Mutual Friends
  INNER JOIN UserrRelations as urel2 ON urel2.IdFriend = urel1.IdFriend 
  and urel2.IdUser = 14 
  and urel2.IdFriend != 11 
WHERE 
  urel1.IdUser = 11 
  and urel2.IdFriend != 14 --and  urel1.Statee='Confirmed' and urel2.Statee='Confirmed


select 
  userr.* --Friends of Friends
from 
  UserrRelations 
  inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
where 
  Userr.Active = 1 
  and UserrRelations.IdUser = 14 
  and UserrRelations.Statee = 'Confirmed' 
select 
  userr.* --Friends of Friends
from 
  UserrRelations 
  inner join Userr on Userr.IdUser = UserrRelations.IdFriend 
where 
  Userr.Active = 1 
  and UserrRelations.IdUser = 12 



select 
  distinct u.* 
from 
  UserrRelations as urel1 
  inner join UserrRelations as urel2 on urel1.IdFriend = urel2.IdUser 
  inner join Userr as u on u.IdUser = urel2.IdFriend 
where 
  urel1.IdUser = 14 
select 
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
  and UserImages.IdUserImages = 2


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

	select * from userrrelations where iduser=14

	SELECT 
	CASE WHEN EXISTS (
    SELECT *
    FROM Userr
    WHERE UserrName ='UserName2' and Active=1 and iduser=4
)
THEN CAST( 1 as bit)
ELSE CAST(0 AS BIT) END as Exist

select * from userr

 update Userr set Country='USA'

	SELECT 
	CASE WHEN EXISTS (
    SELECT *
    FROM UserrRelations
    WHERE  IdUser=1 and IdFriend=2
)
THEN CAST( 1 as bit)
ELSE CAST(0 AS BIT) END as Exist



SELECT DATEDIFF(second, '2022/06/09 10:46',getdate()) AS DateDiff;

SELECT GETUTCDATE();

SELECT GETdate()

Select CAST((getdate()-'2022/06/08 10:46'))


SELECT  DATEDIFF(second, '2022/06/09 10:46',getdate() ) as diffsecond,
       DATEDIFF(minute, '2022/06/09 10:46',getdate()) as diffminutes ,
	   DATEDIFF(hour, '2022/06/09 10:46',getdate()) as diffhours,
	   DATEDIFF(day, '2022/06/09 10:46',getdate()) as diffdays,
	   DATEDIFF(month, '2022/06/09 10:46',getdate()) as diffmonth,
	   DATEDIFF(year, '2022/06/09 10:46',getdate()) as diffyear,
	CASE 
		WHEN diffsecond>=60 THEN  DATEDIFF(minute, '2022/06/09 10:46',getdate())
		END AS diff



		
		WITH
		 differencee AS ( 
		 SELECT DATEDIFF(second, '2022/06/09 22:02:50',GETUTCDATE() ) AS seconds,
				DATEDIFF(minute, '2022/06/09 22:02:50', GETUTCDATE()) AS minutess,
				 DATEDIFF(hour, '2022/06/09 22:02:50',GETUTCDATE()) AS hourss,
				DATEDIFF(day, '2022/06/09 22:02:50',GETUTCDATE()) AS dayss,
				 DATEDIFF(month, '2022/06/09 22:02:50',GETUTCDATE()) AS months,
				 DATEDIFF(year, '2022/06/09 22:02:50',GETUTCDATE()) AS years
		)
		SELECT 	
		CASE  WHEN seconds<60   THEN (select seconds )  END  AS difsecond ,
		CASE  WHEN seconds>=60 and minutess<60   THEN (select minutess )  END  AS difminutes ,
		CASE WHEN minutess>=60 and hourss<24 THEN  (SELECT hourss ) END AS difhour,
		CASE  WHEN hourss>=24 and dayss<31 THEN  (SELECT dayss) END AS difdays,
		CASE  WHEN dayss>=31 and months<12 THEN  (SELECT months) END AS difmonth,
		CASE  WHEN months>=12  THEN  (SELECT years) END AS difyears	
		FROM differencee



		WITH
		 difference_in_seconds AS (
		 SELECT DATEDIFF(second, '2022/06/09 13:09:50','2022/06/09 18:06:30' ) AS seconds
		),
		differences AS (
		 SELECT
		 seconds, 
		seconds % 60 AS seconds_part,
		seconds % 3600 AS minutes_part,
		seconds % (3600 * 24) AS hours_part
		 FROM difference_in_seconds
		)
		 SELECT
			FLOOR(seconds / 3600 / 24),
			FLOOR(hours_part / 3600),
			FLOOR(minutes_part / 60) as minutespart,
			seconds_part
		FROM differences;



	   THEN (SELECT DATEDIFF(hour, '2022/06/09 10:46',getdate()))
	--WHEN DATEDIFF(second, '2022/06/09 10:46',getdate()) >= 60 THEN (SELECT DATEDIFF(hour, '2022/06/09 10:46',getdate()))
	--WHEN DATEDIFF(second, '2022/06/09 10:46',getdate()) >= 60 THEN (SELECT DATEDIFF(hour, '2022/06/09 10:46',getdate()))
		WITH
		 differencee AS ( 
		 SELECT DATEDIFF(second, '2022/06/09 22:02:50',GETUTCDATE() ) AS seconds,
				DATEDIFF(minute, '2022/06/09 22:02:50', GETUTCDATE()) AS minutess,
				 DATEDIFF(hour, '2022/06/09 22:02:50',GETUTCDATE()) AS hourss,
				DATEDIFF(day, '2022/06/09 22:02:50',GETUTCDATE()) AS dayss,
				 DATEDIFF(month, '2022/06/09 22:02:50',GETUTCDATE()) AS months,
				 DATEDIFF(year, '2022/06/09 22:02:50',GETUTCDATE()) AS years
		)
	   select UserImages.*,AlbumUserImages.Title as AlbumTitle,Userr.Name,Userr.Nick,Userr.Email,Userr.Imagee 
       from UserImages inner join AlbumUserImages on AlbumUserImages.IdAlbumImages=UserImages.IdAlbumImages
     inner join Userr on Userr.IdUser=AlbumUserImages.IdUser
    where Userr.Active=1 and AlbumUserImages.Active=1 and UserImages.Active=1




	 IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser =1 and Active=1)
    BEGIN
    select -1 as notexistuser
    END
    IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser = 25 and  Active=1)
    BEGIN
    select -2 as notexistfriend
    END
    IF  EXISTS ( SELECT * FROM UserrRelations WHERE  IdUser=1  and IdFriend=25)
    BEGIN
    select -3 as existduplicate
    END
    ELSE
    BEGIN
    BEGIN TRANSACTION  
    insert into UserrRelations values (1,25,'Pending') 
    insert into UserrRelations values (25,1,'Pending') 
      IF(@@ERROR > 0)  
      BEGIN  
          ROLLBACK TRANSACTION  
      END  
      ELSE  
      BEGIN  
        COMMIT TRANSACTION  
      END 
    END 

	select * from userrrelations
	select * from userr

	delete from userrrelations where iduser in(61,62,63)