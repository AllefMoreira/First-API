//Query Params:
const { Router } = require("express")
const UserController = require('../controllers/userControllers')

const usersRoutes = Router()

function myMiddleware(req, res, next){

    console.log("Você passou pelo Middleware")
    next()
}

const userController = new UserController()

//método post, onde temos o caminho, o middle e a função do request
usersRoutes.post("/", myMiddleware, userController.create)
usersRoutes.put("/:id", myMiddleware, userController.update)

module.exports = usersRoutes