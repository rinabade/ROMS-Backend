const connection = require('../db-Config');
const multer = require('multer');
const path =require('path')


// Use Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, path.join(__dirname, "public/images/")); // './public/images/' directory name where to save the file
    },
    filename: (req, file, callBack) => {
        callBack(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    }
});
const uploads = multer({ storage: storage });
module.exports = {
    name: "file",
    actions:{
        handlePostRequest: {
            rest: "POST /",
            async handler(ctx) {
                const {image} = ctx.params
                    uploads.single("image")
                        console.log(image);
                        const imgsrc = "/public/images/" + image;
                        const insertData = "INSERT INTO images(filename) VALUES(?)";
                        const result = connection.query(insertData, [imgsrc])
                        console.log(result);
                      }
                    
        }
    }
}








// const path = require("path");
// const sharp = require("sharp");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const connection = require("../db-Config");

// module.exports = {
//   name: "file",
//   actions: {
//     handlePostRequest: {
//       rest: "POST /",
//       async handler(ctx) {
//         try {
//           const { image } = ctx.params;
//             console.log(image);
//           // Process the stream and convert it to a buffer
//           const buffer = await this.processStream(image);

//           // Generate a unique filename using UUID
//           const filename = `${uuidv4()}${path.extname(image.originalname)}`;

//           // Resize and save the image using Sharp
//           await sharp(buffer)
//             .resize(200, 200)
//             .toFormat("jpg")
//             .toFile(`../uploads/${filename}`);

//           // Save the image path to the database
//           const imagePath = `../uploads/${filename}`;
//           const insertData = "INSERT INTO images (filename) VALUES (?)";
//           await connection.execute(insertData, [imagePath]);

//           return "File uploaded successfully";
//         } catch (error) {
//           console.error(error);
//           throw new Error("File upload failed");
//         }
//       },
//     },
//   },

//   methods: {
//     processStream(stream) {
//       const chunks = [];
//       return new Promise((resolve, reject) => {
//         stream.on("data", (chunk) => {
//           chunks.push(Buffer.from(chunk));
//         });
//         stream.on("error", (err) => reject(err));
//         stream.on("end", () => resolve(Buffer.concat(chunks)));
//       });
//     },
//   },
// };



















// const { Stream } = require("nodemailer/lib/xoauth2/index.js");
// const path = require("path")


// module.exports = {
//     name: "file",
//     actions:{
//         save:{
//             rest: 'POST /',
//             async handler(ctx){
//                 const file = ctx.params;
//                 const imagePath = (path.join(__dirname, "uploads", "filename.jpg"));
//                 console.log("imagePath---------", imagePath)
//                 const buffer = await this.processStream({file}); 

//                 console.log("image-------",buffer);

//                 const reSizedImage = await sharp(buffer)
//                     .resize(200,200)
//                     .toFormat("jpg")
//                     // .toFile(`D:/major_backend/uploads/${file.originalname}`);
//                     .toFile(path.join(__dirname, "uploads", "filename.jpg"))
                    
//                     // console.log("path------------------------",path.join(__dirname, "uploads", "filename.jpg"));
                    
                
//             }
//         }
//     },


//     methods:{
//         processStream (stream){
//             const chunks = [];
//             return new Promise((resolve , reject) => {
//                 stream.on ("data" , (chunk) => {
//                     chunks.push(Buffer.from (chunk))
//                 });
//                 stream.on("error", (err)=> reject(err));
//                 stream.on("end", () => resolve(Buffer.concat(chunks)));
//             });
//         }
//     }

// }