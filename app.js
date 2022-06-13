
const { DataAlbumImages } = require("./data/DataAlbumImage");
const { DataPhoto } = require("./data/DataPhoto");
const { DataUser } = require("./data/DataUser");
const { DataUserRelation } = require("./data/DataUserRelation");
const { DTOAlbumPhoto } = require("./entity/DTOAlbumPhoto");
const { DTOPhoto } = require("./entity/DTOPhoto");
const { DTOUser } = require("./entity/DTOUser");
const {  DTOUserRelation } = require("./entity/DTOUserRelation");
const { HashPassword } = require("./security/hashPassword");
const { LoginUser } = require("./security/LoginUser");



//#region User
let usermaintenance=async()=>
{
   
    
    // async function registerUser() {
    //     for (let index = 30; index < 50; index++) {

    //         let dtouser = new DTOUser();
    //         dtouser.name = "User" + index.toString();
    //         dtouser.nick = "UserNick" + index.toString();
    //         dtouser.userrname = "UserName" + index.toString();
    //         dtouser.password = "Password2" + index.toString();
    //         let year = 1960 + index;
      
    //         dtouser.datebirth = new Date(year, 05, 02);
          
    //         dtouser.email = "email" + index.toString() + "@gmail.com";
          
    //         const passh = HashPassword.hashPassword(dtouser.password);
    //         dtouser.password = passh.hash;
    //         dtouser.hash = passh.salt;
    //         let registeruser = await DataUser.registerUser(dtouser);
    //         if (registeruser===-1) {
    //             throw new Error("The username already exists");
    //         }
    //             console.log("The user registered successfully");
    //     }
    // }
    //  await registerUser();
    
    // async function updateUserProfile() {
    //     let dtouserupdate = new DTOUser();
    //     dtouserupdate.iduser = 3;
    //     dtouserupdate.name = "UserUpdate";
    //     dtouserupdate.nick = "NickUpdate";
    //      dtouserupdate.datebirth = new Date(1998, 05, 02);
    //     dtouserupdate.email = "emailupdate@gmail.com";
    //     dtouserupdate.address = "Address1";
    //     dtouserupdate.ocupattion = "OccupationUpdate";  
    //     dtouserupdate.website = "webiste.com";
    //     dtouserupdate.gender = "Male";
    //     dtouserupdate.city = "City";
    //     dtouserupdate.province = "Province";
    //     dtouserupdate.urlfacebook = "UrlFacebook";
    //     dtouserupdate.urlinstagram = "UrlInstagram";
    //     dtouserupdate.urllinkedin = "UrlLinkedin";
    //     dtouserupdate.urltwitter = "UrlTwitter";
    //     dtouserupdate.martialstatus = "martialstatus";
    //     dtouserupdate.description = "Description";
    //     dtouserupdate.country = "Country";     
    //     let updateuser = await DataUser.updateUser(dtouserupdate);
    //      if (updateuser===-1) {
    //             throw new Error("The user does not exists");
    //     }
    //     console.log("The user updated successfully");     
    // }
    // await updateUserProfile();

    // async function deleteUser() {
    //         let deleteuser = await DataUser.deleteUser(4);
    //          if (deleteuser===-1) {
    //                 throw new Error("The user does not exists");
    //             }
    //         console.log("The user was successfully unsubscribed");
           
        
       
    // }
    // await deleteUser();

    // async function updateUserNamePassword() {
    //     // if (!await DataUser.existUserById(5)) {
    //     //     throw new Error("The user does not exists");
    //     // }
    //     const passh = HashPassword.hashPassword("Passwordupdate1");
    //     let hashpassword = passh.hash;
    //     let salt = passh.salt;
    //     // if (await DataUser.existUserByUserName("UserName2")) {
    //     //     throw new Error("The user name already exists");
    //     // }
    //     // else {
    //         let updateusernamepassword = await DataUser.updateUserNamePassword("UserName80", hashpassword, salt, 64);
    //         if (updateusernamepassword===-1) {
    //             throw new Error("The user does not exists");
    //         }
    //         if (updateusernamepassword===-2) {
    //             throw new Error("The username already exists");
    //         }
    //             console.log("The username and password updated successfully");

    //     }
    

    //     await updateUserNamePassword();
   
    // async function updateStateUser() {
    
    //     let updateStateUser = await DataUser.updateStateUser('State', 'UserName1');
    //     if (updateStateUser===-1) 
    //     {
    //       throw new Error("The user name does not exists");
    //      }
     
    //         console.log("The state was updated successfully");
        
    // }
    
   
    // await updateStateUser();

    // async function updateVisibilityUser() {
 
    //     let updateVisibilityUser = await DataUser.updateVisibilityUser('Friend', 'UserName80');
    //     if (updateVisibilityUser===-1) 
    //     {
    //       throw new Error("The user name does not exists");
    //     }
    //         console.log("The visibility was updated successfully");
       
    // }
    
   
    // await updateVisibilityUser();

    // async function insertProfilePicture() {
      
    //     let insertProfilePicture = await DataUser.insertProfilePicture('Imageurl', 'UserName70');
    //      if (insertProfilePicture===-1) 
    //     {
    //       throw new Error("The user name does not exists");
    //     }     
    //         console.log("The Profile Picture was added successfully");

    // }
    
   
    // await insertProfilePicture();

    // async function deleteProfilePicture() {
       
    //     let deleteProfilePicture = await DataUser.deleteProfilePicture('UserName2');
    //      if (deleteProfilePicture===-1) 
    //     {
    //       throw new Error("The user name does not exists");
    //     }  
      
    //         console.log("The Profile Picture was deleted successfully");
       
    // }
    
    // await deleteProfilePicture();
   
   
   


// let loginuser = await LoginUser.loginUser('UserName13','Password213')
// console.log(loginuser);


// let getuserlogin = await LoginUser.getuserlogin()
// console.log(getuserlogin);

// let logout = await LoginUser.logoutUser()
// console.log(logout);





// let getuser = await DataUser.getUser(70);
// console.log(getuser);

// let getUserbyUserName = await DataUser.getUserbyUserName("UserName70");
// console.log(getUserbyUserName);


// let getUserbyEmail = await DataUser.getUserbyEmail("email1@gmail.com");
// console.log(getUserbyEmail);

// let getusers = await DataUser.getUsers();
// console.log(getusers);

//   let getUsersSearchs = await DataUser.getUsersSearchs("4");
// console.log(getUsersSearchs);

//   let getUsersbyBirthDate = await DataUser.getUsersbyBirthDate(
//      new Date(1976,05,02).toLocaleDateString()
//      ,
//   new Date(1976,05,02).toLocaleDateString()
//   );
// console.log(getUsersbyBirthDate);

// let getUsersbyDateEntry = await DataUser.getUsersbyDateEntry(
//     new Date(2022,01,02).toLocaleDateString()
//     ,
//  new Date(2033,05,02).toLocaleDateString()
//  );
// console.log(getUsersbyDateEntry);

}
usermaintenance().then()
//#endregion
//#region UserRelation
let userrelation=async()=>
{
  // async function addUserRelation() {
        // for (let index = 46; index < 100; index++) {
        //     let dtour = new DTOUserRelation();
        //     dtour.user.iduser = index;
        //     dtour.friend.iduser = index+1;
    
        //     let addUserRelation1 = await DataUserRelation.addUserRelation(dtour);
        //     if (addUserRelation1===-1) {
        //         throw new Error("The user does not exists"); 
        //     }
        //     if (addUserRelation1===-2) {
        //         throw new Error("The friend does not exists"); 
        //     }
        //     if (addUserRelation1===-3) {
        //         throw new Error("The users relation already exists"); 
        //     }  
        //      console.log("Friend request has been sent");

          
      // }
        
   // }
   // await addUserRelation();

    // async function confirmFriend() {
  

    //         let confirmFriend1 = await DataUserRelation.confirmFriend(7,8);
    //            if (confirmFriend1===-1) {
    //             throw new Error("The user does not exists"); 
    //         }
    //         if (confirmFriend1===-2) {
    //             throw new Error("The friend does not exists"); 
    //         }
    //         if (confirmFriend1===-3) {
    //             throw new Error("The users relation does not exists"); 
    //         }  
    //      console.log("Friend request has been confirmed");
               
              

            
    //  }
    //    await confirmFriend();
          

    // async function deleteUserRelation() {
    

    //     let deleteuserrelation1 = await DataUserRelation.deleteUserRelation(70, 80);
    //      if (deleteuserrelation1===-1) {
    //             throw new Error("The user does not exists"); 
    //     }
    //      if (deleteuserrelation1===-2) {
    //             throw new Error("The friend does not exists"); 
    //      }
    //     if (deleteuserrelation1===-3) {
    //         throw new Error("The users relation does not exists"); 
    //      }  
    //  console.log("Friend request has been deleted");
           
        
    // }
    //  await deleteUserRelation();

    //   async function blockUserRelation() {
     
    //     let blockFriend1 = await DataUserRelation.blockFriend(3, 4);
         
    //      if (blockFriend1===-1) {
    //             throw new Error("The user does not exists"); 
    //     }
    //      if (blockFriend1===-2) {
    //             throw new Error("The friend does not exists"); 
    //      }
    //     if (blockFriend1===-3) {
    //         throw new Error("The users relation does not exists"); 
    //      }  
        
    //      console.log("Friend request has been blocked");
          
       
    // }
    // await blockUserRelation();


//  let getAllFriendsbyUser = await DataUserRelation.getAllFriendsbyUser(14);
// console.log(getAllFriendsbyUser);

//  let getConfirmedFriendsbyUser = await DataUserRelation.getConfirmedFriendsbyUser(14);
// console.log(getConfirmedFriendsbyUser);


//  let getPendingFriendsbyUser = await DataUserRelation.getPendingFriendsbyUser(14);
// console.log(getPendingFriendsbyUser);

//  let getSearchNickFriendsbyUser = await DataUserRelation.getSearchNickFriendsbyUser(14,'5');
// console.log(getSearchNickFriendsbyUser);


// let getSearchNameFriendsbyUser = await DataUserRelation.getSearchNameFriendsbyUser(14,'5');
// console.log(getSearchNameFriendsbyUser);

//  let getFriendsOfFriendsUser = await DataUserRelation.getFriendsOfFriendsUser(14);
// console.log(getFriendsOfFriendsUser);

//  let getFriendsOfFriendsNotFriendUser = await DataUserRelation.getFriendsOfFriendsNotFriendUser(14);
// console.log(getFriendsOfFriendsNotFriendUser);

//  let getMutualFriendsByUsers = await DataUserRelation.getMutualFriendsByUsers(14,10);
// console.log(getMutualFriendsByUsers);

// let NumberOfFriends = await DataUserRelation.NumberOfFriends(14);
// console.log(NumberOfFriends);

//  let NumberMutualFriends = await DataUserRelation.NumberMutualFriends(14,10);
// console.log(NumberMutualFriends);
}
userrelation().then()
//#endregion
//#region AlbumPhotos
 let albumimage=async()=>
 {
    // async function addAlbum() {
    //     for (let index = 50; index < 100; index++) {
    //         let dtoalbumimage = new DTOAlbumPhoto();
    //         dtoalbumimage.user.iduser = index;        
    //         dtoalbumimage.title = "AlbumImage" + index.toString();
    //         let registerAlbumImage = await DataAlbumImages.addAlbumImage(dtoalbumimage);
    //         if (registerAlbumImage===-1) {
    //            throw new Error("The user does not exists");
    //             }
    //            console.log("The album of images was registered successfully");

    //         }
    //     }
    
    //  await addAlbum();

    // async function updateTitleAlbumImages() {

    //     let updateTitleAlbumImage = await DataAlbumImages.updateTitleAlbum(3, "AlbumUpdated");
    //      if (updateTitleAlbumImage===-1) {
    //         throw new Error("The album of images does not exists");
    //          }

    //     console.log("The title was updated successfully");
       
    // }
    // await updateTitleAlbumImages();
     
//  async function deleteAlbum() {
    
//         let deleteAlbum = await DataAlbumImages.deleteAlbum(3);
//            if (deleteAlbum===-1) {
//               throw new Error("The album of images does not exists");
//             }
//             console.log("The album was deleted successfully");      
//     }
//     await deleteAlbum();
     
// let getAlbumImage = await DataAlbumImages.getAlbumImage(2);
// if (getAlbumImage===-1) {
//       throw new Error("The album of images does not exists");
//   }
// console.log(getAlbumImage);
// let getAlbumImagebyUser = await DataAlbumImages.getAlbumImagebyUser(5);
// console.log(getAlbumImagebyUser);
// let getsAlbumImages = await DataAlbumImages.getsAlbumImages();
// console.log(getsAlbumImages);
// let getAlbumImageByTitleUser = await DataAlbumImages.getAlbumImageByTitleUser("",3);
// console.log(getAlbumImageByTitleUser);



}
  albumimage().then()
