const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const ApiGatewayMixin = require('../mixins/apigateway.mixin')

module.exports = {
    name: "menu",
    mixins: [ApiGatewayMixin],
    actions: {
        create: {
            rest: "POST /",  
            // uploads.single('file'),          
            async handler (ctx) {                
                const {category_id,item, description, price } = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');
                                
                // if(!category_id || !item || !description || !price ) {
                //           throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                //         }
                //         else{
                            const[rows] = await connection.execute(`SELECT item_name FROM menus WHERE item_name=?`, [item]);
                            if(rows[0]){
                                throw this.broker.errorHandler(new Errors.MoleculerClientError("The food item is already created....", 401, "ERR_UNDEFINED", {}), {}) 
                            }
                            
                            else{
                              const [result] = await connection.query(`INSERT INTO menus(category_id, item_name, description, price, createdAt) VALUES(?,?,?,?,?)`, [category_id,item,description, price, formattedNow]);
                              if(result){
                                  return {type: "SUCCESS", code: 200, message: "New Food item is added in Menu"};
                                }
                                else{
                                    throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong", 401, "ERR_UNDEFINED", {}), {}) 
                                }    
                            }
                        // }
                    }
        
        },


        getAllMenu:{
            authorization :{
                role : "admin",
            },
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT menu_id, category_id,item_name, description, price FROM menus`);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All menus fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }
            } 
        },

        getMenu:{
            authorization :{
                role : "admin",
            },
            rest: "GET /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                console.log("id-----------", id)
                try {
                    const [result] = await connection.query(`SELECT menu_id, category_id,item_name, description, price, quantity FROM menus WHERE category_id=?`, [id]);
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
            async handler (ctx) {
                const {id, item_name, description, price} = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');
                    const [result] = await connection.execute(`UPDATE menus SET item_name=?, description=?, price=?, updatedAt=? WHERE menu_id=? `, [item_name, description, price,formattedNow,id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `Menu id : '${id}' is updated successfully....` });
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
                
                const [result] = await connection.execute(`DELETE FROM menus WHERE menu_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Menu id : '${id}' is deleted successfully....` });
                }
            }     

        }

    },

}
