const homestayController = require("./handle/homestayController");
const router = {
    "home": homestayController.showHome,
    "add": homestayController.homestayAdd,
    "edit": homestayController.homestayEdit,
    "delete": homestayController.homestayDelete
}

module.exports = router;