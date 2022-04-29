const Router = require("express").Router;
const router = Router();
const EvenMemberConroler = require("../controllers/evenMember")

router.get(
    "/create",[
        EvenMemberConroler.create
    ]
)