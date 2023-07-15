const connection = require("../db-Config.js");
const { Errors } = require("moleculer");
const moment = require("moment");



module.exports = {
	name: "search",
	actions: {
		searchFood: {
            rest : "GET /",
            async handler(ctx) {
                const { query } = ctx.params;
          
                try {
                  const [result] = await connection.execute('SELECT menu_id, category_id, item_name,image, quantity,price FROM menus WHERE item_name LIKE ?',[`%${query}%`] );
          
                  return result;
                } catch (error) {
                  throw new Error('An error occurred while searching for items.');
                }
            }
        }
    }
}