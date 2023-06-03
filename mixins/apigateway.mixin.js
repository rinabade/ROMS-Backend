const connection = require("../db-Config.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {Errors} = require("moleculer");

module.exports = {
    name: "ApiGatewayMixin",

    methods: {
        isAuthenticated: async (ctx) => {
            let decoded = {};
            let result = {};
            try {
                decoded = jwt.verify(ctx.meta.token, process.env.JWT_SECRET, process.env.JWT_LIFETIME);
                // console.log(decoded.employee_id);
                [result] = await connection.execute(`SELECT * FROM employees WHERE employee_id=?`, [decoded.employee_id]); 
                // console.log(result);
                if (result[0]) {
                    // console.log("Id is:", result[0].employee_id);
                    ctx.meta.user = result[0].employee_id;
                }
                else {
                    throw new Error(`Could not get token for user ${decoded.employee_id}`, 400);
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Token does not match", 400);
            }

            if (decoded.iat > result[0].updatedAt) {
                return "Password changed successful"
            }

            else if (decoded.iat < result[0].updatedAt) {
                throw new Error("login again");
            }

        },


        isAuthorized: {
            handler: async function (ctx) {
                    const [result] = await connection.execute(`SELECT * FROM employees WHERE employee_id=? `, [ctx.meta.user]);
                    // console.log(result)
                    // console.log("result---------", result[0].role_id)
                    const [result1] = await connection.execute(`SELECT role_name FROM roles WHERE role_id=?`, [result[0].role_id]);
                    // console.log("result1---------", result1[0].role_name);
                    if (ctx.meta.role !== result1[0].role_name) {
                        return this.broker.errorHandler(new Errors.MoleculerClientError("Unauthorised", 401, "ERR_UNAUTHORISED", {}), {}) 
                    }
                
            },
        }
        

    },
}