//#endregion
//#region Images
let images=async()=>
 {
     
    // async function addImage() {
    //     for (let index = 46; index < 100; index--) {
    //         let dtophoto = new DTOPhoto();
    //         dtophoto.user.iduser = index;       
    //         dtophoto.albumphoto.idalbumphoto = index;
    //         dtophoto.title = "Image" + index.toString();
    //         dtophoto.description = "Description" + index.toString(); 
    //         dtophoto.DateTimePublish = new Date();
    //         dtophoto.urlimage = "Urlimage" + index.toString();
    //         let addImage = await DataPhoto.addImages(dtophoto);
    //         if (addImage===-1) {
    //             throw new Error("The user does not exists");
    //             }
    //         if (addImage===-2) {
    //             throw new Error("The album of images does not exists");
    //         } 
          
    //          console.log("The image was added successfully");

            
    //     }
    // }
    // await addImage();
    
    // async function updateVisibilityPhoto() {
    
    //     let updateVisibilityPhoto = await DataPhoto.updateVisibilityPhoto(2,'Friend');
    //     if (updateVisibilityPhoto===-1) {
    //         throw new Error("The image does not exists");
    //         }
    //         console.log("The visibility was updated successfully");
        
    // }
    // await updateVisibilityPhoto(); 

    //  async function updateTitleDescriptionPhoto() {
    
    //     let updateTitleDescriptionPhoto = await DataPhoto.updateTitleDescriptionPhoto(90,'Description Update','TitleImageUpdated');
    //        if (updateTitleDescriptionPhoto===-1) {
    //         throw new Error("The image does not exists");
    //         }
    //         console.log("The image was updated successfully");
        
    // }
    // await updateTitleDescriptionPhoto();
      
    // async function deletePhoto() {
     
    //     let deletePhoto = await DataPhoto.deletePhoto(50);
    //     if (deletePhoto===-1) {
    //         throw new Error("The image does not exists");
    //         }
    //         console.log("The image was deleted successfully");
        
    // }
    // await deletePhoto(); 

    // let getImage = await DataPhoto.getImage(25);
    // if (getImage===-1) {
    //      throw new Error("The image does not exists");
    //   }
    // getImage.DiffDatePublishDateNow();
    // getImage.showDiffDatePublishDateNow();
    // console.log(getImage);
  
    // async function getImages() {
    //     let array=await DataPhoto.getImages();
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImages();

    //    async function getImagesByAlbum() {
    //     let array=await DataPhoto.getImagesbyAlbum(26);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImagesByAlbum();


    //    async function getImagesbyAlbumAndUser() {
    //     let array=await DataPhoto.getImagesbyAlbumAndUser(26,26);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    //await getImagesbyAlbumAndUser();


    //    async function getImagesbyIdUser() {
    //     let array=await DataPhoto.getImagesbyIdUser(26);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImagesbyIdUser();

    //  async function getImagesbyFriendUser() {
    //     let array=await DataPhoto.getImagesbyFriendUser(26);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImagesbyFriendUser();


    //  async function getImagesVisibilityFriendUser() {
    //     let array=await DataPhoto.getImagesVisibilityFriendUser(25);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImagesVisibilityFriendUser();
  
    //  async function getImagesVisibilityPublicUser() {
    //     let array=await DataPhoto.getImagesVisibilityPublicUser(25);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImagesVisibilityPublicUser();

    //  async function getImagesVisibilityByUserRelation() {
    //     let array=await DataPhoto.getImagesVisibilityByUserRelation(1,2);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }
   
    // }
    // await getImagesVisibilityByUserRelation();
   

   
 }
  images().then()
  
