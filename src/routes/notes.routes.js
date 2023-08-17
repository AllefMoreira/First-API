//Query Params:
const { Router } = require("express")
const NoteControllers = require('../controllers/noteControllers')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const noteRoutes = Router()

const noteControllers = new NoteControllers()

noteRoutes.use(ensureAuthenticated)

noteRoutes.get("/", noteControllers.index)
noteRoutes.post("/", noteControllers.create)
noteRoutes.get("/:id", noteControllers.show)
noteRoutes.delete("/:id", noteControllers.delete)

module.exports = noteRoutes