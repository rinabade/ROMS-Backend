const connection = require("../db-Config.js");
const bcrypt = require("bcryptjs");
const {Errors} = require("moleculer");
const crypto = require("crypto");
// const resetLink = require("./forgetpassword.service")

module.exports = {
    name : "reset",
    actions: {
        password:{
            rest: "PATCH /:email",
            params: {
                token: "string",
            },
            async handler(ctx){
                    const token = ctx.params.token;

                    console.log("token------", token)

                    function createToken(data) {
                        const hash = crypto.createHash('sha256', data);
                        hash.update(data);
                        return hash.digest('hex');
                    }
    
                    const data = token;
                    const generated_hash = createToken(data);

                    const [getHash] = await connection.query(`SELECT * FROM employees WHERE hash_token = ? `, [generated_hash]);

                    if(getHash[0].hash_token == generated_hash){
                        const {n_password,c_password} = ctx.params;
                    
                        if (n_password === c_password) {
                            const pwd = await bcrypt.hash(n_password, 8);
                            const pwUat = Math.floor(Date.now() / 1000);

                            const [result] = await connection.query(`UPDATE employees SET password=?, updatedAt=? WHERE hash_token = ?`, [pwd, pwUat, getHash[0].hash_token]);
                            const [sql] = await connection.execute(`SELECT * FROM employees WHERE hash_token=?`, [getHash[0].hash_token]);
                            if(sql){
                                const email = sql[0].email;
                                const firstname = sql[0].firstname;
                                const lastname = sql[0].lastname;
                                
                                ctx.call("email.send", { email,firstname,lastname } );
                            }
                            return { type: "Success", code: 200, message: "Password change successfully. Please check your email" } ;
                            
                        }
                    }
                return this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong", 401, "ERR_UNDEFINED", {}), {}) 
            }
        }
    }
}