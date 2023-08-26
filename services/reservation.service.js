const connection = require("../db-Config.js");
const {Errors} = require("moleculer");
const moment = require('moment');
// const ApigatewayMixin = require("../mixins/apigateway.mixin.js");

module.exports = {
    name: "reservation",
    // mixins: [ApigatewayMixin],
    actions: {
        create: {
            rest: "POST /",
            async handler (ctx) {
                const {table, name, email, phoneNumber, reservationDate, reservationTime} = ctx.params;
                // console.log(table)

                if(!table, !name, !email, !phoneNumber, !reservationDate, !reservationTime) {
                    throw this.broker.errorHandler(new Errors.MoleculerClientError("The field remains empty. Please fill out the field.", 401, "ERR_UNDEFINED", {}), {}) 
                }

                try {
                    const [row] = await connection.execute(
                      `SELECT * FROM reservations WHERE table_number=? AND reservation_date=? AND reservation_time=?`,
                      [table, reservationDate, reservationTime]
                    );
                  
                    if (row.length > 0) {
                      return { type: "ERROR", code: 401, message: "Reservation is already booked" };
                    } else {
                      const [result] = await connection.execute(
                        `INSERT INTO reservations(table_number, name, email, phone_number, reservation_date, reservation_time, status) VALUES (?,?,?,?,?,?,?)`,
                        [table, name, email, phoneNumber, reservationDate, reservationTime, 1]
                      );
                  
                      if (result) {
                        return { type: "SUCCESS", code: 200, message: "Reservation added successfully"};
                      }
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    return { type: "ERROR", code: 500, message: "An error occurred" };
                  }
                  

                // const [row] = await connection.execute(`SELECT * FROM reservations WHERE table_number=? AND reservation_date=? AND reservation_time=?`, [table, reservationDate, reservationTime ])
                // if(row === 1){
                //     return {type: "ERROR", code:401, message:"Reservation is already booked"};
                // }
                // else{
                // const [result] = await connection.execute(`INSERT INTO reservations(table_number, name, email, phone_number, reservation_date, reservation_time, status) VALUES (?,?,?,?,?,?,?)`, [table, name, email, phoneNumber, reservationDate, reservationTime,1]);
                // if(result){
                //     return {type: "SUCCESS", code:200, message:"Reservation added successfully...."}
                // }
              }
            },

            get:{
              rest: "GET /",
              async handler (ctx) {
                const [result] = await connection.execute(`SELECT reservation_id,table_number, name, email, phone_number, reservation_date, reservation_time FROM reservations`);
                if(result){
                  return { type: "SUCCESS", code:200, message:"All reservation fetched successsfully", data: result}
                }
              }
            },

            delete: {
              rest: "DELETE /:id",
              async handler (ctx){
                const { id } = ctx.params;
                try {
                  const [result] = await connection.execute(`DELETE FROM reservations WHERE reservation_id=?`, [id])
                  if(result){
                    return {type:"SUCCESS", code:200, message:`Reservation id : '${id}'  is deleted successfully....`}
                  }
                } catch (error) {
                  throw this.broker.errorHandler(new Errors.MoleculerClientError("Something went wrong.. Try Again", 401, "ERR_UNDEFINED", {}), {}) 
                }
              }
            }
        }
    }
