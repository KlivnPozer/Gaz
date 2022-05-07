const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AccountModel = require("../models/account");

class Account{
    /**
     * Авторизация
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns 
     */
    async login (req, res){
        const {
            email,
            password
        } = req.body;

        let foundAccount;
        if (!(foundAccount = await AccountModel.findOne({login: email}))) {
            return res.status("404").json({message: "Аккаунт не найден"}).end();
        }

        if (!bcrypt.compareSync(password, foundAccount.passwordHash)) {
            return res.status("400").json({message: "Неверный пароль"}).end();
        }

        const expiresIn = 60 * 60 * 24 * 7;
        const responseExpiresIn = Math.floor(Date.now()/1000) + expiresIn;
        const token = jwt.sign(
            {
                accountId: foundAccount._id
            }, 
            process.env.JWT_SECRET_KEY,
            {
                expiresIn
            }
        )

        return res.status("200").json({
            token,
            expiresIn: responseExpiresIn,
        }).end();
    }

    /**
     * Получить информацию об аккаунте
     * 
     * @param {object} req 
     * @param {object} res 
     */
    async get (req, res) {
        let account = req.account;
        delete account.passwordHash;

        return res.status(200).json({account}).end();
    }   
}

module.exports = new Account();