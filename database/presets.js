const AccountModel = require("../models/account");

const accountData = {
    login: "root",
    passwordHash: bcrypt.hashSync("rootroot",2),
    isRoot: true
}

module.exports = async () => {
    if (!(await AccountModel.findOne({log: "root"}))) {
        await AccountModel.create(accountData);
    }
}