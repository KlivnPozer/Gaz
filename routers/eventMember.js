const Router = require("express").Router;
const router = Router();

const EvenMemberConroler = require("../controllers/eventMember")

router.post(
    "/add",
    [
        EvenMemberConroler.add
    ]
)

router.put(
    "/update",
    [
        EvenMemberConroler.update
    ]
)

router.delete(
    "/remove",
    [
        EvenMemberConroler.remove
    ]
)

module.exports = router;
