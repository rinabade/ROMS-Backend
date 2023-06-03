const connection = require("../db-Config.js");
const {Errors} = require("moleculer");

module.exports = {
    name: "kitchen",
    actions: {
        placeOrder: async function(ctx) {
            const order = ctx.params;
            console.log("Processing order:", order);

            return "Order processed";
        }
    },
    events: {
        "kitchen.notify": async function(payload) {
            console.log("Received notification:", payload);
        }
    }
    
}