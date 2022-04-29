const Router = require("express").Router;
const router = Router();
const DateConroler = require("../controllers/date")

router.get(
    "/create",[
        DateConroler.create
    ]
)