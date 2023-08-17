const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )
        return file;
    }

    async deleteFile(file){
        //resolve acha o arquivo de forma mais eficaz
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        try{
            //stat retorna o status
            await fs.promises.stat(filePath)
        } catch{
            return
        }

        //unlink deleta o arquivo
        await fs.promises.unlink(filePath)
    }
}

module.exports = DiskStorage