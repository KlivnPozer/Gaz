const Router = require("express").Router;
const router = Router();

const AuthMiddleware = require("../middlewares/auth");

const EvenMemberConroler = require("../controllers/eventMember")

router.post(
    "/add",
    [
        AuthMiddleware,
        EvenMemberConroler.add
    ]
)

router.put(
    "/update",
    [
        AuthMiddleware,
        EvenMemberConroler.update
    ]
)

router.delete(
    "/remove",
    [
        AuthMiddleware,
        EvenMemberConroler.remove
    ]
)

module.exports = router;
