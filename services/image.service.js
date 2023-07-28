const { timeStamp } = require('console');
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
                const folderName = "images";
                const imageName = "image-"+ Date.now() + ".jpeg";

                const imagePath  = path.join(
                    __dirname,
                    "..",
                    "public",
                    folderName,
                    imageName
                );


                await sharp(imageBuffer).resize(300, 300).toFile(imagePath);
                // return {image :`${folderName}/${imageName}` };
                return `${folderName}/${imageName}`;
            },
                    
        },
    


    profile: {
        rest: "POST /",
        handler: async (ctx) => {
            const fileChunks = [];
            for await(const chunk of ctx.params){
                fileChunks.push(chunk);
            }
            let imageBuffer = Buffer.concat(fileChunks);
            const folderName = "Profile";
            const imageName = "images-"+ Date.now() + ".jpeg";

            const imagePath  = path.join(
                __dirname,
                "..",
                "public",
                folderName,
                imageName
            );


            await sharp(imageBuffer).resize(300, 300).toFile(imagePath);
            // return {image :`${folderName}/${imageName}` };
            return `${folderName}/${imageName}`;
        },
                
    },


    getFeedbacks:{
        rest: "GET /",
        async handler (ctx) {
            // try {
                const [result] = await connection.execute("SELECT * FROM feedbacks ORDER BY feedback_id DESC LIMIT 5");
                if(result){
                    return ({type:"SUCCESS", code:200, message:"All data fetched successfully....", data: result});
                }
            // } catch (error) {
            //     throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
            // }
        } 

    },
}
}
