const connection = require("../db-Config.js");
const bcrypt = require("bcryptjs");
const moment = require('moment');
const apigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "password",
    mixins: [apigatewayMixin],
    actions: {
        change: {
            // authorization: {
            //     role: "admin",
            // },
            rest: "PATCH /:id",
            async handler (ctx) {
                const {id} = ctx.params;
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD ');
                const { o_password, n_password, c_password } = ctx.params;

                const [result] = await connection.query('SELECT * FROM employees WHERE employee_id=?', [id]);
                if (result) {
                    const pass = result[0].password;
                    if (!result.length || !await bcrypt.compare(o_password, pass)) {
                        throw new Error("Password doesnot matched");
                    }
                    try {
                        if (n_password === c_password) {
                            const pwd = await bcrypt.hash(n_password, 8);
                            const result = await connection.execute(`UPDATE employees SET password=?, updatedAt=? WHERE employee_id = ?`, [pwd, formattedNow, id]);
                            return "Password changed successfully";
                        }
                        else {
                            throw new Error("New password and confirm password does not matched");
                        }
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                }
            }

        }

    }
}

