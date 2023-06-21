const { Stream } = require("nodemailer/lib/xoauth2/index.js");


module.exports = {
    name: "file",
    actions:{
        save:{
            rest: 'POST /',
            async handler(ctx){
                const {file} = ctx.params;
                const buffer = await this.processStream(file); 

                console.log("image-------",buffer);

                const reSizedImage = await sharp(buffer)
                    .resize(200,200)
                    .toFormat("jpg")
                    .toFile(`D:/major_backend/uploads/${file.originalname}`);

                const imagePath = (`D:/major_backend/uploads/${file.originalname}`);
                
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