const connection = require("../db-Config.js");
const moment = require('moment');
const ApiGatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "role_permission",
    mixins: [ApiGatewayMixin],
    hooks:{
        before: {
            rolecreate : ["isAuthenticated", "isAuthorized"],
            update : ["isAuthenticated", "isAuthorized"],
            permission : ["isAuthenticated", "isAuthorized"],
        }
    },
    actions: {
        roleCreate: {
            authorization :{
                role : "admin",
            },
            rest: "POST /",
            handler : async(ctx)=>{
                const {role_name, permission_name} = ctx.params;                
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                    if(!role_name || !permission_name){
                        return { type: "ERROR", code: 401, message: "The field remains empty. Please fill out the field." };
                    }
                    else {
                        const [row] = await connection.execute(`SELECT permission_id FROM permissions WHERE permission_name = ?`, [permission_name]);
                        const permission_id = row[0].permission_id;

                        const [result] = await connection.execute('INSERT INTO roles(role_name, permission_id, createdAt) VALUES (?,?,?)', [ role_name, permission_id, formattedNow]);
                        if (result)
                            return { type: "Success", code: 200, message: "New role is created" };
                        }
            }

        },

        update:{
            authorization :{
                role : "admin",
            },
            rest: "PATCH /:id",
            async handler (ctx) {
                const {id,role_name} = ctx.params;
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`UPDATE roles SET role_name=?, updatedAt=? WHERE role_id=? `, [role_name, formattedNow,id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Role id : '${id}' is updated successfully....` });
                }
            }     

        },

        permission: {
            authorization :{
                role : "admin",
            },
            rest: "POST /",
            handler : async(ctx)=>{
                const {permission_name} = ctx.params;
                const date = Math.floor(Date.now() / 1000);
                console.log(("Current date:",date));
                try{
                    if(!permission_name){
                        return { type: "ERROR", code: 401, message: "The field remains empty. Please fill out the field." };
                    }
                    else {
                        const [result] = await connection.execute('INSERT INTO permissions(permission_name, createdAt) VALUES (?,?)', [permission_name, date]);
                        if (result)
                            return { type: "Success", code: 200, message: "New permission is created" };
                        }
                }
                catch (err) {
                    throw new Error("something went wrong", 500);
                }
            }

        }

        
    }
}