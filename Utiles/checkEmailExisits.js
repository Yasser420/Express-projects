const Client = require("../models/Client");

async function checkEmailExists(email) {
    const exist = await Client.findOne({ where: { Email: email } });
    return exist == null;
}

module.exports = checkEmailExists ;