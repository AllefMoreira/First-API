const UserCreateServices = require("./UserCreateServices")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

//dentro do describe nós podemos ter diversas Its, ou seja, fazer diversos testes
describe("UserCreateService", () =>{

    let userRepositoryInMemory = null
    let userCreateServices = null

    beforeEach(() =>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateServices = new UserCreateServices(userRepositoryInMemory)
    })  

//it é uma função onde o primeiro argumento é a descrição e o segundo é a função de teste
    it("user should be create", async ()=>{
        const user = {
            name: "user teste",
            email: "teste@gmail.com",
            password: "123"
        };

        const userCreated = await userCreateServices.execute(user)
    
        expect(userCreated).toHaveProperty("id")
    });

    
    it("verify if exist a registered email", async () =>{
        const user1 ={
            name: "User test 1",
            email: "user@gmail.com",
            password: "123",
        }

        const user2 ={
            name: "User test 2",
            email: "user@gmail.com",
            password: "456",
        }

        await userCreateServices.execute(user1)
        await expect(userCreateServices.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."))


    })
})
