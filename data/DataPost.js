// class DataPost {
//     //#region CRUD
//      static addImages=async(dtimages)=>
//     {
//        let resultquery;
//         let queryinsert = `
    
//         IF NOT EXISTS ( SELECT * FROM Userr WHERE IdUser=@IdUser and Active=1)
//         BEGIN
//           select -1 as notexistuser
//         END
//         ELSE
//         BEGIN
//           IF NOT EXISTS ( SELECT * FROM AlbumUserImages WHERE IdAlbumImages=@IdAlbumImages and Active=1)
//           BEGIN
//              select -2 as notexistalbum
//           END
//           ELSE
//           BEGIN
//              insert into UserImages values  (@IdUser,@IdAlbumImages,@Title,@Descriptionn ,@Likes,@Urlimage,'Public',GETUTCDATE(),1)
//              select 1 as addedphoto
//           END
//         END
        
    
//         `
//         let pool = await Conection.conection();
    
//         const result = await pool.request()
//             .input('IdUser', Int,dtimages.user.iduser)
//             .input('IdAlbumImages', Int, dtimages.albumphoto.idalbumphoto)
//             .input('Title', VarChar, dtimages.title)
//             .input('Descriptionn', VarChar, dtimages.description)
//             .input('Likes', Int, dtimages.likes)
//             .input('Urlimage', VarChar, dtimages.urlimage)       
//             .query(queryinsert)
//             resultquery = result.recordset[0].notexistuser;
//             if(resultquery===undefined)
//             {
//               resultquery = result.recordset[0].notexistalbum;
//               if(resultquery===undefined)
//               {
//                 resultquery = result.recordset[0].addedphoto;
//               }
//             }
//         pool.close();
//         return resultquery;
        
//     }
//      static updateVisibilityPhoto=async(idimage,visibility)=>
//     {
//        let resultquery;
//         let queryupdate = `
//         IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
//         BEGIN
//         select -1 as notexistimage
//         END
//         ELSE
//         BEGIN
//         update UserImages set Visibility=@Visibility where IdUserImages=@IdUserImages
//         select 1 as updatedphoto
//         END
//         `
//         let pool = await Conection.conection();
//              const result = await pool.request()
//             .input('Visibility', VarChar,visibility)
//             .input('IdUserImages', Int, idimage)   
//             .query(queryupdate)
//             resultquery = result.recordset[0].notexistimage;
//             if(resultquery===undefined)
//             {
//               resultquery = result.recordset[0].updatedphoto;
//             }
//         pool.close();
//         return resultquery;
        
//     }
//      static updateTitleDescriptionPhoto=async(idimage,description,title)=>
//     {
//        let resultquery;
//         let queryupdate = `
//         IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
//         BEGIN
//         select -1 as notexistimage
//         END
//         ELSE
//         BEGIN
//         update UserImages set Title=@Title,Descriptionn=@Descriptionn where IdUserImages=@IdUserImages
//         select 1 as updatedphoto
//         END
//         `
//         let pool = await Conection.conection();
    
//         const result = await pool.request()
//             .input('Title', VarChar,title)
//             .input('Descriptionn', VarChar,description)
//             .input('IdUserImages', Int, idimage)
//             .query(queryupdate)
//             resultquery = result.recordset[0].notexistimage;
//             if(resultquery===undefined)
//             {
//               resultquery = result.recordset[0].updatedphoto;
//             }
//         pool.close();
//         return resultquery;
        
//     }
//      static deletePhoto=async(idimage)=>
//     {
//        let resultquery;
//         let queryupdate = `
    
//         IF NOT EXISTS ( SELECT * FROM UserImages WHERE IdUserImages=@IdUserImages and Active=1)
//         BEGIN
//         select -1 as notexistimage
//         END
//         ELSE
//         BEGIN
//         update UserImages set Active=0 where IdUserImages=@IdUserImages
//         select 1 as deletephoto
//         END
    
//         `
//         let pool = await Conection.conection();
//         const result = await pool.request()
//        .input('IdUserImages', Int, idimage)
//        .query(queryupdate)
//             resultquery = result.recordset[0].notexistimage;
//             if(resultquery===undefined)
//             {
//               resultquery = result.recordset[0].deletephoto;
//             }
//         pool.close();
//         return resultquery;
        
//     }
// }
// module.exports = { DataPost };