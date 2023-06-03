const connection = require("../db-Config.js");

const beforeCreate = async (ctx) => {
    const { itemName } = ctx.params;
    const [result] = await connection.query(`SELECT * FROM item_list WHERE item_name=?`, [itemName]);
    if (result[0]) {
        throw new Error("The menu item you are trying to create already exists", 400);
    }
}

const beforedelete = async (ctx) => {
    const { id } = ctx.params;
    try {
        const [result] = await connection.query(`SELECT * FROM item_list WHERE item_id=?`, [id]);
        if (!result[0]) {
            throw new Error({ type: "ERROR", message: "Book does not exists", code: 401 });
        }
    } catch (error) {
        throw new Error({ type: "ERROR", code: 400, message: "Error Found" });
    }
}

module.exports = { beforeCreate, beforedelete }