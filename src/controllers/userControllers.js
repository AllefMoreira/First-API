const {hash, compare} = require("bcryptjs")
const AppError = require('../utils/AppError')
const sqliteConnection = require("../database/SQLITE")

//um controller pode ter no máximo 5 funções ou métodos:
/*
    index - GET para listar vários registros.
    show - GET para exibir um registro.
    create - POST para criar um registro.
    update - PUT para algerar um registro.
    delete - DELETE para remover um registro.
*/
class UserControllers{
    async create(req, res){
        const { name, email, password} = req.body

        const database = await sqliteConnection()
        const chefIfUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (chefIfUserExist){  
            throw new AppError("Este e-mail já está em uso.")
        }

        const hashedPassword = await hash(password, 8) //primeiro é o campo a ser criptografado e o segundo é o fator de complexidade

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
    
        return res.status(201).json()
    
    }

    async update(req, res){
        const { name, email, password, old_password} = req.body
        const { id } = req.params

        const database = await sqliteConnection()

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])
        if(!user){
            throw new AppError("Usuário não encontrado!")
        }

        const chefIfEmailExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        if(chefIfEmailExist && chefIfEmailExist.id !== user.id){
            throw new AppError("Este e-mail já está cadastrado em outro usuário!")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga!")
        }

        if(password && old_password){
            const checkPasswords = await compare(old_password, user.password)

            if(!checkPasswords){
                throw new AppError("Senha atual incorreta!")
            }

            user.password = await hash(password, 8)
        }

        await database.run(
                "UPDATE users SET name = ?, email = ?, password = ? , updated_at = DATETIME('now') WHERE id = ? ", 
                [user.name, user.email, user.password, id]
            )
        
        return res.json()

    }
}

module.exports = UserControllers