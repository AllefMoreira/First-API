//Query Params:
const { Router } = require("express")
const NoteControllers = require('../controllers/noteControllers')

const noteRoutes = Router()

const noteControllers = new NoteControllers()

noteRoutes.get("/", noteControllers.index)
noteRoutes.post("/:user_id", noteControllers.create)
noteRoutes.get("/:id", noteControllers.show)
noteRoutes.delete("/:id", noteControllers.delete)

module.exports = noteRoutes