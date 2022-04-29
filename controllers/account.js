const AccountModel = require("../models/account")
class Account{
async login (req, res) {
        const {
            email,
            password
        } = req.body;

        let foundAccount;
        if (!(foundAccount = await AccountModel.findOne({email}))) {
            return res.status("404").json({message: "Аккаунт не найден"}).end();
        }

        if (!bcrypt.compareSync(password, foundAccount.passwordHash)) {
            return res.status("400").json({message: "Неверный пароль"}).end();
        }
        return res.status("200")
    }
}
module.exports = new Account();
