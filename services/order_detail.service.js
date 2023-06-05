const connection = require("../db-Config.js");
const apigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "order_detail",
    mixins : [apigatewayMixin],
    hooks:{
        before: {
            placeOrder : ["isAuthenticated", "isAuthorized"],
            // update : ["isAuthenticated", "isAuthorized"],
            // delete : ["isAuthenticated", "isAuthorized"],
        }
    },
    actions:{
        placeOrder:{
            authorization :{
                role : "admin",
            },
            rest: "POST /",
            async handler(ctx){
                const arrays = ctx.params.arrays;
                const results = [];            
                // console.log("property =>", arrays)
                try {
                    // Loop through the array of arrays and insert each array into the database table
                    // for (let i = 0; i < arraysToInsert; i++) {
                    //   const array = arraysToInsert[i];
                    // Loop over the arrays to be inserted
                    for (const array of arrays) {
                        console.log(array);
                        // Wrap the array in another array to match the format required by mysql2
                        const sql = "INSERT INTO order_details (order_id, menu_id, quantity, price) VALUES (?,?,?,?) ";
                        const values = array;
                        // console.log(values);
                        const [rows] = await connection.execute(sql, values);
                        // console.log(rows);
                        results.push(rows);
                    }                
                    // Return a success message
                    return { message: 'Arrays inserted successfully' };
                  } catch (error) {
                    // Return an error message if the insertion fails
                    throw new Error(`Failed to insert arrays: ${error.message}`);
                  } 

                // if (!Array.isArray(arraysToInsert) || arraysToInsert.length === 0) {
                //     return "No arrays to insert";
                //   }

                // try {
                // const sql = "INSERT INTO order_details (order_id, menu_id, quantity, price) VALUES ? ";

                //     // Start a transaction
                //     // await connection.beginTransaction();
                    
                //     // Loop over the arrays to be inserted
                //     for (const arrayToInsert of arraysToInsert) {
                //         // Wrap the array in another array to match the format required by mysql2
                //         const values = [arrayToInsert];
            
                //         // Execute the insert statement
                //         await connection.query(sql, [values]);
                //     }

                //      // Commit the transaction
                //     // await connection.commit();

                //     // Return a success message
                //     return "Arrays inserted successfully";

                // } 
                // catch (error) {
                //     // If an error occurs, rollback the transaction and throw the error
                //     // await connection.rollback();
                //     throw error;
                // }
               
            }
        }
    }
    
}









// model: {
//     name: 'OrderDetail',
//     define: {
//         menu_id: Sequelize.INTEGER,
//         quantity: Sequelize.INTEGER,
//         price: Sequelize.FLOAT
//     },
//     options: {
//         tableName: 'order_details'
//     },
// },
// actions: {
//     bulkInsert:{
//         handler: async(ctx)=>{
//             const orderDetails = ctx.params.orderDetails;
              
//             try {
//                 await OrderDetail.bulkCreate(orderDetails);
//                 return 'Order details stored successfully';
//             } 
//             catch (error) {
//                 this.logger.error('Error storing order details:', error);
//                 return Promise.reject(error);
//             }
//         }
//     }
// },