const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const ApigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "category",
    mixins: [ApigatewayMixin],
    actions: {
        create: {
            authorization :{
                role : "admin",
            },
            rest: "POST /",
            async handler (ctx) {
                const {category_name} = ctx.params;
                
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                if(!category_name) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                }

                // const [ rows] = await connection.execute(`SELECT category_name FROM categories WHERE category_name=?`, [category_name]);
                // if(rows){
                //     throw this.broker.errorHandler(new Errors.MoleculerClientError("The category item is already created....", 401, "ERR_UNDEFINED", {}), {}) 
                // }
                // else{
                    const [result] = await connection.execute(`INSERT INTO categories(category_name, createdAt) VALUES (?,?)`, [category_name,formattedNow]);
                    if(result){
                        return {type: "SUCCESS", code:200, message:"Category added successfully...."}
                    }
                // }
                

            }

        },

        getAllCategory:{
            authorization :{
                role : "admin",
            },
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT category_id, category_name FROM categories`);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All data fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }
            } 

        },

        getCategory:{
            authorization :{
                role : "admin",
            },
            rest: "GET /:id",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT category_id, category_name FROM categories WHERE category_id=?`, [id]);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All data fetched successfully....", data: result});
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
                category_name: { type: "string", max: 30 },
            },
            async handler (ctx) {
                const {id, category_name} = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');
                    const [result] = await connection.execute(`UPDATE categories SET category_name=?, updatedAt=? WHERE category_id=? `, [category_name,formattedNow,id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `category id : '${id}' is updated successfully....` });
                    }
            }
        },

        delete: {
            authorization :{
                role : "admin",
            },
            rest: "DELETE /:id",
            async handler(ctx){
                const { id } = ctx.params;
                try {
                    const [result] = await connection.query(`DELETE FROM categories WHERE category_id=?`, [id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `Category id : '${id}'  is deleted successfully....` });
                    }
                } catch (error) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong.. Try Again", 401, "ERR_UNDEFINED", {}), {}) 
                }
            }
        }
    }
}