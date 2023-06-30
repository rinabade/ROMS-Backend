const connection = require('../db-Config');
const path =require('path');
const sharp = require ("sharp");

module.exports = {
    name: "file-service",
    actions:{
        uploads: {
            rest: "POST /",
            handler: async (ctx) => {
                const fileChunks = [];
                for await(const chunk of ctx.params){
                    fileChunks.push(chunk);
                }
                let imageBuffer = Buffer.concat(fileChunks);

                const imagePath  = path.join(
                    __dirname,
                    "..",
                    "uploads",
                    "image.jpeg"
                );
                console.log(imagePath)

                await sharp(imageBuffer).resize(300, 300).toFile(imagePath);
                return "file uploaded"
            },
                    
        }
    },

}