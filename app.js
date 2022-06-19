
const { DataAlbumImages } = require("./data/DataAlbumImage");
const { DataAlbumVideo } = require("./data/DataAlbumVideo");
const { DataLikeImage } = require("./data/DataLikeImage");
const { DataPhoto } = require("./data/DataPhoto");
const { DataPhotoPostVideo } = require("./data/DataPhotoPostVideo");
const { DataPost } = require("./data/DataPost");
const { DataUser } = require("./data/DataUser");
const { DataUserRelation } = require("./data/DataUserRelation");
const { DataVideo } = require("./data/DataVideo");
const { DTOAlbumPhoto } = require("./entity/DTOAlbumPhoto");
const { DTOAlbumVideo } = require("./entity/DTOAlbumVideos");
const { DTOPhoto } = require("./entity/DTOPhoto");
const { DTOPost } = require("./entity/DTOPost");
const { DTOUser } = require("./entity/DTOUser");
const {  DTOUserRelation } = require("./entity/DTOUserRelation");
const { DTOVideo } = require("./entity/DTOVideo");
const { HashPassword } = require("./security/hashPassword");
const { LoginUser } = require("./security/LoginUser");


//#region User
let usermaintenance=async()=>
{
    // async function registerUser() {
    //     for (let index = 1; index < 100; index++) {

    //         let dtouser = new DTOUser();
    //         dtouser.name = "User" + index.toString();
    //         dtouser.nick = "UserNick" + index.toString();
    //         dtouser.userrname = "UserName" + index.toString();
    //         dtouser.password = "Password2" + index.toString();
    //         let year = 1960 + index;
    //         dtouser.country="United Kingdom";
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
//   async function addUserRelation() {
//         for (let index = 33; index < 100; index++) {
//             let dtour = new DTOUserRelation();
//             dtour.user.iduser = index;
//             dtour.friend.iduser = index+1;

//             let addUserRelation1 = await DataUserRelation.addUserRelation(dtour);
//             if (addUserRelation1===-1) {
//                 throw new Error("The user does not exists");
//             }
//             if (addUserRelation1===-2) {
//                 throw new Error("The friend does not exists");
//             }
//             if (addUserRelation1===-3) {
//                 throw new Error("The users relation already exists");
//             }
//              console.log("Friend request has been sent");


//       }

//    }
//    await addUserRelation();

    // async function confirmFriend() {


    //         let confirmFriend1 = await DataUserRelation.confirmFriend(5,8);
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


    //     let deleteuserrelation1 = await DataUserRelation.deleteUserRelation(33, 34);
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

    
//  let getUserRelation = await DataUserRelation.getUserRelation(31,32);
//  if (getUserRelation===-1) {
//     throw new Error("The user relation does not exists");
//  }
// console.log(getUserRelation);

//  let getAllFriendsbyUser = await DataUserRelation.getAllFriendsbyUser(14);
// console.log(getAllFriendsbyUser);

//  let getConfirmedFriendsbyUser = await DataUserRelation.getConfirmedFriendsbyUser(14);
// console.log(getConfirmedFriendsbyUser);


//  let getSentPendingUsersbyUser = await DataUserRelation.getSentPendingUsersbyUser(14);
// console.log(getSentPendingUsersbyUser);

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
    //     for (let index = 1; index < 100; index++) {
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
    //     for (let index = 11; index < 100; index++) {
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

    //  async function getImagesMainPage() {
    //     let array=await DataPhoto.getImagesMainPage(1,'United Kingdom');

    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    //  await getImagesMainPage();






 }
  images().then()

//#endregion
//#region AlbumVideos

