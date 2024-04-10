const multer = require('multer');
const path = require('path');

// Configuração do multer para salvar arquivos na pasta 'imagens'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imagens/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Função para filtrar os arquivos permitidos
const fileFilter = (req, file, cb) => {
    // Verifica se o arquivo é uma imagem
    if (!file.mimetype.startsWith('image/')) {
        // Rejeita o upload se não for uma imagem
        return cb(false);
    }
    // Aceita o upload se for uma imagem
    cb(null, true);
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
});

module.exports = { upload };