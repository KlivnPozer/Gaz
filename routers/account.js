const router = require("express").Router();
const validator = require("../utils/validator");

const AuthMiddleware = require("../middlewares/auth");
const AccountController = require("../controllers/account");

router.post(
    "/login",
    [
        validator.email,
        validator.password,
        AccountController.login
    ] 
);

router.get(
    "/get",
    [
        AuthMiddleware,
        AccountController.get
    ] 
);

module.exports = router;
