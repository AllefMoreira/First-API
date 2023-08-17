//Query Params:
const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UserController = require('../controllers/userControllers')
const UserAvatarController = require('../controllers/userAvatarController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const userController = new UserController()
const userAvatarController = new UserAvatarController()

//método post, onde temos o caminho, o middle e a função do request
usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, userController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes