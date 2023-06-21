const connection = require("../db-Config.js");
const moment = require('moment');

module.exports = {
    name: "profile",
    actions: {
        update : {
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
        }
    }
}