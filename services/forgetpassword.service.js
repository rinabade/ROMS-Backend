const connection = require("../db-Config.js");
const crypto = require("crypto");
const {Errors} = require("moleculer");

module.exports = {
    name : "forget",
    actions: {
        password:{
            rest: "POST /",
            async handler(ctx){
                const {email} = ctx.params;
                const [result] = await connection.query(`SELECT * FROM employees WHERE email=?`, [email]);
                if(!result[0]){
                    return this.broker.errorHandler(new Errors.MoleculerClientError("Email doesnot match", 401, "ERR_UNMATCHED", {}), {}) 
                }
                const token = crypto.randomBytes(64).toString("hex");
           
                function createToken(data) {
                    const hash = crypto.createHash('sha256', data);
                    hash.update(data);
                    return hash.digest('hex');
                }

                const data = token;
                const hash_token = createToken(data);

                const resetLink = `http://localhost:5000/forget/reset?token=${token}`;

                if(resetLink){
                    const email= result[0].email;
                    const firstname = result[0].firstname;
                    const lastname = result[0].lastname;
                    ctx.call("email.token", {email,firstname, lastname,resetLink});
                    return { type: "Success", code: 200, message: "Password reset email has been sent. Please check your email", resetLink:resetLink};

                }

                const [result1] = await connection.execute(`UPDATE employees SET hash_token=? WHERE email=?`, [hash_token , email]);
                const [sql] = await connection.execute(`SELECT * FROM employees WHERE email=?`, [email]);
                if(sql){
                    return { type: "Success", code: 200, message: "Password reset email has been sent. Please check your email" };
                }
                
                return this.broker.errorHandler(new Errors.MoleculerClientError("Invalid token", 401, "ERR_UNAUTHORISED", {}), {})             

            }
        }
    }
}