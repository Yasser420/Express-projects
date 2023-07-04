const Client = require("../models/Client");

async function checkNumberPhone(num) {
    const exist = await Client.findOne({ where: { phoneNumber: num } });
    return exist == null;
}

module.exports = checkNumberPhone;