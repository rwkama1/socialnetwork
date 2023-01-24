
const { DataAlbumImages } = require("./data/DataAlbumImage");
const { DataAlbumVideo } = require("./data/DataAlbumVideo");
const { DataCommentImage } = require("./data/DataCommentImage");
const { DataCommentPost } = require("./data/DataCommentPost");
const { DataCommentVideo } = require("./data/DataCommentVideo");
const { DataLikeComment } = require("./data/DataLikeComment");
const { DataLikeImage } = require("./data/DataLikeImage");
const { DataLikePost } = require("./data/DataLikePost");
const { DataLikeSubComment } = require("./data/DataLikeSubComment");
const { DataLikeVideo } = require("./data/DataLikeVideo");
const { DataMessage } = require("./data/DataMessage");
const { DataPhoto } = require("./data/DataPhoto");
const { DataPhotoPostVideo } = require("./data/DataPhotoPostVideo");
const { DataPost } = require("./data/DataPost");
const { DataSubComment } = require("./data/DataSubComment");
const { DataLoginUser } = require("./data/DataLoginUser");
const { DataFollowers } = require("./data/DataFollowers");
const { DataUser } = require("./data/DataUser");
const { DTOUser } = require("./entity/DTOUser");
const { LoginUser } = require("./security/LoginUser");
 const { DataUserRelation } = require("./data/DataUserRelation");
const { DataVideo } = require("./data/DataVideo");
const { DTOAlbumPhoto } = require("./entity/DTOAlbumPhoto");
const { DTOAlbumVideo } = require("./entity/DTOAlbumVideos");
const { DTOPhoto } = require("./entity/DTOPhoto");
const { DTOPost } = require("./entity/DTOPost");
 const {  DTOUserRelation } = require("./entity/DTOUserRelation");
const { DTOVideo } = require("./entity/DTOVideo");
const { DataChatRoom } = require("./data/DataChatRoom");
const { DataNotification } = require("./data/DataNotification");


