const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { Stream } = require("nodemailer/lib/xoauth2/index.js");
const { log } = require("util");
const storage = multer.memoryStorage();
const uploads = multer({ storage }).single('file');

module.exports = {
    name: "menu",
    actions: {
        create: {
            // rest: "POST /file-upload",  
            // uploads.single('file'),          
            async handler (ctx) {                
                const {category,item, description, price } = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');
                // const image = ctx.params.file;
                // console.log("file", ctx.params.file);
                const {file} = ctx.params;
                console.log("body", ctx.params);

                const buffer = await this.processStream(ctx.params); 

                // console.log("image-------",buffer);

                const reSizedImage = await sharp(buffer)
                    .resize(200,200)
                    .toFormat("jpg")
                    // .toFile(`../uploads/${file.originalname}`);
                    .toFile(__dirname, "uploads", "filename.jpg")

                    console.log((__dirname, "uploads", "filename.jpg"));

                // const imagePath = (`D:/major_backend/uploads/${file.originalname}`);
                
                if(!category || !item || !description || !price ) {
                          throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                        }
                        else{
                            const[rows] = await connection.execute(`SELECT item_name FROM menus WHERE item_name=?`, [item]);
                            if(rows[0]){
                                throw this.broker.errorHandler(new Errors.MoleculerClientError("The food item is already created....", 401, "ERR_UNDEFINED", {}), {}) 
                            }
                            
                            else{
                              const [result] = await connection.query(`INSERT INTO menus(category_name, item_name, description, price, image, createdAt) VALUES(?,?,?,?,?,?)`, [category,item,description, price,imagePath, formattedNow]);
                              if(result){
                                  return {type: "SUCCESS", code: 200, message: "New Food item is added in Menu"};
                                }
                                else{
                                    throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong", 401, "ERR_UNDEFINED", {}), {}) 
                                }    
                            }
                        }
                    }
        
        },

        getMenu:{
            // authorization :{
            //     role : "admin",
            // },
            rest: "GET /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                console.log("id-----------", id)
                try {
                    const [result] = await connection.query(`SELECT menu_id, category_id,item_name, description, price FROM menus WHERE category_id=?`, [id]);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All menus fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }
            } 
        },

        update:{
            authorization :{
                role : "admin",
            },
            rest: "PATCH /:id",
            params: {
                item_name: { type: "string", max: 30 },
                price: { type: "number" }
            },
            async handler (ctx) {
                const {id, item_name, price} = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');
                    const [result] = await connection.execute(`UPDATE menus SET item_name=?, price=?, updatedAt=? WHERE food_id=? `, [item_name, price,formattedNow,id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `Ingredient id : '${id}' is updated successfully....` });
                    }
            }
        },

        delete:{
            authorization :{
                role : "admin",
            },
            rest: "DELETE /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                
                const [result] = await connection.execute(`DELETE FROM menus WHERE food_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Food id : '${id}' is deleted successfully....` });
                }
            }     

        }

    },

    // methods:{
    //     processStream (stream){
    //         const chunks = [];
    //         return new Promise((resolve , reject) => {
                
    //             stream.on ("data" , (chunk) => {
    //                 chunks.push(Buffer.from (chunk))
    //             });
    //             stream.on("error", (err)=> reject(err));
    //             stream.on("end", () => resolve(Buffer.concat(chunks)));
    //         });
    //     }
    // }

}
