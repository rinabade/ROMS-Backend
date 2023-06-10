const connection = require("../db-Config.js");
const moment = require('moment');
// const ApiGatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "role_permission",
    // mixins: [ApiGatewayMixin],
    // hooks:{
    //     before: {
    //         rolecreate : ["isAuthenticated", "isAuthorized"],
    //         update : ["isAuthenticated", "isAuthorized"],
    //         permission : ["isAuthenticated", "isAuthorized"],
    //     }
    // },
    actions: {
        roleCreate: {
            // authorization :{
            //     role : "admin",
            // },
            rest: "POST /",
            handler : async(ctx)=>{
                const {role_name} = ctx.params;                
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                    if(!role_name ){
                        return { type: "ERROR", code: 401, message: "The field remains empty. Please fill out the field." };
                    }
                    else {
                        // const [row] = await connection.execute(`SELECT permission_id FROM permissions WHERE permission_name = ?`, [permission_name]);
                        // const permission_id = row[0].permission_id;

                        const [result] = await connection.execute('INSERT INTO roles(role_name, createdAt) VALUES (?,?)', [ role_name, formattedNow]);
                        if (result)
                            return { type: "Success", code: 200, message: "New role is created" };
                        }
            }

        },

        getAllRoles:{
            // authorization :{
            //     role : "admin",
            // },
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT role_id, role_name FROM roles`);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All role fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }

                // const [result] = await connection.execute(`SELECT firstname, lastname, email, gender, address, phone, job_title, salary_information, employee_status FROM employees`);
                // if (result) {
                //     return ({ type: "SUCCESS", code: 200, message: `Employee is fetched successfully....` });
                // }
            } 

        },

        roleUpdate:{
            // authorization :{
            //     role : "admin",
            // },
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

        roleDelete:{
            // authorization :{
            //     role : "admin",
            // },
            rest: "DELETE /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                
                const [result] = await connection.execute(`DELETE FROM roles WHERE role_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Role id : '${id}' is deleted successfully....` });
                }
            }     

        },



        permissionCreate: {
            // authorization :{
            //     role : "admin",
            // },
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

        },

        getAllPermission:{
            // authorization :{
            //     role : "admin",
            // },
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT permission_id, permission_name FROM permissions`);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All permission fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }

                // const [result] = await connection.execute(`SELECT firstname, lastname, email, gender, address, phone, job_title, salary_information, employee_status FROM employees`);
                // if (result) {
                //     return ({ type: "SUCCESS", code: 200, message: `Employee is fetched successfully....` });
                // }
            } 

        },

        permissionUpdate:{
            // authorization :{
            //     role : "admin",
            // },
            rest: "PATCH /:id",
            async handler (ctx) {
                const {id,permission_name} = ctx.params;
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`UPDATE permissions SET permission_name=?, updatedAt=? WHERE permission_id=? `, [permission_name, formattedNow,id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Permission id : '${id}' is updated successfully....` });
                }
            }     

        },

        permissionDelete:{
            // authorization :{
            //     role : "admin",
            // },
            rest: "DELETE /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                
                const [result] = await connection.query(`DELETE FROM permissions WHERE permission_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Permission id : '${id}' is deleted successfully....` });
                }
            }     

        },

        
    }
}