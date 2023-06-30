const connection = require("../db-Config.js");
const { Errors } = require("moleculer");
const moment = require("moment");
const crypto = require("crypto");
const { log } = require("console");


module.exports = {
	name: "cart",
	actions: {
		create: {
			rest: "POST /",
			async handler(ctx) {
				// const {table_number} =ctx.params

				const { cartItems } = ctx.params;
				console.log("cartItem---------", cartItems);
				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");

				if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
				// return response.status(400).json({ error: "Invalid cart items" });
				return "Invalid cart items"
				}

				const query = `INSERT INTO carts (menu_id, item_name, quantity, price) VALUES (?, ?, ?, ?)`;

				for (const item of cartItems) {
				const { menu_id, item_name, quantity, price } = item;
				const values = [menu_id, item_name, quantity, price];

				await connection.execute(query, values);
			}
			
			return "Cart items added successfully"

				// for (const item of cartItems) {
					// console.log(item.table_number);
					// const tableNumber = item.table_number;
					//   const orderId = "ABC123";
					// const unique_Code = generateUniqueCode(table_number);
					
					// console.log("code----------",unique_Code);
					
					// function generateUniqueCode(tableNumber) {
					// 	const date = new Date();
					// 	const timestamp = date.getTime().toString();
					// 	const codeData = `${tableNumber}-${timestamp}`;
						
					// 	const hash = crypto.createHash("md5").update(codeData).digest("hex");
					// 	const uniqueCode = hash.substring(0, 4);
						
					// 	return uniqueCode;
					// }
				// }
					// if (!table_number || !menu_id || !item_name ||	!quantity || !price	) {
						// 	throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.",401,"ERR_UNDEFINED",{}	),	{});
						// }
						
						
						// const query = `INSERT INTO carts( menu_id, item_name, quantity, price) VALUES (?,?,?,?)`;
						
						// for (let i = 0; i < cartItems.length; i++) {
						// 	const item = cartItems[i];
						// 	const values = [ item.menu_id, item.item_name, item.quantity, item.price];
							
						// 	await connection.execute(query, values);
						// }
			},
		},

		getAllCart:{
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT cart_id, item_name, quantity, price FROM carts`);
					console.log(result)

                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All data fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
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
