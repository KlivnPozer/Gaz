const router = require("express").Router();

const AuthMiddleware = require("../middlewares/auth");
const MulterMiddleware = require("../middlewares/multer");

const EventController = require("../controllers/event");

router.post(
    "/create",
    [
        AuthMiddleware,
        EventController.create
    ]
)

router.post(
    "/importTable",
    [
        AuthMiddleware,
        MulterMiddleware.single("table"),
        EventController.importTable
    ]
)

module.exports = router;