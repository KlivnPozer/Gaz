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

router.get(
    "/exportTable",
    [
        EventController.exportTable
    ]
)

router.get(
    "/getMonthEvents",
    [
        EventController.getMonthEvents
    ]
)

router.post(
    "/update",
    [
        EventController.update
    ]
)

module.exports = router;