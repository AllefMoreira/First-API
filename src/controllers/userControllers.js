const {hash, compare} = require("bcryptjs")
const AppError = require('../utils/AppError')
const sqliteConnection = require("../database/SQLITE")
const UserRepository = require("../repositories/UserRepository")
const UserCreateServices = require("../services/UserCreateServices")

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

        const userRepository = new UserRepository()
        const userCreateServices = new UserCreateServices(userRepository)

        userCreateServices.execute({ name, email, password})
        return res.status(201).json()
    }

    async update(req, res){
        const { name, email, password, old_password} = req.body
        const user_id = req.user.id

        const database = await sqliteConnection()

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
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
                [user.name, user.email, user.password, user_id]
            )
        
        return res.json()

    }
}

module.exports = UserControllers