//#endregion

//#region Others
// let conexion=async()=>
// {
//     let pool=await Conection.conection();
//     console.log(pool);
// }
// conexion().then()
// let adminmaintenance=async()=>
//  {
    // let loginAdmin = await AdminController.loginAdmin("adminmail@gmail.com","Admin12345");
    // console.log(loginAdmin);
    // let adminlogin = AdminController.adminlogin();
    // console.log(adminlogin);
    // let registerAdmin =await AdminController.registerAdmin(dtoadmin,adminlogin.token);
    // console.log(registerAdmin);
    // let updateAdmin =await AdminController.updateAdmin(dtoadmin,adminlogin.token);
    // console.log(updateAdmin);
    // let deleteAdmin =await AdminController.deleteAdmin(dtoadmin,adminlogin.token);
    // console.log(deleteAdmin);

    // *************** GETS **************

    //   let searchAdmin =await AdminController.searchAdmin(46617,adminlogin.token);
    // console.log(searchAdmin);

    //  let searchAdminEmail =await AdminController.searchAdminEmail("adminmail@gmail.com",adminlogin.token);
    // console.log(searchAdminEmail);

    //   let getLAdmins =await AdminController.getLAdmins(adminlogin.token);
    // console.log(getLAdmins);


    // let logout = AdminController.logout();
    // console.log(logout);

