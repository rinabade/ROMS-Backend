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
				const formattedNow = now.format("YYYY-MM-DD");
                const {table_number,paymentMethod,transactionCode, totalPrice} = ctx.params
                const payment_status = 'complete';
                 console.log(totalPrice);
                const [result] = await connection.execute(`INSERT INTO payments (table_number, payment_method, transactionCode,Total_price ,payment_status, createdAt) VALUES (?,?,?,?,?,?)`,[table_number, paymentMethod, transactionCode, totalPrice ,payment_status,formattedNow]);
                if(result){
                    return { type: "Success", code: 200, message: "Payment detail inserted successfully", data: result };
                }
            }
        },

        getPaymentDetail: {
            rest: "GET /",
            async handler(ctx) {
				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD");
                const [result] = await connection.execute(`SELECT * FROM payments WHERE createdAt=?`, [formattedNow]);
				if(result){
					return {type: "Success", code: 200, message: `Payment fetched successfully`, data: result }
				}
            }
        },

        update: {
			rest: "PATCH /:id",
			async handler(ctx) {
				const { id, table_number,paymentMethod } = ctx.params;

				const now = moment();
				const formattedNow = now.format("YYYY-MM-DD HH:mm:ss");

				const [result] = await connection.execute(
					`UPDATE payments SET payment_status=?, updatedAt=? WHERE transactionCode=? AND table_number=? AND payment_method=? AND payment_status=? `,
					['complete', formattedNow, id, table_number,paymentMethod,'pending']
				);
				if (result) {
					return {
						type: "SUCCESS",
						code: 200,
						message: "Payment is updated successfully....",
						data: `${result}`
					};
				}
			},
		},

    }
}
