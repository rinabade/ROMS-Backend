const connection = require("../db-Config.js");
const { Errors } = require("moleculer");
const moment = require("moment");
const crypto = require("crypto");
const { log } = require("console");


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
				
				const [result1] = await connection.execute(`SELECT order_id FROM orders WHERE table_number=? ORDER BY order_id DESC LIMIT 1`, [table_number]);
					
				const cartItems  = ctx.params.cartItems;
				const query = `INSERT INTO orderdetails ( order_id, menu_id, quantity) VALUES (?,?,?)`;

				for (const item of cartItems) {
				const { menu_id, quantity } = item;
				const values = [result1[0].order_id, menu_id, quantity];

				await connection.execute(query, (values));
			}
			
			return "Cart items added successfully"
			},
		},

		getOrderID:{
            rest: "GET /",
            async handler (ctx) {
                const [rows] = await connection.execute(
					"SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1"
				  );
				
				  if (rows.length > 0) {
					const latestOrderId = rows[0].order_id;
					
				  } else {
					console.log("No orders found");
				  }

            } 

        },

		update: {
			rest: "PATCH /:id",
			async handler(ctx) {
				const { id, quantity } = ctx.params;

				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");

				const [result] = await connection.query(
					`UPDATE carts SET quantity=?, updatedAt=? WHERE cart_id=? `,
					[quantity, formattedNow, id]
				);
				if (result) {
					return {
						type: "SUCCESS",
						code: 200,
						message: "Cart is updated successfully....",
					};
				}
			},
		},

		delete: {
			rest: "DELETE /:id",
			async handler(ctx) {
				const { id } = ctx.params;
				try {
					const [result] = await connection.query(
						`DELETE FROM carts WHERE cart_id=?`,
						[id]
					);
					if (result) {
						return {
							type: "SUCCESS",
							code: 200,
							message: `Cart id : '${id}'  is deleted successfully....`,
						};
					}
				} catch (error) {
					throw this.broker.errorHandler(
						new Errors.MoleculerClientError(
							"Something went wrong.. Try Again",
							401,
							"ERR_UNDEFINED",
							{}
						),
						{}
					);
				}
			},
		},
	},
};