//  }
//  adminmaintenance().then()


//***************************** PHOTO CONTROLLER ********************* */

// let dtophoto=new DTOPhoto(85445,"Imageupdate","image1.jpg","description1");

// let photomaintenance=async()=>
//  {
//     let loginAdmin = await AdminController.loginAdmin("adminmail@gmail.com","Admin12345");
//     console.log(loginAdmin);
//     let adminlogin = AdminController.adminlogin();
//     console.log(adminlogin);
    // let registerPhoto =await PhotoController.registerPhoto(dtophoto,adminlogin.token);
    //  console.log(registerPhoto);
    // let updatePhoto =await PhotoController.updatePhoto(dtophoto,adminlogin.token);
    // console.log(updatePhoto);
    // let deletePhoto =await PhotoController.deletePhoto(dtophoto,adminlogin.token);
    // console.log(deletePhoto);

    // //*************** GETS **************

    //   let searchphoto =await PhotoController.searchPhotoID(36036);
    // console.log(searchphoto);

    //  let searchPhotoName =await PhotoController.searchPhotoName("Imageupdate");
    // console.log(searchPhotoName);

    //   let getLPhotos =await PhotoController.getLPhotos();
    // console.log(getLPhotos);

    //    let getLPhotosExpresion =await PhotoController.getLPhotosExpresion("m");
    // console.log(getLPhotosExpresion);


