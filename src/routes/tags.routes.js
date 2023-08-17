//Query Params:
const { Router } = require("express")
const TagControllers = require('../controllers/tagControllers')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const tagsRoutes = Router()

const tagControllers = new TagControllers()

tagsRoutes.get("/", ensureAuthenticated, tagControllers.index)

module.exports = tagsRoutes