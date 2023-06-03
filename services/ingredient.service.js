const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const apigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "ingredient",
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
                ingredient_name: { type: "string", max: 30 },
                quantity: { type: "string" , max:10 }
            },
            async handler (ctx) {
                const {ingredient_name, quantity} = ctx.params;
                
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                if(!ingredient_name || !quantity) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                }

                const [ rows] = await connection.execute(`SELECT ingredient_name FROM ingredients WHERE ingredient_name=?`, [ingredient_name]);
                if(rows[0]){
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The ingredient item is already created....", 401, "ERR_UNDEFINED", {}), {}) 
                }
                else{
                    const [result] = await connection.execute(`INSERT INTO ingredients(ingredient_name, quantity, createdAt) VALUES (?,?,?)`, [ingredient_name, quantity,formattedNow]);
                    if(result){
                        return {type: "SUCCESS", code:200, message:"Ingredient successfully created...."}
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
                ingredient_name: { type: "string", max: 30 },
                quantity: { type: "string", max: 10 }
            },
            async handler (ctx) {
                const {id, ingredient_name, quantity} = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');
                    const [result] = await connection.execute(`UPDATE ingredients SET ingredient_name=?, quantity=?, updatedAt=? WHERE ingredient_id=? `, [ingredient_name, quantity,formattedNow,id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `Ingredient id : '${id}' is updated successfully....` });
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
                    const [result] = await connection.query(`DELETE FROM ingredients WHERE ingredient_id=?`, [id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `Ingredient id : '${id}'  is deleted successfully....` });
                    }
                } catch (error) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong.. Try Again", 401, "ERR_UNDEFINED", {}), {}) 
                }
            }
        }
    }
}