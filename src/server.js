require("dotenv/config")
require("express-async-errors")

const express = require("express") //estamos importando tudo da pasta express para essa variável
const routes = require("./routes")
const AppError = require("./utils/AppError")
const migrations = require("./database/SQLITE/migrations")
const uploadConfig = require("./configs/upload")
const cors = require("cors")

migrations()

const app = express()//estamos iniciando o express
app.use(cors())
app.use(express.json()) //defino o padrão que será tratado

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, req, res, next) =>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            error: "error",
            message: error.message
        })
    }

    console.error(error)

    res.status(500).json({
        error: "error",
        message: "Internal server error"
    })
})

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)}) 
/*
O listen irá ficar observando a porta, e quando ela for inicializada irá 
rodar a função que está como segundo argumento 
*/

