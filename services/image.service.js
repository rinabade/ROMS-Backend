const { Stream } = require("nodemailer/lib/xoauth2/index.js");
const path = require("path")


module.exports = {
    name: "file",
    actions:{
        save:{
            rest: 'POST /',
            async handler(ctx){
                const file = ctx.params;
                const imagePath = (path.join(__dirname, "uploads", "filename.jpg"));
                console.log("imagePath---------", imagePath)
                const buffer = await this.processStream({file}); 

                console.log("image-------",buffer);

                const reSizedImage = await sharp(buffer)
                    .resize(200,200)
                    .toFormat("jpg")
                    // .toFile(`D:/major_backend/uploads/${file.originalname}`);
                    .toFile(path.join(__dirname, "uploads", "filename.jpg"))
                    
                    // console.log("path------------------------",path.join(__dirname, "uploads", "filename.jpg"));
                    
                
            }
        }
    },


    methods:{
        processStream (stream){
            const chunks = [];
            return new Promise((resolve , reject) => {
                stream.on ("data" , (chunk) => {
                    chunks.push(Buffer.from (chunk))
                });
                stream.on("error", (err)=> reject(err));
                stream.on("end", () => resolve(Buffer.concat(chunks)));
            });
        }
    }

}