// //#region User
let usermaintenance=async()=>
{
    // async function registerUser() {
    //     for (let index = 1; index < 100; index++) {

    //         let dtouser = new DTOUser();
    //         dtouser.name = "User" + index.toString();
    //         dtouser.nick = "UserNick" + index.toString();
    //         dtouser.userrname = "Usernam" + index.toString();
    //         dtouser.password = "Password" + index.toString();
    //         let year = 1960 + index;
    //         dtouser.country="United Kingdom";
    //         dtouser.datebirth = new Date(year, 05, 02);

    //         dtouser.email = "email" + index.toString() + "@gmail.com";

           
    //         let registeruser = await DataUser.registerUser(dtouser);
    //         if (registeruser===-1) {
    //             throw new Error("The username already exists");
    //         }
    //         if (registeruser===-2) {
    //             throw new Error("Username must have more than 8 characters");
    //         }
    //         if (registeruser===-3) {
    //             throw new Error("Passwordd must have more than 8 characters");
    //         }
    //             console.log("The user registered successfully");
    //     }
    // }
    //  await registerUser();

//     async function updateUserProfile() {
//         let dtouserupdate = new DTOUser();
//         dtouserupdate.iduser = 3;
//         dtouserupdate.name = "UserUpdate";
//         dtouserupdate.nick = "NickUpdate";
//          dtouserupdate.datebirth = new Date(1998, 05, 02);
//         dtouserupdate.email = "emailupdate@gmail.com";
//         dtouserupdate.address = "Address1";
//         dtouserupdate.ocupattion = "OccupationUpdate";
//         dtouserupdate.website = "webiste.com";
//         dtouserupdate.gender = "Male";
//         dtouserupdate.city = "City";
//         dtouserupdate.province = "Province";
//         dtouserupdate.urlfacebook = "UrlFacebook";
//         dtouserupdate.urlinstagram = "UrlInstagram";
//         dtouserupdate.urllinkedin = "UrlLinkedin";
//         dtouserupdate.urltwitter = "UrlTwitter";
//         dtouserupdate.martialstatus = "martialstatus";
//         dtouserupdate.description = "Description";
//         dtouserupdate.country = "Country";
//         let updateuser = await DataUser.updateUser(dtouserupdate);
//          if (updateuser===-1) {
//                 throw new Error("The user does not exists");
//         }
//         console.log("The user updated successfully");
//     }
//     await updateUserProfile();

    // async function deleteUser() {
    //         let deleteuser = await DataUser.deleteUser(16);
    //          if (deleteuser===-1) {
    //                 throw new Error("The user does not exists");
    //             }
    //         console.log("The user was successfully unsubscribed");



    // }
    // await deleteUser();

    // async function updatePassword() {
       
        
    //         let updatepassword = await DataUser.updatePassword("Username1","Password1","Password12");
    //         if (updatepassword===-1) {
    //             throw new Error("Incorrect username and/or password");
    //         }
    //         if (updatepassword===-2) {
    //             throw new Error("New Passwordd must have more than 8 characters");
    //         }
           
    //             console.log("Password updated successfully");

    //     }


    //     await updatePassword();

    // async function updateDescription() {

    //     let updateDescription = await DataUser.updateDescription('Description', 1);
    //     if (updateDescription===-1)
    //     {
    //       throw new Error("The user  does not exists");
    //      }

    //         console.log("The description was updated successfully");

    // }


    // await updateDescription();

//     async function updateStateUser() {

//         let updateStateUser = await DataUser.updateStateUser('State', 'UserName1');
//         if (updateStateUser===-1)
//         {
//           throw new Error("The user name does not exists");
//          }

//             console.log("The state was updated successfully");

//     }


//     await updateStateUser();

//     async function updateVisibilityUser() {

//         let updateVisibilityUser = await DataUser.updateVisibilityUser('Friend', 'UserName80');
//         if (updateVisibilityUser===-1)
//         {
//           throw new Error("The user name does not exists");
//         }
//             console.log("The visibility was updated successfully");

//     }


//     await updateVisibilityUser();

//     async function insertProfilePicture() {

//         let insertProfilePicture = await DataUser.insertProfilePicture('Imageurl', 'UserName70');
//          if (insertProfilePicture===-1)
//         {
//           throw new Error("The user name does not exists");
//         }
//             console.log("The Profile Picture was added successfully");

//     }


//     await insertProfilePicture();


    // async function insertCoverPicture() {

    //     let insertCoverPicture = await DataUser.insertCoverPicture('Imageurl', 'UserName70');
    //      if (insertCoverPicture===-1)
    //       {
    //         throw new Error("The user name does not exists");
    //       }
    //         console.log("The Cover Imagee was added successfully");
    // }

    // await insertCoverPicture();

    // async function insertCoverProfilePicture() {

    //     let insertCoverProfilePicture = await DataUser.insertCoverProfilePicture('ProfileImageUrl2',"CoverImageUrl2", 'UserName1');
    //      if (insertCoverProfilePicture===-1)
    //       {
    //         throw new Error("The user name does not exists");
    //       }
    //         console.log("The Cover and Profile Imagee was added successfully");
    // }

    // await insertCoverProfilePicture();

//     async function deleteProfilePicture() {

//         let deleteProfilePicture = await DataUser.deleteProfilePicture('UserName2');
//          if (deleteProfilePicture===-1)
//         {
//           throw new Error("The user name does not exists");
//         }

//             console.log("The Profile Picture was deleted successfully");

//     }

//     await deleteProfilePicture();


//       async function deleteCoverPicture() {

//         let deleteCoverPicture = await DataUser.deleteCoverPicture('UserName70');
//          if (deleteCoverPicture===-1)
//             {
//             throw new Error("The user name does not exists");
//           }

//             console.log("The Cover Imagee was deleted successfully");

//      }

//     await deleteCoverPicture();

    //   async function blockUser() {

    //     let blockuser = await DataUser.blockuser(2,3,"Blocked");
    //      if (blockuser===-1)
    //         {
    //         throw new Error("The user login does not exists");
    //       }
    //       if (blockuser===-2)
    //       {
    //       throw new Error("The user blocked does not exist");
    //      }
    //         console.log("User Blocked");

    //  }

    // await blockUser();


    


// let getuser = await DataUser.getUser(1,3);
// if(getuser===-1){
//     throw new Error("The user is blocked");
// }
//  if(getuser===-2)
//  {
//     throw new Error("The user does not exists");
//  }
// console.log(getuser);

// let getUserbyUserName = await DataUser.getUserbyUserName("UserName70");
// console.log(getUserbyUserName);


// let getUserbyEmail = await DataUser.getUserbyEmail("email1@gmail.com");
// console.log(getUserbyEmail);

// let getusers = await DataUser.getUsers();
// console.log(getusers);

//   let getUsersSearchs = await DataUser.getUsersSearchs("70");
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
// //#endregion
//#region LOGIN USER

let loginuser=async()=>
{

//     let loginuser = await LoginUser.loginUser("Usernam1","Password1")
// console.log(loginuser);




// let getuserlogin = await LoginUser.getuserlogin()
// console.log(getuserlogin);



// let logout = await LoginUser.logoutUser()
// console.log(logout);

// let existLoginUser = await DataLoginUser.existLoginUser(11)
// console.log(existLoginUser);


}
loginuser().then()
//#endregion
// //#region UserRelation
 let userrelation=async()=>
 {
//   async function addUserRelation() {
//         for (let index = 1; index < 100; index++) {
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

//    await addUserRelation();

//     async function confirmFriend() {


//             let confirmFriend1 = await DataUserRelation.confirmFriend(5,8);
//                if (confirmFriend1===-1) {
//                 throw new Error("The user does not exists");
//             }
//             if (confirmFriend1===-2) {
//                 throw new Error("The friend does not exists");
//             }
//             if (confirmFriend1===-3) {
//                 throw new Error("The users relation does not exists");
//             }
//          console.log("Friend request has been confirmed");




//      }
//        await confirmFriend();


//     async function deleteUserRelation() {


//         let deleteuserrelation1 = await DataUserRelation.deleteUserRelation(33, 34);
//          if (deleteuserrelation1===-1) {
//                 throw new Error("The user does not exists");
//         }
//          if (deleteuserrelation1===-2) {
//                 throw new Error("The friend does not exists");
//          }
//         if (deleteuserrelation1===-3) {
//             throw new Error("The users relation does not exists");
//          }
//      console.log("Friend request has been deleted");


//     }
//      await deleteUserRelation();



    
//  let getUserRelation = await DataUserRelation.getUserRelation(25,1);
//  if (getUserRelation===-1) {
//     throw new Error("The user relation does not exists");
//  }
// console.log(getUserRelation);

//  let getAllFriendsbyUser = await DataUserRelation.getAllFriendsbyUser(14);
// console.log(getAllFriendsbyUser);

//  let getConfirmedFriendsbyUser = await DataUserRelation.getConfirmedFriendsbyUser(14);
// console.log(getConfirmedFriendsbyUser);



// let getConfirmedFriendsbyUserLoginUser =
//  await DataUserRelation.getConfirmedFriendsbyUserLoginUser(1,1);
// if(getConfirmedFriendsbyUserLoginUser===-1)
// {
//     throw new Error("The user is blocked");
// }
// console.log(getConfirmedFriendsbyUserLoginUser);

// let getPendingFriendsbyUserLoginUser = await DataUserRelation.getPendingFriendsbyUserLoginUser(2);
// console.log(getPendingFriendsbyUserLoginUser);


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
// //#endregion
// //#region FOLLOWERS 
let followersmaintenace=async()=>
{
//       async function addFollower() {
//         for (let index = 1; index < 100; index++) {
//            let iduserfollower=index;
//            let iduserfollowed=index+1;

//             let addFollower = await DataFollowers.
//             addFollower(iduserfollower,iduserfollowed);
//             if (addFollower===-1) {
//                 throw new Error("The user follower does not exists");
//             }
//             if (addFollower===-2) {
//                 throw new Error("The user followed does not exists");
//             }
//             if (addFollower===-3) {
//                 throw new Error("The follow already exists");
//             }
//              console.log("Follow added");
//       }

//    }
//    await addFollower();

    //     async function unfollow() {
          
    //            let iduserfollower=1;
    //            let iduserfollowed=2;
    
    //             let addFollower = await DataFollowers.
    //             unFollow(iduserfollower,iduserfollowed);
    //             if (addFollower===-1) {
    //                 throw new Error("The follow does not exists");
    //             }
    //              console.log("Follow deleted");
    //         }
    // await unfollow();

    
    // let getFollowersByUser = await DataFollowers.getFollowersByUser(2);
    //  console.log(getFollowersByUser);

    // let existFollow = await DataFollowers.existFollow(1,3);
    //  console.log(existFollow);
     

    // let NumberOfFollowers = await DataFollowers.NumberOfFollowers(2);
    //  console.log(NumberOfFollowers);
     

}
followersmaintenace().then()

// //#endregion FOLLOWERS
// //#region AlbumPhotos
 let albumimage=async()=>
 {
    // async function addAlbum() {
    //     for (let index = 1; index < 100; index++) {
          
    //      let userid = index;
    //       let albumtitle = "AlbumImage" + index.toString();
    //         let arrayurlimage=["urlimage1","urlimage2","urlimage3","urlimage4"
    //         ,"urlimg5"]
    //         let registerAlbumImage = await DataAlbumImages.addAlbumImage(albumtitle,userid,arrayurlimage);
    //         if (registerAlbumImage===-1) {
    //            throw new Error("The user does not exists");
    //             }
    //            console.log("The album of images was registered successfully");

    //         }
    //     }

    //  await addAlbum();

//     async function updateTitleAlbumImages() {

//         let updateTitleAlbumImage = await DataAlbumImages.updateTitleAlbum(3, "AlbumUpdated");
//          if (updateTitleAlbumImage===-1) {
//             throw new Error("The album of images does not exists");
//              }

//         console.log("The title was updated successfully");

//     }
//     await updateTitleAlbumImages();

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
// //#endregion
// //#region Images
let images=async()=>
 {
    // async function addImage() {
    //     for (let index = 11; index < 100; index++) {
    //         let dtophoto = new DTOPhoto();
    //         dtophoto.user.iduser = index;
    //         dtophoto.albumphoto.idalbumphoto = index;
    //         dtophoto.title = "Image" + index.toString();
    //         dtophoto.visibility = "Public";
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
    //         if (addImage===-3) {
    //             throw new Error("Visibility should only be Public or Private");
    //         }
        
        

    //          console.log("The image was added successfully");


    //     }
    // }
    // await addImage();

    // async function updatePhoto() {

    //     let updatePhoto = await 
    //     DataPhoto.updatePhoto(41,'ImageUpdated',"DecriptionUpdated","Public");
    //          if (updatePhoto===-1) {
    //         throw new Error("The image does not exists");
    //         }
    //         if (updatePhoto===-2) {
    //             throw new Error("Visibility should only be Public or Private");
    //         }
    //         console.log("The visibility was updated successfully");

    // }
    // await updatePhoto();



//     async function updateVisibilityPhoto() {

//         let updateVisibilityPhoto = await DataPhoto.updateVisibilityPhoto(2,'Friend');
//         if (updateVisibilityPhoto===-1) {
//             throw new Error("The image does not exists");
//             }
//             console.log("The visibility was updated successfully");

//     }
//     await updateVisibilityPhoto();

//      async function updateTitleDescriptionPhoto() {

//         let updateTitleDescriptionPhoto = await DataPhoto.updateTitleDescriptionPhoto(90,'Description Update','TitleImageUpdated');
//            if (updateTitleDescriptionPhoto===-1) {
//             throw new Error("The image does not exists");
//             }
//             console.log("The image was updated successfully");

//     }
//     await updateTitleDescriptionPhoto();

//     async function deletePhoto() {

//         let deletePhoto = await DataPhoto.deletePhoto(50);
//         if (deletePhoto===-1) {
//             throw new Error("The image does not exists");
//             }
//             console.log("The image was deleted successfully");

//     }
//     await deletePhoto();

//     let getImage = await DataPhoto.getImage(25);
//     if (getImage===-1) {
//          throw new Error("The image does not exists");
//       }
//     getImage.DiffDatePublishDateNow();
//     getImage.showDiffDatePublishDateNow();
//     console.log(getImage);

//     async function getImages() {
//         let array=await DataPhoto.getImages();
//         for (const image of array) {
//           image.DiffDatePublishDateNow()
//           image.showDiffDatePublishDateNow()
//             console.log(image);
//         }

//     }
//     await getImages();

//        async function getImagesByAlbum() {
//         let array=await DataPhoto.getImagesbyAlbum(26);
//         for (const image of array) {
//           image.DiffDatePublishDateNow()
//           image.showDiffDatePublishDateNow()
//             console.log(image);
//         }

//     }
//     await getImagesByAlbum();


//        async function getImagesbyAlbumAndUser() {
//         let array=await DataPhoto.getImagesbyAlbumAndUser(26,26);
//         for (const image of array) {
//           image.DiffDatePublishDateNow()
//           image.showDiffDatePublishDateNow()
//             console.log(image);
//         }

//     }
//     await getImagesbyAlbumAndUser();


//        async function getImagesbyIdUser() {
//         let array=await DataPhoto.getImagesbyIdUser(26);
//         for (const image of array) {
//           image.DiffDatePublishDateNow()
//           image.showDiffDatePublishDateNow()
//             console.log(image);
//         }

//     }
//     await getImagesbyIdUser();

    //    async function getImagesOrderByLikes() {
    //     let array=await DataPhoto.getImagesOrderByLikes();
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    // await getImagesOrderByLikes();
    

    //    async function getImagessOrderbyComments() {
    //     let array=await DataPhoto.getImagessOrderbyComments();
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    // await getImagessOrderbyComments();

    //  async function getImagesbyFriendUser() {
    //     let array=await DataPhoto.getImagesbyFriendUser(1);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    // await getImagesbyFriendUser();


    //  async function getSearchImages() {
    //     let array=await DataPhoto.getSearchImages("","","Im");
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    // await getSearchImages();

    // async function getUserFollowerImages() {
    //     let array=await DataPhoto.getUserFollowerImages(1);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    // await getUserFollowerImages();



    //      async function getImageSuggestedUser() {
    //     let array=await DataPhoto.getImageSuggestedUser(2,1);
    //     for (const image of array) {
    //       image.DiffDatePublishDateNow()
    //       image.showDiffDatePublishDateNow()
    //         console.log(image);
    //     }

    // }
    //  await getImageSuggestedUser();

    

     async function getImagesVisibilityPublicUser() {
        let array=await DataPhoto.getImagesVisibilityPublicUser(1,3);
        if(array===-1)
        {
            throw new Error("The user is blocked")
        }
        for (const image of array) {
          image.DiffDatePublishDateNow()
          image.showDiffDatePublishDateNow()
            console.log(image);
        }

    }
    await getImagesVisibilityPublicUser();

//      async function getImagesMainPage() {
//         let array=await DataPhoto.getImagesMainPage(1,'United Kingdom');

//         for (const image of array) {
//           image.DiffDatePublishDateNow()
//           image.showDiffDatePublishDateNow()
//             console.log(image);
//         }

//     }
//      await getImagesMainPage();


//      async function getImagesByLikeUser() {

//         let array=await DataPhoto.getImagesByLikeUser(3);

//         for (const image of array) {
//           image.DiffDatePublishDateNow()
//           image.showDiffDatePublishDateNow()
//             console.log(image);
//         }

//     }
//      await getImagesByLikeUser();







 }
  images().then()

// //#endregion
// //#region AlbumVideos

let albumvideo=async()=>
{
//    async function addAlbum() {
//        for (let index = 1; index < 100; index++) {
//             let userid = index;
//             let albumtitle = "AlbumVideo" + index.toString();
//          let arrayurlvideo=["urlvideo1","urlvideo2","urlvideo3","urlvideo4"]
//            let addAlbumVideo = await DataAlbumVideo.addAlbumVideo(albumtitle,userid,arrayurlvideo);
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
// //#endregion
// //#region Video
let videos=async()=>
 {
    // async function addvideo() {
    //     for (let index = 1; index < 100; index++) {
    //         let dtovid = new DTOVideo();
    //         dtovid.user.iduser = index;
    //         dtovid.albumvideo.idalbumvideo = index;
    //         dtovid.title = "Video" + index.toString();
    //         dtovid.visibility = "Public";
    //         dtovid.description = "Description" + index.toString();
    //         dtovid.DateTimePublish = new Date();
    //         dtovid.urlvideo = "UrlVideo" + index.toString();
    //         let addVideo = await DataVideo.addVideo(dtovid);
    //         if (addVideo===-1) {
    //             throw new Error("The user does not exists");
    //             }
    //         if (addVideo===-2) {
    //             throw new Error("The album of videos does not exists");
    //         }
    //         if (addVideo===-3) {
    //             throw new Error("Visibility should only be Public or Private");
    //         }
    //          console.log("The video was added successfully");


    //     }
    // }
    // await addvideo();

    //   async function updateVideo() {

    //     let updateVideo = await DataVideo.updateVideo(5,"Video5","Description5"
    //     ,"Public");
    //     if (updateVideo===-1) {
    //         throw new Error("The video does not exists");
    //         }
    //         if (updateVideo===-2) {
    //             throw new Error("Visibility should only be Public or Private");
    //             }
    //         console.log("The visibility was updated successfully");

    // }
    // await updateVideo();


//       async function updateVisibilityVideo() {

//         let updateVisibilityVideo = await DataVideo.updateVisibilityVideo(2,'Friend');
//         if (updateVisibilityVideo===-1) {
//             throw new Error("The video does not exists");
//             }
//             console.log("The visibility was updated successfully");

//     }
//     await updateVisibilityVideo();

//      async function updateTitleDescriptionVideo() {

//         let updateTitleDescriptionVideo = await DataVideo.updateTitleDescriptionVideo(2,'Description Update','TitleVideoUpdated');
//            if (updateTitleDescriptionVideo===-1) {
//             throw new Error("The video does not exists");
//             }
//             console.log("The video was updated successfully");

//     }
//     await updateTitleDescriptionVideo();
   
    //   async function deleteVideo() {

    //     let deleteVideo = await DataVideo.deleteVideo(34);
    //        if (deleteVideo===-1) {
    //         throw new Error("The video does not exists");
    //         }
    //         console.log("The video was deleted successfully");

    // }
    // await deleteVideo();

      

//     async function getVideo() {
//         let getVideo=await DataVideo.getVideo(4);
//         if (getVideo===-1) {
//              throw new Error("The video does not exists");
//          }
//          getVideo.DiffDatePublishDateNow();
//          getVideo.showDiffDatePublishDateNow();
//         console.log(getVideo);
//     }
//     await getVideo();

    // async function getSearchVideos() {
    //     let getSearchVideos=await DataVideo.getSearchVideos("","Descr","Update");
    //     for (const vid of getSearchVideos) {
    //         vid.DiffDatePublishDateNow()
    //          vid.showDiffDatePublishDateNow()
    //          console.log(vid);
    //         }
    // }
    // await getSearchVideos();

    //  async function getVideosOrderByDatePublish() {
    //     let getVideosOrderByDatePublish=await DataVideo.getVideosOrderByDatePublish();
    //     for (const vid of getVideosOrderByDatePublish) {
    //         vid.DiffDatePublishDateNow()
    //          vid.showDiffDatePublishDateNow()
    //          console.log(vid);
    //         }
    // }
    // await getVideosOrderByDatePublish();

    // async function getVideosByLikeUser() {
    //     let getVideosByLikeUser=await DataVideo.getVideosOrderByLikes();
    //     for (const vid of getVideosByLikeUser) {
    //         vid.DiffDatePublishDateNow()
    //          vid.showDiffDatePublishDateNow()
    //          console.log(vid);
    //         }
    // }
    // await getVideosByLikeUser();

    
    // async function getVideosOrderbyComments() {
    //     let getVideosOrderbyComments=await DataVideo.getVideosOrderbyComments();
    //     for (const vid of getVideosOrderbyComments) {
    //         vid.DiffDatePublishDateNow()
    //          vid.showDiffDatePublishDateNow()
    //          console.log(vid);
    //         }
    // }
    // await getVideosOrderbyComments();

    
    // async function getUserFollowerVideos() {
    //     let getUserFollowerVideos=await DataVideo.getUserFollowerVideos(1);
    //     for (const vid of getUserFollowerVideos) {
    //         vid.DiffDatePublishDateNow()
    //          vid.showDiffDatePublishDateNow()
    //          console.log(vid);
    //         }
    // }
    // await getUserFollowerVideos();

     
    // async function getVideosSuggestedUser() {
    //     let getVideosSuggestedUser=
    //     await DataVideo.getVideosSuggestedUser(1,2);
    //     for (const vid of getVideosSuggestedUser) {
    //         vid.DiffDatePublishDateNow()
    //          vid.showDiffDatePublishDateNow()
    //          console.log(vid);
    //         }
    // }
    // await getVideosSuggestedUser();






//      async function getVideosbyAlbum() {
//         let array=await DataVideo.getVideosbyAlbum(6)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosbyAlbum();

//      async function getVideosbyAlbumAndUser() {
//         let array=await DataVideo.getVideosbyAlbumAndUser(6,6)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosbyAlbumAndUser();


//      async function getVideosbyAlbumAndUser() {
//         let array=await DataVideo.getVideosbyAlbumAndUser(6,6)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosbyAlbumAndUser();


//       async function getVideosbyIdUser() {
//         let array=await DataVideo.getVideosbyIdUser(6)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
   
//     }
//     await getVideosbyIdUser();

    
//       async function getVideosVisibilityFriendUser() {
//         let array=await DataVideo.getVideosVisibilityFriendUser(1)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosVisibilityFriendUser();

//         async function getVideosVisibilityPublicUser() {
//         let array=await DataVideo.getVideosVisibilityPublicUser(4)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosVisibilityPublicUser();


    // async function getVideosbyFriendUser() {
    //     let array=await DataVideo.getVideosbyFriendUser(1)
    //     for (const vid of array) {
    //         vid.DiffDatePublishDateNow()
    //         vid.showDiffDatePublishDateNow()
    //         console.log(vid);
    //     }
      
    // }
    // await getVideosbyFriendUser();



//         async function getVideosVisibilityByUserRelation() {
//         let array=await DataVideo.getVideosVisibilityByUserRelation(4,5)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosVisibilityByUserRelation();

//     async function getVideosMainPage() {
//         let array=await DataVideo.getVideosMainPage(4,'United Kingdom')
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosMainPage();

//     async function getVideosByLikeUser() {
//         let array=await DataVideo.getVideosByLikeUser(1)
//         for (const vid of array) {
//             vid.DiffDatePublishDateNow()
//             vid.showDiffDatePublishDateNow()
//             console.log(vid);
//         }
      
//     }
//     await getVideosByLikeUser();

 }
 videos().then()
// //#endregion
// //#region Post
let posts=async()=>
 {
    // async function addpost() {
    //     for (let index = 1; index < 100; index++) {
    //         let dtopost = new DTOPost();
    //         dtopost.user.iduser = index;
    //         dtopost.title = "Post" + index.toString();
            
    //         dtopost.description = "Description" + index.toString();
    //         dtopost.visibility= "Public";
    //         let addPost = await DataPost.addPost(dtopost);
    //         if (addPost===-1) {
    //             throw new Error("The user does not exists");
    //         }
    //         if (addPost===-2) {
    //             throw new Error("Visibility should only be Public or Private");
    //         }
    //          console.log("The post was added successfully");
    //     }
    // }
    // await addpost();

    //  async function updatePost() {
    //             let updatePost = await
    //              DataPost.updatePost(1,"PostUpdated","Descriptionupdate","Public");
    //             if (updatePost===-1) {
    //                 throw new Error("The Post does not exists");
    //             }
    //             if (updatePost===-2) {
    //                 throw new Error("Visibility should only be Public or Private");
    //             }
    //             console.log("The post was updated successfully");
        
    //     }
    //         await updatePost();



//     async function updateVisibilityPost() {

//         let updateVisibilityPost = await DataPost.updateVisibilityPost(29,'Friend');
//         if (updateVisibilityPost===-1) {
//             throw new Error("The Post does not exists");
//         }
//         console.log("The visibility was updated successfully");

//     }
//     await updateVisibilityPost();

//     async function updateTitleDescriptionPost() {
//         let updateTitleDescriptionPost = await DataPost.updateTitleDescriptionPost(2,'Description Update','TitlePostUpdated');
//         if (updateTitleDescriptionPost===-1) {
//            throw new Error("The Post does not exists");
//         }
//             console.log("The post was updated successfully");
//     }

//     await updateTitleDescriptionPost();
   
    //  async function deletePost() {
    //     let deletePost = await DataPost.deletePost(15);
    //        if (deletePost===-1) {
    //             throw new Error("The post does not exists");
    //         }
    //         console.log("The post was deleted successfully");
    // }
    // await deletePost();

//     //****************************************************** */

//     async function getPost() {
//          let getPost=await DataPost.getPost(4);
//          if (getPost===-1) {
//              throw new Error("The Post does not exists");
//          }
//          getPost.DiffDatePublishDateNow();
//          getPost.showDiffDatePublishDateNow();
//          console.log(getPost);
//     }
//     await getPost();

//      async function getPosts() {
//         let array=await DataPost.getPosts();
//         for (const post of array) {
//           post.DiffDatePublishDateNow()
//           post.showDiffDatePublishDateNow()
//             console.log(post);
//         }
      
//     }
//      await getPosts();

        // async function getSearchPost() {
        //     let array=await DataPost.getSearchPost(
        //     );
        //     for (const post of array) {
        //       post.DiffDatePublishDateNow()
        //       post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
          
        // }
        //  await getSearchPost();


        
        // async function getPostOrderByLikes() {
        //     let array=await DataPost.getPostOrderByLikes(
        //     );
        //     for (const post of array) {
        //       post.DiffDatePublishDateNow()
        //       post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
          
        // }
        //  await getPostOrderByLikes();


          
        // async function getPostsOrderbyComments() {
        //     let array=await DataPost.getPostsOrderbyComments(
        //     );
        //     for (const post of array) {
        //       post.DiffDatePublishDateNow()
        //       post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
          
        // }
        //  await getPostsOrderbyComments();
    

          
        // async function getUserFollowerPost() {
        //     let array=await DataPost.getUserFollowerPost(3);
        //     for (const post of array) {
        //       post.DiffDatePublishDateNow()
        //       post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
          
        // }
        //  await getUserFollowerPost();

        //  async function getPostSuggestedUser() {
        //     let array=await DataPost.getPostSuggestedUser(2,3);
        //     for (const post of array) {
        //       post.DiffDatePublishDateNow()
        //       post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
          
        // }
        //  await getPostSuggestedUser();


//      async function getPostbyIdUser() {
//         let array=await DataPost.getPostbyIdUser(6)
//         for (const post of array) {
//           post.DiffDatePublishDateNow()
//           post.showDiffDatePublishDateNow()
//             console.log(post);
//         }
      
//     }
//     await getPostbyIdUser();

//      async function getPostVisibilityFriendUser() {
//         let array=await DataPost.getPostVisibilityFriendUser(6)
//         for (const post of array) {
//           post.DiffDatePublishDateNow()
//           post.showDiffDatePublishDateNow()
//             console.log(post);
//         }
      
//     }
//     await getPostVisibilityFriendUser();

//      async function getPostVisibilityPublicUser() {
//         let array=await DataPost.getPostVisibilityPublicUser(6)
//         for (const post of array) {
//           post.DiffDatePublishDateNow()
//           post.showDiffDatePublishDateNow()
//             console.log(post);
//         }
      
//     }
//     await getPostVisibilityPublicUser();


//   async function getPostbyFriendUser() {
//         let array=await DataPost.getPostbyFriendUser(6)
//         for (const post of array) {
//           post.DiffDatePublishDateNow()
//           post.showDiffDatePublishDateNow()
//             console.log(post);
//         }
      
//     }
//     await getPostbyFriendUser();

//     async function getPostVisibilityByUserRelation() {
//       let array=await DataPost.getPostVisibilityByUserRelation(5,9)
//       for (const post of array) {
//         post.DiffDatePublishDateNow()
//         post.showDiffDatePublishDateNow()
//           console.log(post);
//       }
    
//   }
//   await getPostVisibilityByUserRelation();

//   async function getPostMainPage() {
//       let array=await DataPost.getPostMainPage(3,'')
//       for (const post of array) {
//         post.DiffDatePublishDateNow()
//         post.showDiffDatePublishDateNow()
//           console.log(post);
//       }
    
//   }
//   await getPostMainPage();

//   async function getPostByLikeUser() {
//       let array=await DataPost.getPostByLikeUser(1)
//       for (const post of array) {
//         post.DiffDatePublishDateNow()
//         post.showDiffDatePublishDateNow()
//           console.log(post);
//       }
    
//   }
//   await getPostByLikeUser();



 }
 posts().then()
// //#endregion
// //#region  PostVideoImages

let postvideoimage=async()=>
 {
        // async function getPhotoPostVideoMainPage() {
        //     let array=
        //     await DataPhotoPostVideo.getPhotoPostVideoMainPage(1)

        //     for (const post of array) {
        //         post.DiffDatePublishDateNow()
        //         post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
         
        // }
      
        // await getPhotoPostVideoMainPage();


       

        // async function getPhotoPostVideoSearch() {
        //     let array=await DataPhotoPostVideo.getPhotoPostVideoSearch('1')
        //     for (const post of array) {
        //         post.DiffDatePublishDateNow()
        //         post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
            
        // }
        // await getPhotoPostVideoSearch();

        //  async function getPhotoPostVideoUserLikes() {
        //     let array=await DataPhotoPostVideo.getPhotoPostVideoUserLikes(1)
        //     for (const post of array) {
        //         post.DiffDatePublishDateNow()
        //         post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
            
        // }
        
        // await getPhotoPostVideoUserLikes();

        //   async function getPhotoPostVideoByUser() {
        //     let getPhotoPostVideoByUser=await DataPhotoPostVideo.getPhotoPostVideoByUser(2,1)
        //     if(getPhotoPostVideoByUser===-1)
        //     {
        //         throw new Error("The user is blocked");
        //     }
        //     for (const post of getPhotoPostVideoByUser) {
        //         post.DiffDatePublishDateNow()
        //         post.showDiffDatePublishDateNow()
        //         console.log(post);
        //     }
            
        // }
        
        // await getPhotoPostVideoByUser();

//         async function getPhotoPostVideoByIdAndType() {
//             let data=await DataPhotoPostVideo.getPhotoPostVideoByIdAndType(2,'V')   
//             data.DiffDatePublishDateNow()
//             data.showDiffDatePublishDateNow()
//              console.log(data);
        
            
//         }
        
//         await getPhotoPostVideoByIdAndType();


 }
 postvideoimage().then()

 
// //#endregion
// //#region LikeImage
let LikeImage=async()=>
 {
    // async function likeanimage() {
    
    //         let likeanimage = await DataLikeImage.likeanimage(1,45);
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


//     async function deletelikeanimage() {
    
//             let loginuserid=2;
//             if (loginuserid!=2) {
//                throw new Error("Only the logged in user can delete his comment");
//              }
//             let deletelikeanimage = await DataLikeImage.deletelikeanimage(2,1);
//             if (deletelikeanimage===-1) {
//                 throw new Error("The image does not exists");
//             }
//             if (deletelikeanimage===-2) {
//                 throw new Error("The user does not exists");
//             }
//             if (deletelikeanimage===-3) {
//                 throw new Error("The likeimage does not exists ");
//             }
//              console.log("The likeimage was deleted  successfully");
       
//     }
//     await deletelikeanimage();

//     let getLikesImageUsers = await DataUser.getLikesImageUsers(1);
//     console.log(getLikesImageUsers);

    
//     let NumberOfLikesImage = await DataLikeImage.NumberOfLikesImage(1);
//     console.log(NumberOfLikesImage);

    // let existLikeImage = await DataLikeImage.existLikeImage(2,41);
    // console.log(existLikeImage);




 }
 LikeImage().then()
// //#endregion
// //#region LikeVideos
let LikeVideos=async()=>
{
//    async function likeanvideos() {
   
//            let likeanvideos = await DataLikeVideo.likeanvideo(1,8);
//            if (likeanvideos===-1) {
//                throw new Error("The video does not exists");
//            }
//            if (likeanvideos===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (likeanvideos===-3) {
//                throw new Error("The user already liked that video");
//            }
//             console.log("The likevideo was added successfully");
      
//    }
//    await likeanvideos();


//    async function deletelikeanvideo() {
   
//            let deletelikeanvideo = await DataLikeVideo.deletelikeanvideo(1,8);
//            if (deletelikeanvideo===-1) {
//                throw new Error("The video does not exists");
//            }
//            if (deletelikeanvideo===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (deletelikeanvideo===-3) {
//                throw new Error("The likevideo does not exists ");
//            }
//             console.log("The likevideo was deleted  successfully");
      
//    }
//    await deletelikeanvideo();

//    let getLikesVideoUsers = await DataUser.getLikesVideoUsers(1);
//    console.log(getLikesVideoUsers);

//    let NumberOfLikesVideos = await DataLikeVideo.NumberOfLikesVideos(1);
//    console.log(NumberOfLikesVideos);


// let existLikeVideo = await DataLikeVideo.existLikeVideo(2,5);
// console.log(existLikeVideo);



}
LikeVideos().then()
// //#endregion
// //#region LikePost
let LikePost=async()=>
{
//    async function likeanpost() {
   
//            let likeanpost = await DataLikePost.likeanpost(1,4);
//            if (likeanpost===-1) {
//                throw new Error("The post does not exists");
//            }
//            if (likeanpost===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (likeanpost===-3) {
//                throw new Error("The user already liked that post");
//            }
//             console.log("The likepost was added successfully");
      
//    }
//    await likeanpost();


//    async function deletelikeanpost() {
   
//            let deletelikeanpost = await DataLikePost.deletelikeanpost(2,1);
//            if (deletelikeanpost===-1) {
//                throw new Error("The post does not exists");
//            }
//            if (deletelikeanpost===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (deletelikeanpost===-3) {
//                throw new Error("The likepost does not exists ");
//            }
//             console.log("The likepost was deleted  successfully");
      
//    }
//    await deletelikeanpost();

//    let getLikesPostUsers = await DataUser.getLikesPostUsers(1);
//    console.log(getLikesPostUsers);

//    let NumberOfLikesPost = await DataLikePost.NumberOfLikesPost(1);
//    console.log(NumberOfLikesPost);


// let existLikePost = await DataLikePost.existLikePost(1,1);
// console.log(existLikePost);

}
LikePost().then()

// //#endregion
// //#region LikeComment
let LikeComment=async()=>
{
//    async function likeancomment() {
   
//            let likeancomment = await DataLikeComment.likeancomment(3,3);
//            if (likeancomment===-1) {
//                throw new Error("The comment does not exists");
//            }
//            if (likeancomment===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (likeancomment===-3) {
//                throw new Error("The user already liked that comment");
//            }
//             console.log("The likeancomment was added successfully");
      
//    }
//    await likeancomment();

//    async function deletelikeancomment() {
   
//             let loginuser=4;
//             if(loginuser!=4)
//             {
//                 throw new Error("Only the logged in user can delete his comment");
//             }
//            let deletelikeancomment = await DataLikeComment.deletelikeancomment(4,7);
//            if (deletelikeancomment===-1) {
//                throw new Error("The comment does not exists");
//            }
//            if (deletelikeancomment===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (deletelikeancomment===-3) {
//                throw new Error("The likecomment does not exists ");
//            }
//             console.log("The likecomment was deleted  successfully");
      
//    }
//    await deletelikeancomment();

//    let getLikesCommentUsers = await DataUser.getLikesCommentUsers(7);
//    console.log(getLikesCommentUsers);

// let existLikeComment = await DataLikeComment.existLikeComment(2,10);
// console.log(existLikeComment);


}
LikeComment().then()

// //#endregion
// //#region LikeSubComment

let LikeSubComment=async()=>
{
//    async function likeansubcomment() {
   
//            let likeansubcomment = 
//            await DataLikeSubComment.likeansubcomment(12,6);
//            if (likeansubcomment===-1) {
//                throw new Error("The sub comment does not exists");
//            }
//            if (likeansubcomment===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (likeansubcomment===-3) {
//                throw new Error("The user already liked that subcomment");
//            }
//             console.log("The like sub comment was added successfully");
      
//    }
//    await likeansubcomment();

//    async function deletelikeansubcomment() {
   
//             let loginuser=4;
//             if(loginuser!=4)
//             {
//                 throw new Error("Only the logged in user can delete his comment");
//             }
//            let deletelikeansubcomment = await DataLikeSubComment.deletelikeansubcomment(5,21);
//            if (deletelikeansubcomment===-1) {
//                throw new Error("The subcomment does not exists");
//            }
//            if (deletelikeansubcomment===-2) {
//                throw new Error("The user does not exists");
//            }
//            if (deletelikeansubcomment===-3) {
//                throw new Error("The likesubcomment does not exists ");
//            }
//             console.log("The likesubcomment was deleted  successfully");
      
//    }
//    await deletelikeansubcomment();

//    let getLikesCommentUsers = await DataUser.getLikesCommentUsers(7);
//    console.log(getLikesCommentUsers);

// let existLikeSubComment = await DataLikeSubComment.existLikeSubComment(1,1);
// console.log(existLikeSubComment);


}
LikeSubComment().then()


// //#endregion    
// //#region CommentImage

let CommentImage=async()=>
{

    //    async function commentimage() {
   
    //        let commentimage = await
    //         DataCommentImage.CommentImage(12,42,"Image Comment");
    //        if (commentimage===-1) {
    //            throw new Error("The image does not exists");
    //        }
    //        if (commentimage===-2) {
    //            throw new Error("The user does not exists");
    //        }
    //         console.log("The comment image was added successfully");
      
    //     }
    //         await commentimage();


//     async function UpdateTextCommentImage() {
   
    
//            let UpdateTextCommentImage = 
//            await DataCommentImage.UpdateTextCommentImage
//            (12,9,41,"UpdateedCoommentImage");
//            if (UpdateTextCommentImage===-1) {
//                throw new Error("The comment images does not exists");
//            }
//            if (UpdateTextCommentImage===-2) {
//             throw new Error("The image does not exists");
//         }
//            if (UpdateTextCommentImage===-3) {
//                throw new Error("The user does not exists");
//            }
//            if (UpdateTextCommentImage===-4) {
//             throw new Error("The comment does not exists");
//         }
//             console.log("The comment image was updated successfully");
      
//    }
    
//    await UpdateTextCommentImage();

//     async function deleteCommentImage() {
   
//           let loginuserid=4;
//           if (loginuserid!=4) {
//             throw new Error("Only the logged in user can delete his comment");
//             }
//            let deleteCommentImage = await DataCommentImage.deleteCommentImage(11,8,41);
//            if (deleteCommentImage===-1) {
//              throw new Error("The comment images does not exists");
//                 }
//              if (deleteCommentImage===-2) {
//                 throw new Error("The image does not exists");
//              }
//              if (deleteCommentImage===-3) {
//                  throw new Error("The user does not exists");
//              }
//             if (deleteCommentImage===-4) {
//               throw new Error("The comment does not exists");
//                }
           
//             console.log("The comment image was deleted successfully");
      
//    }
    
//    await deleteCommentImage();


//  async function getsCommentsImage() {
//         let array=await DataCommentImage.getsCommentsImage(41);
//         for (const commentimg of array) {
//             commentimg.DiffDatePublishDateNow()
//             commentimg.showDiffDatePublishDateNow()
//             console.log(commentimg)
//         }
      
//     }
//      await getsCommentsImage();

//    let NumberOfCommentImage = await DataCommentImage.NumberOfCommentImage(1);
//    console.log(NumberOfCommentImage);

//    let existCommentImage = await DataCommentImage.existCommentImage(8,41);
//    console.log(existCommentImage);

}
CommentImage().then()

// //#endregion
// //#region CommentPost

let CommentPost=async()=>
{

    //    async function commentpost() {
   
    //        let CommentPost = await DataCommentPost.CommentPost(2,1,"Comment Post");
    //        if (CommentPost===-1) {
    //            throw new Error("The post does not exists");
    //        }
    //        if (CommentPost===-2) {
    //            throw new Error("The user does not exists");
    //        }
    //         console.log("The comment post was added successfully");
      
    //     }
    //     await commentpost();


//     async function UpdateTextCommentPost() {
   
//          let loginuserid=1;
//          if (loginuserid!=1) {
//                 throw new Error("Only the logged in user can delete his comment");
//              }
//            let UpdateTextCommentPost = await DataCommentPost.UpdateTextCommentPost(1,10,1,"UpdateedCoomment");
//            if (UpdateTextCommentPost===-1) {
//                throw new Error("The comment post does not exists");
//            }
//            if (UpdateTextCommentPost===-2) {
//             throw new Error("The post does not exists");
//         }
//            if (UpdateTextCommentPost===-3) {
//                throw new Error("The user does not exists");
//            }
//            if (UpdateTextCommentPost===-4) {
//             throw new Error("The comment does not exists");
//         }
//             console.log("The comment post was updated successfully");
      
//    }
    
//    await UpdateTextCommentPost();

//     async function deleteCommentPost() {
   
//           let loginuserid=4;
//           if (loginuserid!=4) {
//             throw new Error("Only the logged in user can delete his comment");
//             }
//            let deleteCommentPost = await DataCommentPost.deleteCommentPost(1,10,1);
//            if (deleteCommentPost===-1) {
//              throw new Error("The comment post does not exists");
//                 }
//              if (deleteCommentPost===-2) {
//                 throw new Error("The post does not exists");
//              }
//              if (deleteCommentPost===-3) {
//                  throw new Error("The user does not exists");
//              }
//             if (deleteCommentPost===-4) {
//               throw new Error("The comment does not exists");
//                }
           
//             console.log("The comment post was deleted successfully");
      
//    }
    
//    await deleteCommentPost();



//  async function getsCommentsPost() {
//         let array=await DataCommentPost.getsCommentsPost(4);
//         for (const commentpost of array) {
//             commentpost.DiffDatePublishDateNow()
//             commentpost.showDiffDatePublishDateNow()
//             console.log(commentpost);
//         }     
//     }
//    await getsCommentsPost();
   
// let NumberOfCommentPost = await DataCommentPost.NumberOfCommentPost(1);
// console.log(NumberOfCommentPost);


//    let existCommentPost = await DataCommentPost.existCommentPost(15,2);
//    console.log(existCommentPost);

}
CommentPost().then()

// //#endregion
// //#region CommentVideo

let CommentVideo=async()=>
{

    //    async function CommentVideo() {
   
    //        let CommentVideo = await DataCommentVideo.CommentVideo(
    //          8,7,"VideoComment");
    //        if (CommentVideo===-1) {
    //            throw new Error("The video does not exists");
    //        }
    //        if (CommentVideo===-2) {
    //            throw new Error("The user does not exists");
    //        }
    //         console.log("The comment video was added successfully");
      
    //     }
    //     await CommentVideo();


//     async function UpdateTextCommentVideo() {
   
//          let loginuserid=1;
//          if (loginuserid!=1) {
//                 throw new Error("Only the logged in user can delete his comment");
//              }
//            let UpdateTextCommentVideo = await DataCommentVideo.UpdateTextCommentVideo(1,18,1,"UpdateedVideoCoomment");
//            if (UpdateTextCommentVideo===-1) {
//                throw new Error("The comment video does not exists");
//            }
//            if (UpdateTextCommentVideo===-2) {
//             throw new Error("The video does not exists");
//         }
//            if (UpdateTextCommentVideo===-3) {
//                throw new Error("The user does not exists");
//            }
//            if (UpdateTextCommentVideo===-4) {
//             throw new Error("The comment does not exists");
//         }
//             console.log("The comment video was updated successfully");
      
//    }
    
//    await UpdateTextCommentVideo();

//     async function deleteCommentVideo() {
   
//           let loginuserid=4;
//           if (loginuserid!=4) {
//             throw new Error("Only the logged in user can delete his comment");
//             }
//            let deleteCommentVideo = await DataCommentVideo.deleteCommentVideo(1,18,1);
//            if (deleteCommentVideo===-1) {
//              throw new Error("The comment video does not exists");
//                 }
//              if (deleteCommentVideo===-2) {
//                 throw new Error("The video does not exists");
//              }
//              if (deleteCommentVideo===-3) {
//                  throw new Error("The user does not exists");
//              }
//             if (deleteCommentVideo===-4) {
//               throw new Error("The comment does not exists");
//                }
           
//             console.log("The comment video was deleted successfully");
      
//    }
    
//    await deleteCommentVideo();

//  async function getsCommentsVideo() {
//         let array=await DataCommentVideo.getsCommentsVideo(6);
//         for (const commentvideo of array) {
//             commentvideo.DiffDatePublishDateNow()
//             commentvideo.showDiffDatePublishDateNow()
//             console.log(commentvideo);
//         }     
//     }
//    await getsCommentsVideo();

// let NumberOfCommentVideo = await DataCommentVideo.NumberOfCommentVideo(1);
// console.log(NumberOfCommentVideo);


//    let existCommentVideo = await DataCommentVideo.existCommentVideo(7,5);
//    console.log(existCommentVideo);
}
CommentVideo().then()

// //#endregion
// //#region SubComment

let SubComment=async()=>
{

    //    async function addSubComment() {
   
    //        let addSubComment =
    //         await DataSubComment.addSubComment(2,11,"SubComment");
    //        if (addSubComment===-1) {
    //            throw new Error("The comment does not exists");
    //        }
    //        if (addSubComment===-2) {
    //            throw new Error("The user does not exists");
    //        }
    //         console.log("The sub comment was added successfully");
      
    // }
    //  await addSubComment();

    
    //    async function updateSubCommentText() {
           
    //        let updateSubCommentText = await DataSubComment.updateSubCommentText(1,1,1,"SubCommentUpdated");
    //        if (updateSubCommentText===-1) {
    //            throw new Error("The comment does not exists");
    //        }
    //        if (updateSubCommentText===-2) {
    //            throw new Error("The user does not exists");
    //        }
    //        if (updateSubCommentText===-3) {
    //         throw new Error("The sub comment does not exists");
    //         }
    //         console.log("The sub comment was updated successfully");
      
    // }
    //  await updateSubCommentText();

    
    //  async function deleteSubComment() {
    //         let loginuserid=1
    //         if (loginuserid!=1) {
    //           throw new Error("Only the logged in user can deleted his subcomment");
    //         }
    //        let deleteSubComment = await DataSubComment.deleteSubComment(2,7);
    //        if (deleteSubComment===-1) {
    //         throw new Error("The user does not exists");
    //        }
    //        if (deleteSubComment===-2) {
    //         throw new Error("The sub comment does not exists");
    //        }
          
    //         console.log("The sub comment was deleted successfully");
      
    // }
    //  await deleteSubComment();


// async function getSubCommentsByComment() {
//     let array=await DataSubComment.getSubCommentsByComment(15);
//     for (const subcommentv of array) {
       
            
//             subcommentv.DiffDatePublishDateNowSubComment()
//             subcommentv.showDiffDatePublishDateNowSubComment()
    
        
//         console.log(subcommentv);
       
//     }     
// }
// await getSubCommentsByComment();

//  async function getIfExistsSubComentsOfCommentsImage() {
//         let array=await DataSubComment.getIfExistsSubComentsOfCommentsImage(1);
//         for (const subcommentimg of array) {
//             if (subcommentimg.withsubcomments===1) {     
//                 subcommentimg.DiffDatePublishDateNowComment()
//                 subcommentimg.showDiffDatePublishDateNowComment()
                
//                 subcommentimg.DiffDatePublishDateNowSubComment()
//                 subcommentimg.showDiffDatePublishDateNowSubComment()
        
//             } else 
//             {
//                 subcommentimg.DiffDatePublishDateNowComment()
//                 subcommentimg.showDiffDatePublishDateNowComment()
               
//             }
//             console.log(subcommentimg);
           
//         }     
//     }
//    await getIfExistsSubComentsOfCommentsImage();

// async function getIfExistsSubComentsOfCommentsPost() {
//     let array=await DataSubComment.getIfExistsSubComentsOfCommentsPost(1);
//     for (const subcommentpost of array) {
//         if (subcommentpost.withsubcomments===1) {     
//             subcommentpost.DiffDatePublishDateNowComment()
//             subcommentpost.showDiffDatePublishDateNowComment()
            
//             subcommentpost.DiffDatePublishDateNowSubComment()
//             subcommentpost.showDiffDatePublishDateNowSubComment()
    
//         } else 
//         {
//             subcommentpost.DiffDatePublishDateNowComment()
//             subcommentpost.showDiffDatePublishDateNowComment()
           
//         }
//         console.log(subcommentpost);
       
//     }     
// }
// await getIfExistsSubComentsOfCommentsPost();


// async function getIfExistsSubComentsOfCommentsVideo() {
//     let array=await DataSubComment.getIfExistsSubComentsOfCommentsVideo(1);
//     for (const subcommentv of array) {
//         if (subcommentv.withsubcomments===1) {     
//             subcommentv.DiffDatePublishDateNowComment()
//             subcommentv.showDiffDatePublishDateNowComment()
            
//             subcommentv.DiffDatePublishDateNowSubComment()
//             subcommentv.showDiffDatePublishDateNowSubComment()
    
//         } else 
//         {
//             subcommentv.DiffDatePublishDateNowComment()
//             subcommentv.showDiffDatePublishDateNowComment()
           
//         }
//         console.log(subcommentv);
       
//     }     
// }
// await getIfExistsSubComentsOfCommentsVideo();

// async function getSubCommentsByUserComment() {
//     let array=await DataSubComment.getSubCommentsByUserComment(15,1);
//     for (const subcommentv of array) {
       
//             subcommentv.DiffDatePublishDateNowComment()
//             subcommentv.showDiffDatePublishDateNowComment()
            
//             subcommentv.DiffDatePublishDateNowSubComment()
//             subcommentv.showDiffDatePublishDateNowSubComment()
    
        
//         console.log(subcommentv);
       
//     }     
// }
// await getSubCommentsByUserComment();

//    let NumberOfSubComments = await DataSubComment.NumberOfSubComments(14);
//    console.log(NumberOfSubComments);

//    let existSubComment = await DataSubComment.existSubComment(1,1);
//    console.log(existSubComment);

}
SubComment().then()
// //#endregion
// //#region Messages

let Messages=async()=>
{
   


    //  async function addMessage() {
   
    //     let userreceived=1;
    //     let usersender=3;
    //     if (userreceived===usersender) {
    //         throw new Error("The sending user cannot be the same as the receiving user");
    //        }
    //        let addMessage = await DataMessage.addMessage
    //        (userreceived,usersender,"New Message");
          
    //        if (addMessage===-1) {
    //            throw new Error("The user received does not exists");
    //        }
    //        if (addMessage===-2) {
    //            throw new Error("The user sender does not exists");
    //        }
    //        if (addMessage===-3) {
    //         throw new Error("The chat room does not exists");
    //     }
       
        
    //         console.log("The message was added successfully");
      
    // }
    //  await addMessage();




//     async function deleteMessage() {
   
//             let userreceived=1;
//             let usersender=2;
//             if (userreceived===usersender) {
//                 throw new Error("The sending user cannot be the same as the receiving user");
//                }
//                let deleteMessage = await DataMessage.deleteMessage(userreceived,usersender,2);
              
//                if (deleteMessage===-1) {
//                    throw new Error("The user received does not exists");
//                }
//                if (deleteMessage===-2) {
//                    throw new Error("The user sender does not exists");
//                }
//                if (deleteMessage===-3) {
//                 throw new Error("The message does not exists");
//             }
//                 console.log("The message was deleted successfully");
          
//         }
//         await deleteMessage();
    

//  async function getMessagesChatRoom() {
//         let array=await DataMessage.getMessagesChatRoom(3,2);
//         for (const message of array) {
//             console.log(message);
//         }     
//     }
//    await getMessagesChatRoom();
   

}
Messages().then()

// //#endregion 

// //#region Messages

let ChatRoom=async()=>
{
   
//  async function addChatRoom() {
   
//         let userreceived=1;
//         let usersender=4;
//         if (userreceived===usersender) {
//             throw new Error("The sending user cannot be the same as the receiving user");
//            }
//            let addMessagewithchatroom = await DataChatRoom.addChatRoom(userreceived,usersender,"TitleMessage","TextMessage");
          
//            if (addMessagewithchatroom===-1) {
//                throw new Error("The user received does not exists");
//            }
//            if (addMessagewithchatroom===-2) {
//                throw new Error("The user sender does not exists");
//            }
//            if (addMessagewithchatroom===-3) {
//             throw new Error("The chat room already exists");
//         }
//             console.log("The chat room was added successfully");
      
//     }
//      await addChatRoom();

    // async function deleteChatRoom() {
   
    //         let userreceived=2;
    //         let usersender=3;
    //         if (userreceived===usersender) {
    //             throw new Error("The sending user cannot be the same as the receiving user");
    //            }
    //            let deleteChatRoom = await DataChatRoom.deleteChatRoom(userreceived,usersender,2);
              
    //            if (deleteChatRoom===-1) {
    //                throw new Error("The chatroom does not exists");
    //            }
              
            
    //             console.log("The chatroom was deleted successfully");
          
    //     }
    //     await deleteChatRoom();
    

    
    // let getChatRoomsByUser=await DataChatRoom.getChatRoomsByUser(1);
    //         for (const message of getChatRoomsByUser) {
    //             message.DiffDateMessageDateNow()
    //             message.showDiffDateMessageDateNow()
            
    //             console.log(message);
    //         } 
    
}
ChatRoom().then()

// //#endregion 

//#region NOTIFICATIONS

let UserPendingNotifications=async()=>
{
//       async function addUserRelation() {

//             let dtour = new DTOUserRelation();
//             dtour.user.iduser = 1;
//             dtour.friend.iduser = 15;

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
//    }
//    await addUserRelation();
       

    
    //     let getSentPendingUsersbyUser =
    //      await DataUserRelation.getSentPendingUsersbyUser(15);
    //     console.log(getSentPendingUsersbyUser);
    
}  
UserPendingNotifications().then()

let NotificationComents=async()=>
{

    //    async function CommentVideo() {
   
    //        let CommentVideo = await DataCommentVideo.CommentVideo(
    //          8,7,"VideoComment");
    //        if (CommentVideo===-1) {
    //            throw new Error("The video does not exists");
    //        }
    //        if (CommentVideo===-2) {
    //            throw new Error("The user does not exists");
    //        }
    //         console.log("The comment video was added successfully");
      
    //     }
    //     await CommentVideo();

//    async function deleteNotiCommentsByUser() {
//         let deleteNotiCommentsByUser =
//         await DataNotification.deleteNotiCommentsByUser(1);
//             if (deleteNotiCommentsByUser===-1) {
//                 throw new Error("The user does not exists");
//             }
         
//              console.log("Notifications Deleted");
//    }
//    await deleteNotiCommentsByUser();


        // let getNotificationCommentsByUser = 
        // await DataNotification.getNotificationCommentsByUser(1);
        // for (const notification of getNotificationCommentsByUser) {
        //      notification.DiffDateNotificationDateNow();
        //      notification.showDiffDateNotificationDateNow();
        //      console.log(notification);
        // }
      
  
}  
NotificationComents().then()

let NotificationsMessages=async()=>
{

  

//    async function addMessage() {
   
//         let userreceived=1;
//         let usersender=3;
//         if (userreceived===usersender) {
//             throw new Error("The sending user cannot be the same as the receiving user");
//            }
//            let addMessage = await DataMessage.addMessage
//            (userreceived,usersender,"New Message");
          
//            if (addMessage===-1) {
//                throw new Error("The user received does not exists");
//            }
//            if (addMessage===-2) {
//                throw new Error("The user sender does not exists");
//            }
//            if (addMessage===-3) {
//             throw new Error("The chat room does not exists");
//         }
       
        
//             console.log("The message was added successfully");
      
//     }
  //   await addMessage();



        // let getNotificationMessagesByUser = 
        // await DataNotification.getNotificationMessagesByUser(1);
        // for (const notification of getNotificationMessagesByUser) {
        //      notification.DiffDateNotificationDateNow();
        //      notification.showDiffDateNotificationDateNow();
        //      console.log(notification);
        // }
      
  
}  
NotificationsMessages().then()


//#endregion