//     let logout = AdminController.logout();
//     console.log(logout);

//  }
//  photomaintenance().then()


//***************************** VIDEO CONTROLLER ********************* */

// let dtovideo=new DTOVideo(39823,"Videoupdate","video2.jpg","description1");

// let videomaintenance=async()=>
//  {
//     let loginAdmin = await AdminController.loginAdmin("adminmail@gmail.com","Admin12345");
//     console.log(loginAdmin);
//     let adminlogin = AdminController.adminlogin();
//     console.log(adminlogin);
//     let registerVideo =await VideoController.registerVideo(dtovideo,adminlogin.token);
//      console.log(registerVideo);
//     let updateVideo =await VideoController.updateVideo(dtovideo,adminlogin.token);
//     console.log(updateVideo);
//     let deleteVideo =await VideoController.deleteVideo(dtovideo,adminlogin.token);
//     console.log(deleteVideo);

//    // *************** GETS **************

//       let searchVideoID =await VideoController.searchVideoID(53077);
//     console.log(searchVideoID);

//      let searchVideoName =await VideoController.searchVideoName("Video2");
//     console.log(searchVideoName);

    //   let getLVideos =await VideoController.getLVideos();
    // console.log(getLVideos);

    //   let getLVideosExpresion =await VideoController.getLVideosExpresion("u");
    // console.log(getLVideosExpresion);


