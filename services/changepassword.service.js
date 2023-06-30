const connection = require("../db-Config.js");
const bcrypt = require("bcryptjs");
const apigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "password",
    mixins: [apigatewayMixin],
    actions: {
        change: {
            authorization: {
                role: "admin" || "user",
            },
            rest: "PATCH /",
            handler: async (ctx) => {
                const { o_password, n_password, c_password } = ctx.params;
                const id = ctx.meta.user;

                const [result] = await connection.query('SELECT * FROM employees WHERE employee_id=?', [id]);
                if (result) {
                    const pass = result[0].password;
                    if (!result.length || !await bcrypt.compare(o_password, pass)) {
                        throw new Error("Password doesnot matched");
                    }
                    try {
                        if (n_password === c_password) {
                            const pwd = await bcrypt.hash(n_password, 8);
                            const pwUat = Math.floor(Date.now() / 1000);
                            const result = await connection.execute(`UPDATE employees SET password=?, updatedAt=? WHERE employee_id = ?`, [pwd, pwUat, id]);
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

