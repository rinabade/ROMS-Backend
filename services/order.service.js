const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const { OrderDetail } = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');


module.exports= {
    name: "orders",
    actions: {
        create :{
        rest: "POST /",
        async handler(ctx) {
            const table = ctx.params;
            console.log("table--------", table);
            const now = moment();
            const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

			const [result] = await connection.execute(`INSERT INTO orders (table_number, createdAt) VALUES (?,?)`, [table, formattedNow]);
			if(result) {
				return { type: "Success", code: 200, message: "Order inserted", data: result[0] };
			}

        //     // QRcode handler to fetch table id for order service 

        //     // Define the QR code scanner using molecular.js
        //     var scanner = new Molecular.Scanner({

        //         // Define the onScan() function to handle the scanned result
        //         onScan: function(result) {
        //             // Extract the table number from the scanned URL
        //             var url = window.location.href;
        //             var urlParams = new URLSearchParams(new URL(url).search);
        //             var tableNumber = urlParams.get("table");

        //             // Do something with the table number (e.g. display it on the page)
        //             document.getElementById("table-number").textContent = tableNumber;
        //         }
        //     });

        //     // Start the scanner
        //     scanner.start();

            
         }
        },

        getOrderDetails:{
            rest: "GET /",
            async handler (ctx) {
                // const [rows] = await connection.execute(
				// 	"SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1"
				//   );
				
				//   if (rows.length > 0) {
				// 	const latestOrderId = rows[0].order_id;
				// 	return ("latestOrderId", latestOrderId)
				//   } else {
				// 	console.log("No orders found");
				//   }

				const [rows] = await connection.execute("SELECT * FROM kitchenView");
				
				return {type: "SUCCESS", code:200, message:"Category added successfully....", data: rows }
			
			// return "Cart items added successfully"
			},

        },
    
    }
}

