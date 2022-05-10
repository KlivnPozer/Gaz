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

router.put(
    "/update",
    [
        AuthMiddleware,
        EventController.update
    ]
)

router.delete(
    "/remove",
    [
        AuthMiddleware,
        EventController.remove
    ]
)

module.exports = router;