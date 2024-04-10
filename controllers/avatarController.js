const path = require('path');
const fs = require('fs');

const Avatar = require('../models/avatar');

module.exports = class AvatarController {
    //Cadastrar avatar
    static async avatar(req, file) {
        const userId = req.body.userId;

        if (!req.file) {
            return res.status(400).json({ message: 'Por favor, forneça um arquivo Valido.' });
        }
        // Faça algo com o filePath e userId, como salvar no banco de dados
        const newFileName = userId + path.extname(req.file.originalname);
        const filePath = 'public/imagens/' + newFileName;

        try {
            // Verificar se já existe um avatar com o mesmo userId
            const existingAvatar = await Avatar.findOne({ userId });

            if (existingAvatar) {
                // Se o avatar existir, apaga o arquivo associado a ele
                const existingFilePath = 'public/imagens/' + existingAvatar.avatar;
                if (fs.existsSync(existingFilePath)) {
                    fs.unlinkSync(existingFilePath);
                }

                // Atualiza o avatar existente com o novo arquivo
                existingAvatar.avatar = newFileName;
                await existingAvatar.save();
            } else {
                // Se não houver avatar existente, cria um novo
                const newAvatar = new Avatar({
                    userId,
                    avatar: newFileName,
                });
                await newAvatar.save();
            }

            // Move o novo arquivo
            fs.renameSync(req.file.path, filePath);

            res.status(200).json({ message: 'Arquivo enviado com sucesso.' });
        } catch (error) {
            console.error('Erro ao processar avatar:', error);
            res.status(500).json({ message: 'Erro ao processar avatar.' });
        }
    }

    //Ver avatar
    static async veravatar(req, res) {
        try {
            const { id } = req.params

            const avatar = await Avatar.findOne({ userId: id })
            res.json({ avatar: avatar })

        } catch {
            res.status(404).json('Imagen nao encontrada')
        }
    }
}