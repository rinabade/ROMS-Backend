const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');

module.exports = {
    name: "cart",
    actions: {
        create : {
            rest: "POST /",
        async handler(ctx) {
            const { table_number, menu_id, item_name, quantity, price } = ctx.params;

            const now = moment();
            const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

            if(!table_number || !menu_id || !item_name || !quantity || !price){
                throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
            }

            const [result] = await connection.execute(`INSERT INTO carts(table_number, menu_id, item_name,quantity, price, createdAt) VALUES (?,?,?,?,?,?)`, [table_number, menu_id, item_name, quantity, price ,formattedNow]);
            if(result){
                return {type: "SUCCESS", code:200, message:"Cart added successfully...."}
            }
        }
    },

    update : {
        rest : "PATCH /:id",
        async handler (ctx) {
            const {id, quantity} = ctx.params;

            const now = moment();
            const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

            const [result] = await connection.query(`UPDATE carts SET quantity=?, updatedAt=? WHERE cart_id=? `, [quantity,formattedNow,id]);
            if(result){
                return {type: "SUCCESS", code:200, message:"Cart is updated successfully...."}
            }
        }
    },

    delete: {
        rest: "DELETE /:id",
        async handler(ctx){
            const { id } = ctx.params;
            try {
                const [result] = await connection.query(`DELETE FROM carts WHERE cart_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Cart id : '${id}'  is deleted successfully....` });
                }
            } catch (error) {
                throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong.. Try Again", 401, "ERR_UNDEFINED", {}), {}) 
            }
        }
    }
}
}