let albumvideo=async()=>
{
//    async function addAlbum() {
//        for (let index = 1; index < 100; index++) {
//            let dtoalvideo = new DTOAlbumVideo();
//            dtoalvideo.user.iduser = index;
//            dtoalvideo.title = "AlbumVideo" + index.toString();
//            let addAlbumVideo = await DataAlbumVideo.addAlbumVideo(dtoalvideo);
//            if (addAlbumVideo===-1) {
//               throw new Error("The user does not exists");
//                }
//               console.log("The album of videos was registered successfully");

//            }
//        }

//     await addAlbum();

//    async function updateTitleAlbumVideo() {

//        let updateTitleAlbum = await DataAlbumVideo.updateTitleAlbum(3, "AlbumUpdated");
//         if (updateTitleAlbum===-1) {
//            throw new Error("The album of videos does not exists");
//             }

//        console.log("The title was updated successfully");

//    }
//    await updateTitleAlbumVideo();

//  async function deleteAlbumVideo() {

//         let deleteAlbum = await DataAlbumVideo.deleteAlbum(20);
//            if (deleteAlbum===-1) {
//               throw new Error("The album of videos does not exists");
//             }
//             console.log("The album was deleted successfully");
//     }
//     await deleteAlbumVideo();

// let getAlbumVideos = await DataAlbumVideo.getAlbumVideos(20);
// if (getAlbumVideos===-1) {
//       throw new Error("The album of videos does not exists");
//   }
// console.log(getAlbumVideos);

// let getAlbumVideobyUser = await DataAlbumVideo.getAlbumVideobyUser(1);
// console.log(getAlbumVideobyUser);
// let getsAlbumVideos = await DataAlbumVideo.getsAlbumVideos();
// console.log(getsAlbumVideos);
// let getAlbumVideoByTitleUser = await DataAlbumVideo.getAlbumVideoByTitleUser("",3);
// console.log(getAlbumVideoByTitleUser);

}
albumvideo().then()
//#endregion
//#region Video
let videos=async()=>
 {
    // async function addvideo() {
    //     for (let index = 1; index < 100; index++) {
    //         let dtovid = new DTOVideo();
    //         dtovid.user.iduser = index;
    //         dtovid.albumvideo.idalbumvideo = index;
    //         dtovid.title = "Video" + index.toString();
    //         dtovid.description = "Description" + index.toString();
    //         dtovid.DateTimePublish = new Date();
    //         dtovid.urlvideo = "UrlVideo" + index.toString();
    //         let addImage = await DataVideo.addVideo(dtovid);
    //         if (addImage===-1) {
    //             throw new Error("The user does not exists");
    //             }
    //         if (addImage===-2) {
    //             throw new Error("The album of videos does not exists");
    //         }

    //          console.log("The video was added successfully");


    //     }
    // }
    // await addvideo();

    //   async function updateVisibilityVideo() {

    //     let updateVisibilityVideo = await DataVideo.updateVisibilityVideo(2,'Friend');
    //     if (updateVisibilityVideo===-1) {
    //         throw new Error("The video does not exists");
    //         }
    //         console.log("The visibility was updated successfully");

    // }
    // await updateVisibilityVideo();

    //  async function updateTitleDescriptionVideo() {

    //     let updateTitleDescriptionVideo = await DataVideo.updateTitleDescriptionVideo(2,'Description Update','TitleVideoUpdated');
    //        if (updateTitleDescriptionVideo===-1) {
    //         throw new Error("The video does not exists");
    //         }
    //         console.log("The video was updated successfully");

    // }
    // await updateTitleDescriptionVideo();
   
    //   async function deleteVideo() {

    //     let deleteVideo = await DataVideo.deleteVideo(3);
    //        if (deleteVideo===-1) {
    //         throw new Error("The video does not exists");
    //         }
    //         console.log("The video was deleted successfully");

    // }
    // await deleteVideo();

      

    // async function getVideo() {
    //     let getVideo=await DataVideo.getVideo(4);
    //     if (getVideo===-1) {
    //          throw new Error("The video does not exists");
    //      }
    //      getVideo.DiffDatePublishDateNow();
    //      getVideo.showDiffDatePublishDateNow();
    //     console.log(getVideo);
    // }
    // await getVideo();

    //  async function getVideosbyAlbum() {
    //     let array=await DataVideo.getVideosbyAlbum(6)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosbyAlbum();

    //  async function getVideosbyAlbumAndUser() {
    //     let array=await DataVideo.getVideosbyAlbumAndUser(6,6)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosbyAlbumAndUser();


    //  async function getVideosbyAlbumAndUser() {
    //     let array=await DataVideo.getVideosbyAlbumAndUser(6,6)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosbyAlbumAndUser();


    //   async function getVideosbyIdUser() {
    //     let array=await DataVideo.getVideosbyIdUser(6)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
   
    // }
    // await getVideosbyIdUser();

    
    //   async function getVideosVisibilityFriendUser() {
    //     let array=await DataVideo.getVideosVisibilityFriendUser(1)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosVisibilityFriendUser();

    //     async function getVideosVisibilityPublicUser() {
    //     let array=await DataVideo.getVideosVisibilityPublicUser(4)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosVisibilityPublicUser();


    // async function getVideosbyFriendUser() {
    //     let array=await DataVideo.getVideosbyFriendUser(4)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosbyFriendUser();



    //     async function getVideosVisibilityByUserRelation() {
    //     let array=await DataVideo.getVideosVisibilityByUserRelation(4,5)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosVisibilityByUserRelation();

    // async function getVideosMainPage() {
    //     let array=await DataVideo.getVideosMainPage(4,'United Kingdom')
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosMainPage();

    
   
 }
 videos().then()
