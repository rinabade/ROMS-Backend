const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');

module.exports= {
    name: "orders",
    actions: {
        create :{
            rest: "POST /",
            async handler(ctx) {
                const table = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`INSERT INTO orders (table_number, createdAt) VALUES (?,?)`, [table, formattedNow]);
                if(result) {
                    return { type: "Success", code: 200, message: "Order inserted", data: result[0] };
                }          
            }
        },

        getOrderDetails:{
            rest: "GET /",
            async handler (ctx) {
				const [rows] = await connection.execute("SELECT * FROM kitchenView");
				
				return {type: "SUCCESS", code:200, message:"Category added successfully....", data: rows }
			},

        },
    
    }
}

