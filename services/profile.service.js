const connection = require("../db-Config.js");
const moment = require('moment');
const ApiGatewayMixin = require('../mixins/apigateway.mixin')

module.exports = {
    name: "profile",
    mixins: [ApiGatewayMixin],
    actions: {
        update : {
            authorization :{
                role : "admin",
            },
            rest: "PATCH /:id",
            async handler(ctx){
                const{id, firstname, lastname, email, address, phone} = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`UPDATE employees SET firstname=?, lastname=?, email=?, address=?, phone=?, updatedAt=? WHERE employee_id=? `, [firstname, lastname, email, address, phone, formattedNow, id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Employee id : '${id}' is updated successfully....` });
                }
            }
        },

        image: {
            // authorization :{
            //     role : "admin",
            // },
            rest: "POST /",
            async handler(ctx){
                const {image} = ctx.params;
                
                const [result] = await connection.execute(`INSERT INTO employees(image) VALUES (?)`, [image])
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Profile image uploaded successfully....` });
                }
            }
        }
    }
}