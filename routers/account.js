const Router = require("express").Router;
const router = Router();
const validator = require("../utils/validator");
const AccountController = require("../controllers/account");

router.get(
    "/login",
    [
        validator.email,
        validator.password,
        AccountController.login
    ] 
);
module.exports = router;
