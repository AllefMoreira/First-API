//Query Params:
const { Router } = require("express")
const TagControllers = require('../controllers/tagControllers')

const tagsRoutes = Router()

const tagControllers = new TagControllers()

tagsRoutes.get("/:user_id", tagControllers.index)

module.exports = tagsRoutes