//     let logout = AdminController.logout();
//     console.log(logout);

//  }
//  videomaintenance().then()

//***************************** USER CONTROLLER ********************* */

// let dtouser=new DTOUser(0,"User3","userupdate@gmail.com",new Date("February 05, 2005"),"User123456","");

// let usermaintenance=async()=>
//  {
    //    let registerUser =await UserController.registerUser(dtouser);
    //  console.log(registerUser);

    // let loginUser = await UserController.loginUser("userupdate@gmail.com","User123456");
    // console.log(loginUser);
    // let getuserlogin = UserController.getuserlogin();
    // console.log(getuserlogin);

    // dtouser.id=getuserlogin.id;

    // let updateUser =await UserController.updateUser(dtouser);
    // console.log(updateUser);
    // let deleteUser =await UserController.deleteUser(dtouser);
    // console.log(deleteUser);

   // *************** GETS **************

//       let searchUser =await UserController.searchUser(795963);
//     console.log(searchUser);


//     let searchUserName =await UserController.searchUserName("User3");
//     console.log(searchUserName);

//      let searchUserEmail =await UserController.searchUserEmail("userupdate@gmail.com");
//     console.log(searchUserEmail);

//       let getLUsers =await UserController.getLUsers();
//     console.log(getLUsers);
// ``
//       let getLUserNameExpresion =await UserController.getLUserNameExpresion("r");
//     console.log(getLUserNameExpresion);


//     let logout = UserController.logoutUser();
//     console.log(logout);

//  }
//  usermaintenance().then()


//***************************** POST CONTROLLER ********************* */

// let dtophotopost=new DTOPhotoPost(839192,"photoupdate","DescriptionPost4Photo",0,new Date(),0,36036);
// let dtovideopost=new DTOVideoPost(157715,"PostV","DescriptionPost4Video",0,new Date(),0,53077);
// let postmaintenance=async()=>
//  {
//    let loginUser = await UserController.loginUser("userupdate@gmail.com","User123456");
//     console.log(loginUser);
//     let getuserlogin = UserController.getuserlogin();
//     console.log(getuserlogin);
//     dtovideopost.iduser=getuserlogin.id;

   //  let registerPost =await PostController.registerPost(dtovideopost);
   //   console.log(registerPost);
    // let updatePost =await PostController.updatePost(dtophotopost);
    // console.log(updatePost);
    // let updatePost =await PostController.likePost(157715);
    // console.log(updatePost);
    // let deletePost =await PostController.deletePost(dtophotopost);
    // console.log(deletePost);

   // *************** GETS **************

    //   let searchPostID =await PostController.searchPostID(839192);
    // console.log(searchPostID);

    //  let searchPostName =await PostController.searchPostName("PostP");
    // console.log(searchPostName);

    //   let getLPosts =await PostController.getLPosts();
    // console.log(getLPosts);

    //   let getLPostsExpresion =await PostController.getLPostsExpresion("o");
    // console.log(getLPostsExpresion);

    //    let logout = UserController.logoutUser();
    // console.log(logout);


//  }
//  postmaintenance().then()

// calculardiferenciafechashoras=(fecha1,fecha2)=>
//  {

//     let diferencia=Math.abs(fecha2-fecha1);
//     var minutes = Math.floor((diferencia/1000)/60);
//     var hours = Math.floor((minutes)/60);

//     return hours
// }

// let fecha1=new Date("Nov 20, 2021");
//  fecha1.setUTCHours(15,48);

// // let fecha2=new Date("February 06, 2021");
// // fecha2.setUTCHours(12,00);

// let fecha2=new Date();
// fecha1.setUTCHours


// console.log(calculardiferenciafechashoras(fecha1,fecha2));
//#endregion