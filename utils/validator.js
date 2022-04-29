const { check } = require("express-validator")

module.exports = {
    accountId: 
        check("accountId")
        .exists()
        .withMessage("Account ID undefined")
        .trim()
        .isEmpty()
        .withMessage("Account ID undefined"),
    email: 
        check("login")
        .exists()
        .withMessage("Email undefined")
        .trim()
        .isEmpty()
        .withMessage("Email undefined")
        .isEmail()
        .withMessage("Email incorrect"),
    password:
        check("password")
        .exists()
        .withMessage("Password undefined")
        .trim()
        .isEmpty()
        .withMessage("Password undefined")
        .isLength({ min: 6 })
        .withMessage("Password less 6 symbols"),
}