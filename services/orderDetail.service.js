const connection = require("../db-Config.js");
const { Errors } = require("moleculer");
const moment = require('moment');

module.exports = {
	name: "orderDetail",
	actions: {
		create: {
			rest: "POST /",
			async handler(ctx) {
				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");

				const table_number = ctx.params.table_number;
				const result = await connection.execute(`INSERT INTO orders (table_number, createdAt) VALUES (?,?)`, [table_number, formattedNow]);
				
				const [result1] = await connection.execute(`SELECT * FROM orders ORDER BY order_id DESC LIMIT 1`);
					
				const cartItems  = ctx.params.cartItems;
				const query = `INSERT INTO orderdetails ( order_id, menu_id, table_number, quantity, createdAt) VALUES (?,?,?,?,?)`;

				for (const item of cartItems) {
				const { menu_id, quantity } = item;
				const values = [result1[0].order_id, menu_id, result1[0].table_number, quantity,formattedNow];

				await connection.execute(query, (values));
			}

		}
			
		},

		getOrderDetails:{
            rest: "GET /",
            async handler (ctx) {
				const [rows] = await connection.execute("SELECT * FROM kitchenView ORDER BY order_id DESC LIMIT 1");
				
				return {type: "SUCCESS", code:200, message:"Category added successfully....", data: rows }
			},
        },

		

		update: {
			rest: "PATCH /:id",
			async handler(ctx) {
				const { id, table_number } = ctx.params;
				console.log("id-------", id);
				console.log("table---------" , table_number);

				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");

				const [result] = await connection.query(
					`UPDATE orderdetails SET status=?, updatedAt=? WHERE menu_id=? AND table_number=? AND status=? `,
					['complete', formattedNow, id, table_number,'pending']
				);
				if (result) {
					return {
						type: "SUCCESS",
						code: 200,
						message: "Cart is updated successfully....",
						data: `${result}`
					};
				}
			},
		},

		delete: {
			rest: "DELETE /:id",
			async handler(ctx) {
				const { id } = ctx.params;
				// console.log(table_number);
				console.log(id);
				// try {
					const [result] = await connection.execute(
						`DELETE FROM orderdetails WHERE menu_id=? AND status=?`,
						[id, "pending"]
					);
					if (result) {
						return {
							type: "SUCCESS",
							code: 200,
							message: `Cart id : '${id}'  is deleted successfully....`,
						};
					}
				// } 
				// catch (error) {
				// 	throw this.broker.errorHandler(
				// 		new Errors.MoleculerClientError(
				// 			"Something went wrong.. Try Again",
				// 			401,
				// 			"ERR_UNDEFINED",
				// 			{}
				// 		),
				// 	);
				// }
			},
		},
	},
	}
