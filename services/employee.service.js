const connection = require("../db-Config.js");
const bcrypt = require("bcryptjs");
const {Errors} = require("moleculer");
const moment = require('moment');
// const ApigatewayMixin = require("../mixins/apigateway.mixin.js");


module.exports = {
    name: "register",
    // mixins: [ApigatewayMixin],
    // hooks:{
    //     before: {
    //         create: ["isAuthenticated", "isAuthorized"],
    //         getAllEmployee: ["isAuthenticated", "isAuthorized"],
    //         getEmployee: ["isAuthenticated", "isAuthorized"],
    //         update : ["isAuthenticated", "isAuthorized"],
    //         delete : ["isAuthenticated", "isAuthorized"],
    //     }
    // },
    actions: {
        create: {
            authorization :{
                role : "admin",
            },
            rest: "POST /",
            // params: {
            //     firstname: { type: "string", max: 30 },
            //     lastname: { type: "string", max: 30 },
            //     email: { type: "string", max: 50 },
            //     password: { type: "string", max: 30 },
            //     address: { type: "string", max: 30 },
            //     phone: { type: "string" },
            //     // role: { type: "string", max: 10 },
            //     job_title: {type: "string", max: 10},
            //     salary_information : {type: "number"},
            //     employee_status : {type: "string", max: 10},
            //     hire_date : {type: "string", max: 20}
            // },
            async handler(ctx) {
                const { firstname, lastname, email, password, gender, address, phone, job_title, salary_information, employee_status, hire_date } = ctx.params;
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD ');

                    // if (!firstname || !lastname || !email || !password || !gender || !address || !phone || !job_title || !salary_information || !employee_status || !hire_date) {
                    //     throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                    // }

                    // else {
                        const [rows] = await connection.execute(`SELECT email FROM employees WHERE email = ? `, [email]);
                        if (rows[0]) {
                            throw this.broker.errorHandler(new Errors.MoleculerClientError("The email you have registered is already used. Please register from new email address.", 401, "ERR_UNDEFINED", {}), {}) 
                        }
                        else {
                            // const [result] = await connection.execute(`SELECT role_id FROM roles WHERE role_name = ?`, [job_title]);
                            // const role_id = result[0].role_id;

                            const Npassword = await bcrypt.hash(password, 8);
                            const [result1] = await connection.execute('INSERT INTO employees( firstname, lastname, email, password, gender, address, phone, job_title, salary_information, employee_status, hire_date, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [firstname, lastname, email, Npassword, gender, address, phone, job_title, salary_information, employee_status, hire_date, formattedNow]);
                            if (result1)
                                // ctx.call("email.sendmail", { firstname, lastname, email });
                                return { type: "Success", code: 200, message: "Registration Successfull... Please Check your email" };
                        }
                    // }
            }
        },

        getAllEmployees:{
            authorization :{
                role : "admin",
            },
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT employee_id, firstname, lastname, email, gender, address, phone, job_title, DATE_FORMAT(hire_date,'%Y-%m-%d') as hire_date, salary_information, employee_status  FROM employees`);

                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All data fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }

            } 

        },

        getEmployee:{
            authorization :{
                role : "admin",
            },
            rest: "GET /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                // try {
                    const [data] = await connection.execute(`SELECT firstname, lastname, email, gender, address, phone, job_title, hire_date, salary_information, employee_status  FROM employees WHERE employee_id=?`, [id] );
                    if(data){
                        return ({type:"SUCCESS", code:200, message:`Employee id : ${id} data fetched successfully....`,  data});
                    }
21
                // } catch (error) {
                //     throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                // }

            } 
        },


        update:{
            authorization :{
                role : "admin",
            },
            rest: "PATCH /:id",
            async handler (ctx) {
                const {id, email, address, phone, job_title, salary_information, employee_status} = ctx.params;
                // Get the current date and time
                const now = moment();
                // Format the date and time
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`UPDATE employees SET email=?, address=?, phone=?, job_title = ?, salary_information =?,  employee_status=?, updatedAt=? WHERE employee_id=? `, [email,  address, phone, job_title, salary_information, employee_status, formattedNow,id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Employee id : '${id}' is updated successfully....` });
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
                
                const [result] = await connection.execute(`DELETE FROM employees WHERE employee_id=?`, [id]);
                if (result) {
                    return ({ type: "SUCCESS", code: 200, message: `Employee id : '${id}' is deleted successfully....` });
                }
            }     

        },

    },
}
