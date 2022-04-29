const Router = require("express").Router;
const router = Router();
const DateConroler = require("../controllers/data")

router.get(
    "/create",[
        DateConroler.create
    ]
)
module.exports = router;