//#endregion
//#region Post
let posts=async()=>
 {
    // async function addpost() {
    //     for (let index = 1; index < 100; index++) {
    //         let dtopost = new DTOPost();
    //         dtopost.user.iduser = index;
    //         dtopost.title = "Post" + index.toString();
    //         dtopost.description = "Description" + index.toString();
    //         let addPost = await DataPost.addPost(dtopost);
    //         if (addPost===-1) {
    //             throw new Error("The user does not exists");
    //         }
    //          console.log("The post was added successfully");
    //     }
    // }
    // await addpost();

    // async function updateVisibilityPost() {

    //     let updateVisibilityPost = await DataPost.updateVisibilityPost(29,'Friend');
    //     if (updateVisibilityPost===-1) {
    //         throw new Error("The Post does not exists");
    //     }
    //     console.log("The visibility was updated successfully");

    // }
    // await updateVisibilityPost();

    // async function updateTitleDescriptionPost() {
    //     let updateTitleDescriptionPost = await DataPost.updateTitleDescriptionPost(2,'Description Update','TitlePostUpdated');
    //     if (updateTitleDescriptionPost===-1) {
    //        throw new Error("The Post does not exists");
    //     }
    //         console.log("The post was updated successfully");
    // }

    // await updateTitleDescriptionPost();
   
    //  async function deletePost() {
    //     let deletePost = await DataPost.deletePost(28);
    //        if (deletePost===-1) {
    //             throw new Error("The post does not exists");
    //         }
    //         console.log("The post was deleted successfully");
    // }
    // await deletePost();

    //****************************************************** */

    // async function getPost() {
    //      let getPost=await DataPost.getPost(4);
    //      if (getPost===-1) {
    //          throw new Error("The Post does not exists");
    //      }
    //      getPost.DiffDatePublishDateNow();
    //      getPost.showDiffDatePublishDateNow();
    //      console.log(getPost);
    // }
    // await getPost();

    //  async function getPosts() {
    //     let array=await DataPost.getPosts();
    //     for (const post of array) {
    //       post.DiffDatePublishDateNow()
    //       post.showDiffDatePublishDateNow()
    //         console.log(post);
    //     }
      
    // }
    //  await getPosts();

    //  async function getPostbyIdUser() {
    //     let array=await DataPost.getPostbyIdUser(6)
    //     for (const post of array) {
    //       post.DiffDatePublishDateNow()
    //       post.showDiffDatePublishDateNow()
    //         console.log(post);
    //     }
      
    // }
    // await getPostbyIdUser();

    //  async function getPostVisibilityFriendUser() {
    //     let array=await DataPost.getPostVisibilityFriendUser(6)
    //     for (const post of array) {
    //       post.DiffDatePublishDateNow()
    //       post.showDiffDatePublishDateNow()
    //         console.log(post);
    //     }
      
    // }
    // await getPostVisibilityFriendUser();

    //  async function getPostVisibilityPublicUser() {
    //     let array=await DataPost.getPostVisibilityPublicUser(6)
    //     for (const post of array) {
    //       post.DiffDatePublishDateNow()
    //       post.showDiffDatePublishDateNow()
    //         console.log(post);
    //     }
      
    // }
    // await getPostVisibilityPublicUser();


  // async function getPostbyFriendUser() {
  //       let array=await DataPost.getPostbyFriendUser(6)
  //       for (const post of array) {
  //         post.DiffDatePublishDateNow()
  //         post.showDiffDatePublishDateNow()
  //           console.log(post);
  //       }
      
  //   }
  //   await getPostbyFriendUser();

  //   async function getPostVisibilityByUserRelation() {
  //     let array=await DataPost.getPostVisibilityByUserRelation(5,9)
  //     for (const post of array) {
  //       post.DiffDatePublishDateNow()
  //       post.showDiffDatePublishDateNow()
  //         console.log(post);
  //     }
    
  // }
  // await getPostVisibilityByUserRelation();

  // async function getPostMainPage() {
  //     let array=await DataPost.getPostMainPage(3,'')
  //     for (const post of array) {
  //       post.DiffDatePublishDateNow()
  //       post.showDiffDatePublishDateNow()
  //         console.log(post);
  //     }
    
  // }
  // await getPostMainPage();



 }
 posts().then()
