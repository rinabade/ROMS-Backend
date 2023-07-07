const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
const ApigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "feedback",
    mixins: [ApigatewayMixin],
    actions: {
        create: {
            rest: "POST /",
            async handler (ctx) {
                const {fullname, email,message} = ctx.params;
                
                const now = moment();
                const formattedNow = now.format('YYYY-MM-DD HH:mm:ss');

                const [result] = await connection.execute(`INSERT INTO feedbacks(fullname,email,message, createdAt) VALUES (?,?,?,?)`, [fullname,email, message,formattedNow]);
                if(result){
                    return {type: "SUCCESS", code:200, message:"Feedback added successfully...."}
                }
            }
                

        },

        
        getAllFeedback:{
            rest: "GET /",
            async handler (ctx) {
                try {
                    const [result] = await connection.query(`SELECT feedback_id, fullname,email,message FROM feedbacks`);
                    if(result){
                        return ({type:"SUCCESS", code:200, message:"All data fetched successfully....", data: result});
                    }
                } catch (error) {
                    throw new Error({type: "ERROR", code:403, message:"Something went wrong..."});
                }
            } 

        },


        delete: {
            rest: "DELETE /:id",
            async handler(ctx){
                const { id } = ctx.params;
                try {
                    const [result] = await connection.query(`DELETE FROM feedbacks WHERE feedback_id=?`, [id]);
                    if (result) {
                        return ({ type: "SUCCESS", code: 200, message: `Feedback id : '${id}'  is deleted successfully....` });
                    }
                } catch (error) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong.. Try Again", 401, "ERR_UNDEFINED", {}), {}) 
                }
            }
        }
    },
}
    
