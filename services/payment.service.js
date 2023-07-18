const connection = require("../db-Config.js");
const { Errors } = require("moleculer");
const moment = require("moment");
const crypto = require("crypto");
const { log, Console } = require("console");


module.exports = {
	name: "payment",
	actions: {
		create: {
			rest: "POST /",
			async handler(ctx) {
                const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");
                const {table_number,paymentMethod,transactionCode} = ctx.params
                const payment_status = 1;

                const [result] = await connection.execute(`INSERT INTO payments (table_number, payment_method, transactionCode , payment_status, createdAt) VALUES (?,?,?,?,?)`,[table_number, paymentMethod, transactionCode, payment_status,formattedNow]);
                if(result){
                    return { type: "Success", code: 200, message: "Payment detail inserted successfully", data: result };
                }

            }
        },

        getPaymentDetail: {
            rest: "GET /",
            async handler(ctx) {
                const [result] = await connection.execute('SELECT table_number, payment_method, transactionCode,createdAt FROM payments WHERE payment_status="1" ');
                return {type: "Success", code: 200, message: "Payment fetched successfully", data: result }
            }
        },

        update: {
			rest: "PATCH /:id",
			async handler(ctx) {
				const { id, table_number,paymentMethod } = ctx.params;
				console.log("id-------", id);
				console.log("table---------" , table_number);
				console.log("payment---------" , paymentMethod);


				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");

				const [result] = await connection.query(
					`UPDATE payments SET payment_status=?, updatedAt=? WHERE transactionCode=? AND table_number=? AND payment_method=? AND payment_status=? `,
					[1, formattedNow, id, table_number,paymentMethod,0]
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

    }
}





// CREATE VIEW CashierView AS (
// 	SELECT payments.payment_id AS payment_id, payments.order_id AS order_id, orders.table_number AS table_number, payments.quantity AS quantity, payments.amount AS price, payments.payment_status AS payment_status, payments.createdAt AS payment_date
//     FROM payments
//     JOIN orders
//     ON payments.order_id = orders.order_id
// )