//#endregion
//#region  PostVideoImages

let postvideoimage=async()=>
 {
    //     async function getPhotoPostVideoMainPage() {
    //         let array=await DataPhotoPostVideo.getPhotoPostVideoMainPage(3,'')
    //         for (const post of array) {
    //             post.DiffDatePublishDateNow()
    //             post.showDiffDatePublishDateNow()
    //             console.log(post);
    //         }
            
    //     }
    //     await getPhotoPostVideoMainPage();

        // async function getPhotoPostVideoCountryUser() {
        //     let array=await DataPhotoPostVideo.getPhotoPostVideoCountryUser('USA')
        //     for (const post of array) {
        //         post.DiffDatePublishDateNow()
        //         post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
            
        // }
        // await getPhotoPostVideoCountryUser();

        //  async function getPhotoPostVideoPublic() {
        //     let array=await DataPhotoPostVideo.getPhotoPostVideoPublic()
        //     for (const post of array) {
        //         post.DiffDatePublishDateNow()
        //         post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
            
        // }
        
        // await getPhotoPostVideoPublic();

        // async function getPhotoPostVideoByIdAndType() {
        //     let data=await DataPhotoPostVideo.getPhotoPostVideoByIdAndType(2,'V')   
        //     data.DiffDatePublishDateNow()
        //     data.showDiffDatePublishDateNow()
        //      console.log(data);
        
            
        // }
        
        // await getPhotoPostVideoByIdAndType();


 }
 postvideoimage().then()

//#endregion
//#region LikeImage
let LikeImage=async()=>
 {
    // async function likeanimage() {
    
    //         let likeanimage = await DataLikeImage.likeanimage(2,1);
    //         if (likeanimage===-1) {
    //             throw new Error("The image does not exists");
    //         }
    //         if (likeanimage===-2) {
    //             throw new Error("The user does not exists");
    //         }
    //         if (likeanimage===-3) {
    //             throw new Error("The user already liked that image ");
    //         }
    //          console.log("The likeimage was added successfully");
       
    // }
    // await likeanimage();








    



 }
 LikeImage().then()
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