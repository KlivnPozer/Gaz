const Router = require("express").Router;
const router = Router();
const EvenMemberConroler = require("../controllers/eventMember")

router.get(
    "/create",[
        EvenMemberConroler.create
    ]
)
module.exports = router;
