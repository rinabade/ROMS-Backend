const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const apigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "food",
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
                item_name: { type: "string", max: 30 },
                decription : { type: "string", max: 30 },
                price: { type: "number" }
            },
            async handler (ctx) {
                const {item_name, price } = ctx.params;

                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                if(!item_name || !price) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                }
                else{
                    const[rows] = await connection.execute(`SELECT item_name FROM menus WHERE item_name=?`, [item_name]);
                    if(rows[0]){
                        throw this.broker.errorHandler(new Errors.MoleculerClientError("The food item is already created....", 401, "ERR_UNDEFINED", {}), {}) 
                    }
    
                    else{
                        const [result] = await connection.execute(`INSERT INTO menus(item_name, price, createdAt) VALUES(?,?,?)`, [item_name, price, formattedNow]);
                        if(result){
                            return {type: "SUCCESS", code: 200, message: "New Food item is addded in food"};
                        }
                        else{
                            throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong", 401, "ERR_UNDEFINED", {}), {}) 
                        }    
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

    }
}