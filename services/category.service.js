const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const apigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "category",
    mixins: [apigatewayMixin],
    hooks:{
        before: {
            create : ["isAuthenticated", "isAuthorized"],
            update : ["isAuthenticated", "isAuthorized"],
            delete : ["isAuthenticated", "isAuthorized"],
        }
    },
    actions: {
        create: {
            authorization :{
                role : "admin",
            },
            rest: "POST /",
            params: {
                category_name: { type: "string", max: 30 },
            },
            async handler (ctx) {
                const {category_name} = ctx.params;
                
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                if(!category_name) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                }

                const [ rows] = await connection.execute(`SELECT category_name FROM categories WHERE category_name=?`, [category_name]);
                if(rows[0]){
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The category item is already created....", 401, "ERR_UNDEFINED", {}), {}) 
                }
                else{
                    const [result] = await connection.execute(`INSERT INTO categories(category_name, createdAt) VALUES (?,?)`, [category_name,formattedNow]);
                    if(result){
                        return {type: "SUCCESS", code:200, message:"Category added successfully...."}
                    }
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