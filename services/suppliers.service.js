const connection = require('../db-Config');
const moment = require("moment");
const {Errors} = require("moleculer");
const apigatewayMixin = require('../mixins/apigateway.mixin');

module.exports={
    name : "supplier",
    mixins : [apigatewayMixin],
    hooks:{
        before: {
            create : ["isAuthenticated", "isAuthorized"],
            update : ["isAuthenticated", "isAuthorized"],
            delete : ["isAuthenticated", "isAuthorized"],
        }
    },
    actions: {
        create : {
            authorization:{
                role: "admin"
            },
            rest: "POST /",
            handler:async (ctx)=>{
                const{supplier_name, address, email, phone,pan_number} = ctx.params;
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                if (!supplier_name || !address || !email || !phone || !pan_number) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                }
                else {
                    const [rows] = await connection.execute(`SELECT email FROM suppliers WHERE email = ? `, [email]);
                    if (rows[0]) {
                        throw this.broker.errorHandler(new Errors.MoleculerClientError("The email you have registered is already used. Please register from new email address.", 401, "ERR_UNDEFINED", {}), {}) 
                    }
                    else {
                        const [result] = await connection.execute('INSERT INTO suppliers(supplier_name, address, email, phone,pan_number, createdAt) VALUES (?,?,?,?,?,?)', [supplier_name, address, email, phone,pan_number, formattedNow]);
                        if (result)
                            // ctx.call("email.sendmail", { firstname, lastname, email });
                            return { type: "Success", code: 200, message: "Registration Successfull... Please Check your email" };
                    }
                }
            }
        },

        update:{
            authorization :{
                role : "admin",
            },
            rest: "PATCH /:id",
            async handler (ctx) {
                const {id,supplier_name, address, email, phone, pan_number} = ctx.params;

                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`UPDATE suppliers SET supplier_name=?, address=?, email=?, phone=?, pan_number=?, updatedAt=? WHERE supplier_id=? `, [supplier_name, address, email, phone, pan_number, formattedNow,id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Supplier id : '${id}' is updated successfully....` });
                }
            } 
        },


        delete:{
            authorization :{
                role : "admin",
            },
            rest: "DELETE /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                
                const [result] = await connection.execute(`DELETE FROM suppliers WHERE supplier_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Supplier id : '${id}' is deleted successfully....` });
                }
            }     

        },
    }
}