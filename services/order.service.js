const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const { OrderDetail } = require('../models');
const Sequelize = require('sequelize');

module.exports= {
    name: "orders",
    actions: {
        create :{

        handler: async(ctx)=>{
            // QRcode handler to fetch table id for order service 

            // Define the QR code scanner using molecular.js
            var scanner = new Molecular.Scanner({

                // Define the onScan() function to handle the scanned result
                onScan: function(result) {
                    // Extract the table number from the scanned URL
                    var url = window.location.href;
                    var urlParams = new URLSearchParams(new URL(url).search);
                    var tableNumber = urlParams.get("table");

                    // Do something with the table number (e.g. display it on the page)
                    document.getElementById("table-number").textContent = tableNumber;
                }
            });

            // Start the scanner
            scanner.start();

            
         }
        }
    }
}

// module.exports = {
//     name: "orders",
//     model: {
//         name: 'OrderDetail',
//         define: {
//             menu_id: Sequelize.INTEGER,
//             quantity: Sequelize.INTEGER,
//             price: Sequelize.FLOAT
//         },
//         options: {
//             tableName: 'order_details'
//         },
//     },
//     actions: {
//         bulkCreate:{
//             handler: async(ctx)=>{
//                 const orderDetails = ctx.params.orderDetails;
                  
//                 try {
//                     await OrderDetail.bulkCreate(orderDetails);
//                     return 'Order details stored successfully';
//                 } 
//                 catch (error) {
//                     this.logger.error('Error storing order details:', error);
//                     return Promise.reject(error);
//                 }
//             }
//         }
//     },
    
// }