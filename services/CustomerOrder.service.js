const connection = require("../db-Config.js");

module.exports = {
	name: "customerOrder",
	actions: {
        getOrders:{
            rest: "GET /",
            async handler (ctx) {
				const [rows] = await connection.execute("SELECT * FROM kitchenView ORDER BY order_id DESC LIMIT 5");
				
				return {type: "SUCCESS", code:200, message:"Category added successfully....", data: rows }
			},
        },
    }
}